import argparse
import json
import re
from http import HTTPStatus
from http.cookies import SimpleCookie
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from agente_cnpj.client import ConsultaCNPJErro, consultar_cnpj
from agente_cnpj.cnpj import formatar_cnpj, normalizar_cnpj, validar_cnpj
from agente_cnpj.gest_db import GestDBErro, analisar_historico_cliente, listar_clientes
from services.auth import DEFAULT_PASSWORD, authenticate, change_password, create_session, delete_session, get_session, list_users_view, upsert_user
from services.credit import (
    BureauError,
    consultar_cnpj as consultar_credito_cnpj,
    consultar_cpf as consultar_credito_cpf,
    gerar_analise_carteira,
)
from services.credit.config import bureau_settings_view, hash_secret, load_bureau_settings, save_bureau_settings, verify_validation_password
from services.credit.providers import load_bureau_config
from services.credit.storage import audit, save_portfolio, stats as credit_stats


ROOT = Path(__file__).resolve().parent
WEB_ROOT = ROOT / "web"


class AgenteCNPJHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(WEB_ROOT), **kwargs)

    def end_headers(self):
        if self.path.endswith((".html", ".js", ".css")) or self.path == "/":
            self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
            self.send_header("Pragma", "no-cache")
            self.send_header("Expires", "0")
        super().end_headers()

    def _session_token(self) -> str:
        cookie_header = self.headers.get("Cookie", "")
        if not cookie_header:
            return ""
        parsed = SimpleCookie()
        parsed.load(cookie_header)
        morsel = parsed.get("scriptt_session")
        return morsel.value if morsel else ""

    def _current_user(self) -> dict | None:
        token = self._session_token()
        return get_session(token) if token else None

    def _require_authenticated_user(self) -> bool:
        if self._current_user():
            return True
        self._json(HTTPStatus.UNAUTHORIZED, {"ok": False, "erro": "Sessão expirada. Faça login novamente."})
        return False

    def do_GET(self):
        rota = urlparse(self.path)

        if rota.path == "/api/auth/session":
            self._responder_auth_session()
            return

        if rota.path.startswith("/api/") and rota.path not in {"/api/auth/session"}:
            if not self._require_authenticated_user():
                return

        if rota.path == "/api/cnpj":
            self._responder_consulta(rota.query)
            return

        if rota.path == "/api/gest/clientes":
            self._responder_clientes_gest(rota.query)
            return

        if rota.path == "/api/gest/historico":
            self._responder_historico_gest(rota.query)
            return

        if rota.path == "/api/sintegra":
            self._responder_sintegra(rota.query)
            return

        if rota.path.startswith("/api/credito/cnpj/"):
            self._responder_credito_documento("CNPJ", rota.path.rsplit("/", 1)[-1], rota.query)
            return

        if rota.path.startswith("/api/credito/cpf/"):
            self._responder_credito_documento("CPF", rota.path.rsplit("/", 1)[-1], rota.query)
            return

        if rota.path == "/api/admin/credito":
            self._responder_admin_credito()
            return

        if rota.path == "/api/admin/bureau-config":
            self._responder_admin_bureau_config()
            return

        if rota.path == "/":
            self.path = "/index.html"

        super().do_GET()

    def do_POST(self):
        rota = urlparse(self.path)

        if rota.path == "/api/auth/login":
            self._responder_auth_login()
            return

        if rota.path == "/api/auth/logout":
            self._responder_auth_logout()
            return

        if rota.path == "/api/auth/change-password":
            self._responder_auth_change_password()
            return

        if rota.path.startswith("/api/") and rota.path not in {"/api/auth/login", "/api/auth/logout", "/api/auth/change-password"}:
            if not self._require_authenticated_user():
                return

        if rota.path == "/api/carteira/analisar":
            self._responder_analise_carteira()
            return

        if rota.path == "/api/consultas/salvar":
            self._responder_salvar_consulta()
            return

        if rota.path == "/api/admin/bureau-config":
            self._responder_salvar_bureau_config()
            return

        if rota.path == "/api/admin/users":
            self._responder_salvar_usuario_admin()
            return

        if rota.path == "/api/serasa/premium/consultar":
            self._responder_serasa_premium_consulta()
            return

        self._json(
            HTTPStatus.NOT_FOUND,
            {
                "ok": False,
                "erro": "Endpoint nao encontrado.",
            },
        )

    def _responder_auth_session(self) -> None:
        user = self._current_user()
        if not user:
            self._json(
                HTTPStatus.OK,
                {
                    "ok": True,
                    "authenticated": False,
                    "default_credentials": {
                        "login": "admin@scriptt",
                        "password": DEFAULT_PASSWORD,
                    },
                },
            )
            return
        self._json(HTTPStatus.OK, {"ok": True, "authenticated": True, "user": user})

    def _responder_auth_login(self) -> None:
        try:
            body = self._json_body()
        except ValueError as exc:
            self._json(HTTPStatus.BAD_REQUEST, {"ok": False, "erro": str(exc)})
            return
        login = str(body.get("login") or "").strip().lower()
        password = str(body.get("password") or "")
        user = authenticate(login, password)
        if not user:
            self._json(HTTPStatus.UNAUTHORIZED, {"ok": False, "erro": "Login ou senha inválidos."})
            return
        token = create_session(user)
        self._json(
            HTTPStatus.OK,
            {"ok": True, "authenticated": True, "user": user},
            cookies=[
                f"scriptt_session={token}; HttpOnly; Path=/; SameSite=Lax",
            ],
        )

    def _responder_auth_logout(self) -> None:
        token = self._session_token()
        if token:
            delete_session(token)
        self._json(
            HTTPStatus.OK,
            {"ok": True},
            cookies=["scriptt_session=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax"],
        )

    def _responder_auth_change_password(self) -> None:
        current = self._current_user()
        if not current:
            self._json(HTTPStatus.UNAUTHORIZED, {"ok": False, "erro": "Sessão expirada. Faça login novamente."})
            return
        try:
            body = self._json_body()
        except ValueError as exc:
            self._json(HTTPStatus.BAD_REQUEST, {"ok": False, "erro": str(exc)})
            return
        new_password = str(body.get("new_password") or "")
        confirm_password = str(body.get("confirm_password") or "")
        if len(new_password) < 8:
            self._json(HTTPStatus.BAD_REQUEST, {"ok": False, "erro": "A nova senha precisa ter pelo menos 8 caracteres."})
            return
        if new_password != confirm_password:
            self._json(HTTPStatus.BAD_REQUEST, {"ok": False, "erro": "A confirmação da senha não confere."})
            return
        user = change_password(current["email"], new_password)
        if not user:
            self._json(HTTPStatus.NOT_FOUND, {"ok": False, "erro": "Usuário não encontrado para troca de senha."})
            return
        token = create_session(user)
        self._json(
            HTTPStatus.OK,
            {"ok": True, "user": user},
            cookies=[f"scriptt_session={token}; HttpOnly; Path=/; SameSite=Lax"],
        )

    def _responder_consulta(self, query: str) -> None:
        parametros = parse_qs(query)
        cnpj = parametros.get("cnpj", [""])[0]
        digitos = normalizar_cnpj(cnpj)

        if not validar_cnpj(digitos):
            self._json(
                HTTPStatus.BAD_REQUEST,
                {
                    "ok": False,
                    "erro": "CNPJ invalido.",
                    "cnpj": cnpj,
                },
            )
            return

        try:
            dados = consultar_cnpj(digitos, timeout=20)
        except ConsultaCNPJErro as exc:
            status, mensagem = _classificar_erro_consulta(str(exc))
            self._json(
                status,
                {
                    "ok": False,
                    "erro": mensagem,
                    "detalhes": str(exc),
                    "cnpj": formatar_cnpj(digitos),
                },
            )
            return

        self._json(
            HTTPStatus.OK,
            {
                "ok": True,
                "cnpj_formatado": formatar_cnpj(digitos),
                "fonte": dados.get("fonte_consulta"),
                "dados": dados,
            },
        )

    def _responder_clientes_gest(self, query: str) -> None:
        parametros = parse_qs(query)
        termo = parametros.get("q", [""])[0]
        codigo = parametros.get("codigo", [""])[0]
        cnpj = parametros.get("cnpj", [""])[0]
        cpf = parametros.get("cpf", [""])[0]
        data_inicio = parametros.get("data_inicio", [""])[0]
        data_fim = parametros.get("data_fim", [""])[0]
        try:
            limit = int(parametros.get("limit", ["50"])[0])
        except ValueError:
            limit = 50

        try:
            clientes = listar_clientes(
                limit=limit,
                termo=termo,
                codigo=codigo,
                cnpj=cnpj,
                cpf=cpf,
                data_inicio=data_inicio,
                data_fim=data_fim,
            )
        except GestDBErro as exc:
            self._json(
                HTTPStatus.BAD_GATEWAY,
                {
                    "ok": False,
                    "erro": str(exc),
                },
            )
            return

        self._json(
            HTTPStatus.OK,
            {
                "ok": True,
                "clientes": clientes,
                "total": len(clientes),
            },
        )

    def _responder_historico_gest(self, query: str) -> None:
        parametros = parse_qs(query)
        cnpj = parametros.get("cnpj", [""])[0]
        codigo = parametros.get("codigo", [""])[0]

        try:
            historico = analisar_historico_cliente(cnpj=cnpj, codigo=codigo)
        except GestDBErro as exc:
            self._json(
                HTTPStatus.BAD_GATEWAY,
                {
                    "ok": False,
                    "erro": str(exc),
                },
            )
            return

        self._json(HTTPStatus.OK, historico)

    def _responder_sintegra(self, query: str) -> None:
        parametros = parse_qs(query)
        cnpj = parametros.get("cnpj", [""])[0]
        uf = parametros.get("uf", [""])[0].upper()
        self._json(
            HTTPStatus.OK,
            {
                "ok": True,
                "cnpj": formatar_cnpj(cnpj),
                "uf": uf,
                "portal_url": "http://www.sintegra.gov.br/",
                "mensagem": "O Sintegra oficial normalmente exige consulta manual por UF e pode ter CAPTCHA.",
            },
        )

    def _responder_credito_documento(self, tipo: str, documento: str, query: str) -> None:
        parametros = parse_qs(query)
        digitos = "".join(ch for ch in documento if ch.isdigit())

        if tipo == "CNPJ" and not validar_cnpj(digitos):
            self._json(HTTPStatus.BAD_REQUEST, {"ok": False, "erro": "CNPJ invalido."})
            return

        if tipo == "CPF" and not _validar_cpf(digitos):
            self._json(HTTPStatus.BAD_REQUEST, {"ok": False, "erro": "CPF invalido."})
            return

        audit_context = self._audit_context(parametros)
        try:
            payload = consultar_credito_cnpj(digitos, audit_context) if tipo == "CNPJ" else consultar_credito_cpf(digitos, audit_context)
        except BureauError as exc:
            self._json(
                HTTPStatus.BAD_GATEWAY,
                {
                    "ok": False,
                    "erro": str(exc),
                    "fallback": "A análise atual do app permanece disponível.",
                },
            )
            return

        self._json(HTTPStatus.OK, payload)

    def _responder_analise_carteira(self) -> None:
        try:
            body = self._json_body()
        except ValueError as exc:
            self._json(HTTPStatus.BAD_REQUEST, {"ok": False, "erro": str(exc)})
            return

        documents = body.get("documents", [])
        if not isinstance(documents, list) or not documents:
            self._json(HTTPStatus.BAD_REQUEST, {"ok": False, "erro": "Informe uma lista de CPF/CNPJ."})
            return

        audit_context = {
            "queried_by": str(body.get("queried_by") or "operador"),
            "query_reason": str(body.get("query_reason") or "analise_carteira"),
            "legal_basis": str(body.get("legal_basis") or "proteção ao crédito"),
            "product": str(body.get("product") or "portfolio-credit-analysis"),
            "ip_address": self.client_address[0],
        }
        items = []
        errors = []
        for document in documents[:200]:
            digits = "".join(ch for ch in str(document) if ch.isdigit())
            tipo = "CNPJ" if len(digits) == 14 else "CPF" if len(digits) == 11 else ""
            if not tipo:
                errors.append({"document": document, "erro": "Documento invalido."})
                continue
            try:
                result = consultar_credito_cnpj(digits, audit_context) if tipo == "CNPJ" else consultar_credito_cpf(digits, audit_context)
                item = result["data"]
                item["raw_response"] = {}
                items.append(item)
            except BureauError as exc:
                errors.append({"document": document, "erro": str(exc)})

        analysis = gerar_analise_carteira(items)
        portfolio_id = save_portfolio(analysis, queried_by=audit_context["queried_by"], query_reason=audit_context["query_reason"])
        self._json(
            HTTPStatus.OK,
            {
                "ok": True,
                "portfolio_id": portfolio_id,
                "analysis": analysis,
                "errors": errors,
            },
        )

    def _responder_serasa_premium_consulta(self) -> None:
        try:
            body = self._json_body()
        except ValueError as exc:
            self._json(HTTPStatus.BAD_REQUEST, {"ok": False, "erro": str(exc)})
            return

        settings = load_bureau_settings()
        if not verify_validation_password(settings, str(body.get("validation_password") or "")):
            self._json(HTTPStatus.FORBIDDEN, {"ok": False, "erro": "Senha de validação da Serasa Premium inválida."})
            return

        document = "".join(ch for ch in str(body.get("document") or "") if ch.isdigit())
        if len(document) not in {11, 14}:
            self._json(HTTPStatus.BAD_REQUEST, {"ok": False, "erro": "Documento inválido para Serasa Premium."})
            return
        document_type = str(body.get("document_type") or ("CNPJ" if len(document) == 14 else "CPF")).upper()
        audit_context = {
            "queried_by": str(body.get("queried_by") or "operador"),
            "query_reason": str(body.get("query_reason") or "analise_credito_premium"),
            "legal_basis": str(body.get("legal_basis") or "proteção ao crédito"),
            "product": str(body.get("product") or "SCC_CHECK"),
            "subject_name": str(body.get("subject_name") or ""),
            "ip_address": self.client_address[0],
        }
        try:
            payload = consultar_credito_cnpj(document, audit_context) if document_type == "CNPJ" else consultar_credito_cpf(document, audit_context)
        except BureauError as exc:
            self._json(HTTPStatus.BAD_GATEWAY, {"ok": False, "erro": str(exc)})
            return
        self._json(HTTPStatus.OK, payload)

    def _responder_admin_credito(self) -> None:
        bureau = load_bureau_config()
        settings = load_bureau_settings()
        features = settings.get("features", {}) if isinstance(settings.get("features"), dict) else {}
        security = settings.get("security", {}) if isinstance(settings.get("security"), dict) else {}
        self._json(
            HTTPStatus.OK,
            {
                "ok": True,
                "stats": credit_stats(),
                "users": list_users_view(),
                "current_user": self._current_user(),
                "access_matrix": [
                    {"perfil": "Admin", "permissoes": ["consultar_cnpj", "consultar_cpf", "analisar_carteira", "usar_serasa_premium", "usar_scc_check", "gerenciar_credenciais_serasa", "configurar_modulos", "ver_auditoria"]},
                    {"perfil": "Analista", "permissoes": ["consultar_cnpj", "consultar_cpf", "analisar_carteira", "usar_serasa_premium", "usar_scc_check"]},
                    {"perfil": "Comercial", "permissoes": ["consultar_cnpj", "ver_recomendacao"]},
                    {"perfil": "Auditoria", "permissoes": ["ver_auditoria", "exportar_relatorios"]},
                ],
                "feature_flags": {
                    "bureau_provider": bureau.provider,
                    "bureau_mock": bureau.use_mock,
                    "cpf_consulta_requer_motivo": True,
                    "portfolio_limit": 200,
                    "decisao_automatica": False,
                    "serasa_premium_enabled": bool(features.get("serasa_premium_enabled")),
                    "allow_scc_check": bool(features.get("allow_scc_check")),
                    "has_validation_password": bool(security.get("validation_password_hash")),
                },
            },
        )

    def _responder_admin_bureau_config(self) -> None:
        self._json(
            HTTPStatus.OK,
            {
                "ok": True,
                "config": bureau_settings_view(load_bureau_settings()),
            },
        )

    def _responder_salvar_usuario_admin(self) -> None:
        try:
            body = self._json_body()
        except ValueError as exc:
            self._json(HTTPStatus.BAD_REQUEST, {"ok": False, "erro": str(exc)})
            return
        name = str(body.get("name") or "").strip()
        email = str(body.get("email") or "").strip().lower()
        role = str(body.get("role") or "Analista").strip()
        status = str(body.get("status") or "Ativo").strip()
        password = str(body.get("password") or "")
        is_existing_user = any(item["email"] == email for item in list_users_view())
        permissions = body.get("permissions") if isinstance(body.get("permissions"), list) else None
        if not name or not email:
            self._json(HTTPStatus.BAD_REQUEST, {"ok": False, "erro": "Nome e login são obrigatórios."})
            return
        if not is_existing_user and not password:
            self._json(HTTPStatus.BAD_REQUEST, {"ok": False, "erro": "Informe uma senha para o novo usuário."})
            return
        if password and len(password) < 8:
            self._json(HTTPStatus.BAD_REQUEST, {"ok": False, "erro": "A senha do usuário precisa ter pelo menos 8 caracteres."})
            return
        user = upsert_user(
            name=name,
            email=email,
            role=role,
            status=status,
            permissions=permissions,
            password=password,
        )
        self._json(HTTPStatus.OK, {"ok": True, "user": user, "users": list_users_view()})

    def _responder_salvar_bureau_config(self) -> None:
        try:
            body = self._json_body()
        except ValueError as exc:
            self._json(HTTPStatus.BAD_REQUEST, {"ok": False, "erro": str(exc)})
            return

        provider = str(body.get("provider") or "mock").strip().lower()
        environment = str(body.get("environment") or "sandbox").strip().lower()
        providers = body.get("providers")
        if provider not in {"mock", "serasa", "boavista", "quod"}:
            self._json(HTTPStatus.BAD_REQUEST, {"ok": False, "erro": "Provider invalido."})
            return
        if environment not in {"sandbox", "production"}:
            self._json(HTTPStatus.BAD_REQUEST, {"ok": False, "erro": "Ambiente invalido."})
            return
        if not isinstance(providers, dict):
            self._json(HTTPStatus.BAD_REQUEST, {"ok": False, "erro": "Configuracao de providers invalida."})
            return

        previous = load_bureau_settings()
        previous_providers = previous.get("providers", {}) if isinstance(previous.get("providers"), dict) else {}
        previous_security = previous.get("security", {}) if isinstance(previous.get("security"), dict) else {}
        previous_features = previous.get("features", {}) if isinstance(previous.get("features"), dict) else {}
        incoming_features = body.get("features", {})
        incoming_security = body.get("security", {})
        if not isinstance(incoming_features, dict):
            incoming_features = {}
        if not isinstance(incoming_security, dict):
            incoming_security = {}
        merged_providers: dict[str, dict[str, str]] = {}
        for name in ("serasa", "boavista", "quod"):
            incoming = providers.get(name, {})
            previous_item = previous_providers.get(name, {}) if isinstance(previous_providers.get(name), dict) else {}
            if not isinstance(incoming, dict):
                incoming = {}
            client_secret = str(incoming.get("client_secret") or "").strip()
            password = str(incoming.get("password") or "").strip()
            merged_providers[name] = {
                "base_url": str(incoming.get("base_url") or previous_item.get("base_url") or "").strip(),
                "client_id": str(incoming.get("client_id") or previous_item.get("client_id") or "").strip(),
                "client_secret": client_secret or str(previous_item.get("client_secret") or "").strip(),
                "auth_mode": str(incoming.get("auth_mode") or previous_item.get("auth_mode") or "oauth").strip().lower(),
                "username": str(incoming.get("username") or previous_item.get("username") or "").strip(),
                "password": password or str(previous_item.get("password") or "").strip(),
                "api_token": str(incoming.get("api_token", previous_item.get("api_token") or "")).strip(),
                "sso_token": str(incoming.get("sso_token", previous_item.get("sso_token") or "")).strip(),
                "origin": str(incoming.get("origin") or previous_item.get("origin") or "https://sistema.scccheck.com.br").strip(),
                "portal_url": str(incoming.get("portal_url") or previous_item.get("portal_url") or "").strip(),
                "consult_path": str(incoming.get("consult_path") or previous_item.get("consult_path") or "").strip(),
                "token_path": str(incoming.get("token_path") or previous_item.get("token_path") or "/oauth/token").strip(),
                "product_code": str(incoming.get("product_code") or previous_item.get("product_code") or "").strip(),
            }

        validation_password = str(incoming_security.get("validation_password") or "").strip()
        merged_security = {
            "validation_password_hash": hash_secret(validation_password)
            if validation_password
            else str(previous_security.get("validation_password_hash") or "").strip()
        }

        saved = save_bureau_settings(
            {
                "provider": provider,
                "environment": environment,
                "providers": merged_providers,
                "security": merged_security,
                "features": {
                    "serasa_premium_enabled": bool(incoming_features.get("serasa_premium_enabled", previous_features.get("serasa_premium_enabled", False))),
                    "allow_scc_check": bool(incoming_features.get("allow_scc_check", previous_features.get("allow_scc_check", False))),
                },
            }
        )
        self._json(
            HTTPStatus.OK,
            {
                "ok": True,
                "config": bureau_settings_view(saved),
            },
        )

    def _responder_salvar_consulta(self) -> None:
        try:
            body = self._json_body()
        except ValueError as exc:
            self._json(HTTPStatus.BAD_REQUEST, {"ok": False, "erro": str(exc)})
            return

        content = body.get("content")
        if not isinstance(content, dict):
            self._json(HTTPStatus.BAD_REQUEST, {"ok": False, "erro": "Conteudo da consulta invalido."})
            return

        filename = _safe_filename(str(body.get("filename") or "consulta.json"))
        folder = str(body.get("folder") or "").strip()
        target_dir = Path(folder).expanduser() if folder else ROOT / "data" / "consultas"

        try:
            target_dir.mkdir(parents=True, exist_ok=True)
            target_file = target_dir / filename
            target_file.write_text(json.dumps(content, ensure_ascii=False, indent=2), encoding="utf-8")
        except OSError as exc:
            self._json(HTTPStatus.BAD_GATEWAY, {"ok": False, "erro": f"Nao foi possivel salvar a consulta: {exc}"})
            return

        self._json(
            HTTPStatus.OK,
            {
                "ok": True,
                "path": str(target_file),
                "mode": body.get("mode") or "local_db",
                "cloud": body.get("cloud") or "none",
            },
        )

    def _audit_context(self, parametros: dict[str, list[str]]) -> dict[str, str]:
        current_user = self._current_user() or {}
        default_user = str(current_user.get("email") or "operador")
        return {
            "queried_by": parametros.get("usuario", [default_user])[0] or default_user,
            "query_reason": parametros.get("motivo", ["analise_credito"])[0] or "analise_credito",
            "legal_basis": parametros.get("base_legal", ["proteção ao crédito"])[0] or "proteção ao crédito",
            "product": parametros.get("produto", ["score-relatorio-credito"])[0] or "score-relatorio-credito",
            "ip_address": self.client_address[0],
        }

    def _json_body(self) -> dict:
        length = int(self.headers.get("Content-Length", "0") or 0)
        if length <= 0:
            return {}
        try:
            return json.loads(self.rfile.read(length).decode("utf-8"))
        except json.JSONDecodeError as exc:
            raise ValueError("JSON invalido.") from exc

    def _json(self, status: HTTPStatus, payload: dict, cookies: list[str] | None = None) -> None:
        conteudo = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(conteudo)))
        for cookie in cookies or []:
            self.send_header("Set-Cookie", cookie)
        self.end_headers()
        self.wfile.write(conteudo)


