from __future__ import annotations

from hashlib import sha256


def resposta_mock(document: str, document_type: str) -> dict:
    digits = "".join(ch for ch in document if ch.isdigit())
    bucket = _bucket(digits)
    scenarios = {
        "baixo": {
            "score": 820,
            "probabilidade_inadimplencia": 4.8,
            "restricoes_financeiras": 0,
            "protestos": 0,
            "dividas_vencidas": 0,
            "pendencias_comerciais": 0,
            "acoes_judiciais": 0,
            "situacao_cadastral": "REGULAR",
            "score_anterior": 790,
        },
        "medio": {
            "score": 560,
            "probabilidade_inadimplencia": 18.5,
            "restricoes_financeiras": 0,
            "protestos": 1,
            "dividas_vencidas": 0,
            "pendencias_comerciais": 1,
            "acoes_judiciais": 0,
            "situacao_cadastral": "REGULAR",
            "score_anterior": 610,
        },
        "alto": {
            "score": 280,
            "probabilidade_inadimplencia": 42.0,
            "restricoes_financeiras": 2,
            "protestos": 3,
            "dividas_vencidas": 2,
            "pendencias_comerciais": 4,
            "acoes_judiciais": 1,
            "situacao_cadastral": "REGULAR",
            "score_anterior": 430,
        },
        "critico": {
            "score": 120,
            "probabilidade_inadimplencia": 71.0,
            "restricoes_financeiras": 5,
            "protestos": 7,
            "dividas_vencidas": 5,
            "pendencias_comerciais": 8,
            "acoes_judiciais": 3,
            "situacao_cadastral": "INAPTA",
            "score_anterior": 360,
        },
    }
    data = scenarios[bucket].copy()
    data.update(
        {
            "document": digits,
            "document_type": document_type,
            "provider": "serasa_mock",
            "environment": "sandbox",
            "produto": "score-relatorio-credito",
            "request_id": f"mock-{sha256(digits.encode()).hexdigest()[:12]}",
            "restricoes": _mock_items("Restrição financeira", data["restricoes_financeiras"]),
            "protestos_detalhes": _mock_items("Protesto", data["protestos"]),
            "dividas": _mock_items("Dívida vencida", data["dividas_vencidas"]),
        }
    )
    return data


def _bucket(digits: str) -> str:
    if not digits:
      return "medio"
    forced = {
        "0001": "baixo",
        "0002": "medio",
        "0003": "alto",
        "0004": "critico",
    }
    suffix = digits[-4:]
    if suffix in forced:
        return forced[suffix]
    return ("baixo", "medio", "alto", "critico")[sum(int(ch) for ch in digits) % 4]


def _mock_items(label: str, total: int) -> list[dict]:
    return [
        {
            "tipo": label,
            "valor": 750 * index,
            "data": "2026-04-01",
            "origem": "Mock Serasa Experian",
        }
        for index in range(1, min(total, 5) + 1)
    ]
