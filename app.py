import argparse
import json
import re
from http import HTTPStatus
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from agente_cnpj.client import ConsultaCNPJErro, consultar_cnpj
from agente_cnpj.cnpj import formatar_cnpj, normalizar_cnpj, validar_cnpj
from agente_cnpj.gest_db import GestDBErro, analisar_historico_cliente, listar_clientes
from services.serasa import (
    SerasaErro,
    consultar_cnpj as consultar_credito_cnpj,
    consultar_cpf as consultar_credito_cpf,
    gerar_analise_carteira,
)
from services.serasa.storage import audit, save_portfolio, stats as credit_stats


ROOT = Path(__file__).resolve().parent
WEB_ROOT = ROOT / "web"


class AgenteCNPJHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(WEB_ROOT), **kwargs)

    def do_GET(self):
        rota = urlparse(self.path)

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

        if rota.path == "/":
            self.path = "/index.html"

        super().do_GET()

    def do_POST(self):
        rota = urlparse(self.path)

        if rota.path == "/api/carteira/analisar":
            self._responder_analise_carteira()
            return

        if rota.path == "/api/consultas/salvar":
            self._responder_salvar_consulta()
            return

        self._json(
            HTTPStatus.NOT_FOUND,
            {
                "ok": False,
                "erro": "Endpoint nao encontrado.",
            },
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
        except SerasaErro as exc:
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
            except SerasaErro as exc:
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

    def _responder_admin_credito(self) -> None:
        self._json(
            HTTPStatus.OK,
            {
                "ok": True,
                "stats": credit_stats(),
                "access_matrix": [
                    {"perfil": "Admin", "permissoes": ["consultar_cnpj", "consultar_cpf", "analisar_carteira", "configurar_modulos", "ver_auditoria"]},
                    {"perfil": "Analista", "permissoes": ["consultar_cnpj", "consultar_cpf", "analisar_carteira"]},
                    {"perfil": "Comercial", "permissoes": ["consultar_cnpj", "ver_recomendacao"]},
                    {"perfil": "Auditoria", "permissoes": ["ver_auditoria", "exportar_relatorios"]},
                ],
                "feature_flags": {
                    "serasa_mock": True,
                    "cpf_consulta_requer_motivo": True,
                    "portfolio_limit": 200,
                    "decisao_automatica": False,
                },
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
        return {
            "queried_by": parametros.get("usuario", ["operador"])[0] or "operador",
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

    def _json(self, status: HTTPStatus, payload: dict) -> None:
        conteudo = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(conteudo)))
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