def _classificar_erro_consulta(detalhes: str) -> tuple[HTTPStatus, str]:
    texto = detalhes.lower()

    if "http 404" in texto:
        return (
            HTTPStatus.NOT_FOUND,
            "CNPJ valido, mas nao encontrado nas fontes publicas.",
        )

    if "tempo limite" in texto or "timed out" in texto:
        return (
            HTTPStatus.GATEWAY_TIMEOUT,
            "As fontes publicas demoraram para responder. Tente novamente.",
        )

    if "falha de conexao" in texto:
        return (
            HTTPStatus.BAD_GATEWAY,
            "Nao foi possivel conectar as fontes publicas.",
        )

    return (
        HTTPStatus.BAD_GATEWAY,
        "Nao foi possivel consultar o CNPJ agora.",
    )


def _safe_filename(value: str) -> str:
    name = re.sub(r"[^A-Za-z0-9._ -]+", "-", value).strip(" .-")
    if not name:
        name = "consulta.json"
    if not name.lower().endswith(".json"):
        name += ".json"
    return name[:120]


def _validar_cpf(value: str) -> bool:
    digits = "".join(ch for ch in str(value or "") if ch.isdigit())
    if len(digits) != 11 or digits == digits[0] * 11:
        return False

    def digit_for(prefix: str) -> str:
        total = sum(int(number) * weight for number, weight in zip(prefix, range(len(prefix) + 1, 1, -1)))
        rest = (total * 10) % 11
        return "0" if rest == 10 else str(rest)

    first = digit_for(digits[:9])
    second = digit_for(digits[:9] + first)
    return digits[-2:] == first + second


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="App web local do agente CNPJ.")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8000)
    args = parser.parse_args(argv)

    servidor = ThreadingHTTPServer((args.host, args.port), AgenteCNPJHandler)
    print(f"Agente CNPJ rodando em http://{args.host}:{args.port}")

    try:
        servidor.serve_forever()
    except KeyboardInterrupt:
        print("\nEncerrando servidor.")
    finally:
        servidor.server_close()

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
