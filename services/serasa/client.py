from __future__ import annotations

import json
import os
from dataclasses import dataclass
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from .mock import resposta_mock
from .storage import audit, register_query, save_raw_response, save_score


class SerasaErro(RuntimeError):
    pass


@dataclass(frozen=True)
class SerasaConfig:
    base_url: str
    client_id: str
    client_secret: str
    env: str

    @property
    def use_mock(self) -> bool:
        return self.env != "production" or not (self.base_url and self.client_id and self.client_secret)


class SerasaClient:
    def __init__(self, config: SerasaConfig | None = None) -> None:
        self.config = config or SerasaConfig(
            base_url=os.getenv("SERASA_BASE_URL", "").rstrip("/"),
            client_id=os.getenv("SERASA_CLIENT_ID", ""),
            client_secret=os.getenv("SERASA_CLIENT_SECRET", ""),
            env=os.getenv("SERASA_ENV", "sandbox").lower(),
        )

    def consultar_cnpj(self, document: str, audit_context: dict[str, str] | None = None) -> dict[str, Any]:
        return self._consultar(document=document, document_type="CNPJ", audit_context=audit_context or {})

    def consultar_cpf(self, document: str, audit_context: dict[str, str] | None = None) -> dict[str, Any]:
        return self._consultar(document=document, document_type="CPF", audit_context=audit_context or {})

    def _consultar(self, *, document: str, document_type: str, audit_context: dict[str, str]) -> dict[str, Any]:
        digits = only_digits(document)
        provider = "serasa_mock" if self.config.use_mock else "serasa_experian"
        query_id = register_query(
            document=digits,
            document_type=document_type,
            provider=provider,
            queried_by=audit_context.get("queried_by", "operador"),
            query_reason=audit_context.get("query_reason", "analise_credito"),
            legal_basis=audit_context.get("legal_basis", "proteção ao crédito"),
            product=audit_context.get("product", "score-relatorio-credito"),
            ip_address=audit_context.get("ip_address", ""),
        )
        try:
            raw = resposta_mock(digits, document_type) if self.config.use_mock else self._request_serasa(digits, document_type)
            normalized = normalizar_resposta_serasa(raw, document_type=document_type)
            save_raw_response(query_id, raw, normalized)
            save_score(query_id, normalized)
            return {
                "ok": True,
                "query_id": query_id,
                "mock": self.config.use_mock,
                "data": normalized,
            }
        except Exception as exc:
            audit(
                action="credit_query_error",
                provider=provider,
                document=digits,
                document_type=document_type,
                queried_by=audit_context.get("queried_by", "operador"),
                query_reason=audit_context.get("query_reason", "analise_credito"),
                legal_basis=audit_context.get("legal_basis", "proteção ao crédito"),
                product=audit_context.get("product", "score-relatorio-credito"),
                ip_address=audit_context.get("ip_address", ""),
                metadata={"error": str(exc)},
            )
            raise SerasaErro("Dados Serasa indisponíveis no momento.") from exc

    def _request_serasa(self, document: str, document_type: str) -> dict[str, Any]:
        if not self.config.base_url:
            raise SerasaErro("SERASA_BASE_URL não configurada.")
        token = self._token()
        endpoint = "cnpj" if document_type == "CNPJ" else "cpf"
        request = Request(
            f"{self.config.base_url}/credito/{endpoint}/{document}",
            headers={
                "Authorization": f"Bearer {token}",
                "Accept": "application/json",
            },
            method="GET",
        )
        try:
            with urlopen(request, timeout=25) as response:
                return json.loads(response.read().decode("utf-8"))
        except HTTPError as exc:
            raise SerasaErro(f"Serasa HTTP {exc.code}") from exc
        except URLError as exc:
            raise SerasaErro("Falha de conexão com Serasa.") from exc

    def _token(self) -> str:
        request = Request(
            f"{self.config.base_url}/oauth/token",
            data=json.dumps(
                {
                    "grant_type": "client_credentials",
                    "client_id": self.config.client_id,
                    "client_secret": self.config.client_secret,
                }
            ).encode("utf-8"),
            headers={
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            method="POST",
        )
        try:
            with urlopen(request, timeout=20) as response:
                payload = json.loads(response.read().decode("utf-8"))
        except HTTPError as exc:
            raise SerasaErro(f"Autenticação Serasa HTTP {exc.code}") from exc
        except URLError as exc:
            raise SerasaErro("Falha de autenticação com Serasa.") from exc
        token = payload.get("access_token")
        if not token:
            raise SerasaErro("Token Serasa ausente na resposta.")
        return str(token)


def consultar_cnpj(document: str, audit_context: dict[str, str] | None = None) -> dict[str, Any]:
    return SerasaClient().consultar_cnpj(document, audit_context)


def consultar_cpf(document: str, audit_context: dict[str, str] | None = None) -> dict[str, Any]:
    return SerasaClient().consultar_cpf(document, audit_context)


def normalizar_resposta_serasa(raw: dict[str, Any], *, document_type: str) -> dict[str, Any]:
    score = int(_first(raw, "score", "serasa_score", "pontuacao", default=0) or 0)
    restrictions = int(_first(raw, "restricoes_financeiras", "restrictions", default=0) or 0)
    protests = int(_first(raw, "protestos", default=0) or 0)
    overdue = int(_first(raw, "dividas_vencidas", "overdue_debts", default=0) or 0)
    commercial = int(_first(raw, "pendencias_comerciais", "commercial_issues", default=0) or 0)
    lawsuits = int(_first(raw, "acoes_judiciais", "lawsuits", default=0) or 0)
    probability = float(_first(raw, "probabilidade_inadimplencia", "default_probability", default=0) or 0)
    status = str(_first(raw, "situacao_cadastral", "status", default="REGULAR") or "REGULAR")
    previous_score = int(_first(raw, "score_anterior", "previous_score", default=score) or score)
    risk = calcular_risco_credito(
        score_serasa=score,
        situacao_cadastral=status,
        restricoes=restrictions,
        protestos=protests,
        dividas_vencidas=overdue,
    )
    limit = calcular_limite_sugerido(score_serasa=score, risk_level=risk["risk_level"], restrictions=restrictions, overdue=overdue)
    score_final = score_combinado(
        score_serasa=score,
        restricoes=restrictions,
        protestos=protests,
        dividas_vencidas=overdue,
        situacao_cadastral=status,
    )
    return {
        "document": str(raw.get("document", "")),
        "document_type": document_type,
        "provider": str(raw.get("provider", "serasa_experian")),
        "environment": str(raw.get("environment", "production")),
        "score_serasa": score,
        "score_anterior": previous_score,
        "score_final": score_final,
        "probabilidade_inadimplencia": probability,
        "restricoes_financeiras": restrictions,
        "protestos": protests,
        "dividas_vencidas": overdue,
        "pendencias_comerciais": commercial,
        "acoes_judiciais": lawsuits,
        "situacao_cadastral": status,
        "risk_level": risk["risk_level"],
        "risk_label": risk["risk_label"],
        "decision": risk["decision"],
        "recommended_limit": limit,
        "recommendation": risk["recommendation"],
        "reasons": risk["reasons"],
        "alerts": risk["alerts"],
        "restricoes": raw.get("restricoes", []),
        "protestos_detalhes": raw.get("protestos_detalhes", []),
        "dividas": raw.get("dividas", []),
    }


def calcular_risco_credito(
    *,
    score_serasa: int,
    situacao_cadastral: str,
    restricoes: int,
    protestos: int,
    dividas_vencidas: int,
) -> dict[str, Any]:
    status = normalize(situacao_cadastral)
    reasons: list[str] = []
    alerts: list[str] = []
    level = "baixo"

    if any(term in status for term in ("inapta", "baixada", "suspensa")):
        level = "critico"
        reasons.append("Situação cadastral incompatível com liberação automática.")
        alerts.append("Bloqueio preventivo recomendado.")
    elif score_serasa < 300 or restricoes > 0:
        level = "alto"
        reasons.append("Score Serasa baixo ou restrição financeira ativa.")
    elif score_serasa < 600:
        level = "medio"
        reasons.append("Score Serasa intermediário.")
    elif score_serasa > 700 and restricoes == 0:
        level = "baixo"
        reasons.append("Score Serasa forte e sem restrições ativas.")

    if protestos:
        reasons.append(f"{protestos} protesto(s) identificado(s).")
        if level == "baixo":
            level = "medio"
    if dividas_vencidas:
        reasons.append(f"{dividas_vencidas} dívida(s) vencida(s) identificada(s).")
        if level in ("baixo", "medio"):
            level = "alto"

    matrix = {
        "baixo": ("Baixo", "Aprovar", "Aprovar com limite compatível e monitoramento periódico."),
        "medio": ("Médio", "Aprovar com Garantia", "Liberar limite reduzido, exigir referências e revisar em 30/60 dias."),
        "alto": ("Alto", "Revisar Manualmente", "Solicitar garantias, entrada ou aprovação gerencial antes de vender a prazo."),
        "critico": ("Crítico", "Negar", "Não liberar crédito sem regularização e nova análise formal."),
    }
    label, decision, recommendation = matrix[level]
    return {
        "risk_level": level,
        "risk_label": label,
        "decision": decision,
        "recommendation": recommendation,
        "reasons": reasons or ["Nenhum alerta crítico identificado no mock/sandbox."],
        "alerts": alerts,
    }


def calcular_limite_sugerido(*, score_serasa: int, risk_level: str, restrictions: int, overdue: int) -> float:
    base = max(500.0, score_serasa * 85.0)
    factors = {
        "baixo": 1.0,
        "medio": 0.45,
        "alto": 0.18,
        "critico": 0.0,
    }
    penalty = max(0.0, 1 - ((restrictions * 0.15) + (overdue * 0.12)))
    return round(base * factors.get(risk_level, 0.25) * penalty, 2)


def gerar_analise_carteira(items: list[dict[str, Any]]) -> dict[str, Any]:
    distribution = {"baixo": 0, "medio": 0, "alto": 0, "critico": 0}
    exposure = {"baixo": 0.0, "medio": 0.0, "alto": 0.0, "critico": 0.0}
    with_restrictions = []
    score_drop = []
    alerts = []
    for item in items:
        risk = item.get("risk_level", "medio")
        distribution[risk] = distribution.get(risk, 0) + 1
        limit = float(item.get("recommended_limit") or 0)
        exposure[risk] = exposure.get(risk, 0.0) + limit
        if int(item.get("restricoes_financeiras") or 0) > 0:
            with_restrictions.append(item)
        if int(item.get("score_serasa") or 0) < int(item.get("score_anterior") or 0):
            score_drop.append(item)
        if risk in ("alto", "critico"):
            alerts.append(f"{item.get('document')} exige revisão prioritária ({item.get('risk_label')}).")

    best = sorted(items, key=lambda item: (item.get("score_final") or 0), reverse=True)[:10]
    worst = sorted(items, key=lambda item: (item.get("score_final") or 0))[:10]
    return {
        "summary": {
            "total_analisado": len(items),
            "baixo": distribution.get("baixo", 0),
            "medio": distribution.get("medio", 0),
            "alto": distribution.get("alto", 0),
            "critico": distribution.get("critico", 0),
            "exposicao_por_risco": exposure,
            "clientes_com_restricao": len(with_restrictions),
            "clientes_com_queda_score": len(score_drop),
            "limite_total_recomendado": round(sum(float(item.get("recommended_limit") or 0) for item in items), 2),
            "alertas_prioritarios": alerts[:12],
        },
        "ranking_melhores": best,
        "ranking_piores": worst,
        "items": items,
    }


def score_combinado(
    *,
    score_serasa: int,
    restricoes: int,
    protestos: int,
    dividas_vencidas: int,
    situacao_cadastral: str,
) -> int:
    score = score_serasa
    score -= restricoes * 80
    score -= protestos * 35
    score -= dividas_vencidas * 55
    if any(term in normalize(situacao_cadastral) for term in ("inapta", "baixada", "suspensa")):
        score -= 250
    return max(0, min(1000, int(score)))


def only_digits(value: str) -> str:
    return "".join(ch for ch in str(value or "") if ch.isdigit())


def normalize(value: str) -> str:
    return str(value or "").casefold()


def _first(payload: dict[str, Any], *keys: str, default: Any = None) -> Any:
    for key in keys:
        if key in payload and payload[key] is not None:
            return payload[key]
    return default
