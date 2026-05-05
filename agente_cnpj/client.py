import json
from urllib.error import HTTPError, URLError
from urllib.parse import quote
from urllib.request import Request, urlopen

from .cnpj import normalizar_cnpj, validar_cnpj


BRASILAPI_CNPJ_URL = "https://brasilapi.com.br/api/cnpj/v1"
MINHA_RECEITA_CNPJ_URL = "https://minhareceita.org"

_PROVEDORES = [
    ("BrasilAPI", f"{BRASILAPI_CNPJ_URL}/{{cnpj}}"),
    ("Minha Receita", f"{MINHA_RECEITA_CNPJ_URL}/{{cnpj}}"),
]


class ConsultaCNPJErro(RuntimeError):
    pass


def consultar_cnpj(
    cnpj: str,
    *,
    timeout: float = 20,
    base_url: str | None = None,
) -> dict:
    digitos = normalizar_cnpj(cnpj)

    if not validar_cnpj(digitos):
        raise ValueError("CNPJ invalido.")

    provedores = (
        [("API customizada", f"{base_url.rstrip('/')}/{{cnpj}}")]
        if base_url
        else _PROVEDORES
    )
    erros = []

    for nome, url_template in provedores:
        try:
            dados = _baixar_json(url_template.format(cnpj=quote(digitos)), timeout)
        except ConsultaCNPJErro as exc:
            erros.append(f"{nome}: {exc}")
            continue

        dados.setdefault("fonte_consulta", nome)
        return dados

    detalhes = " | ".join(erros)
    raise ConsultaCNPJErro(f"Nao foi possivel consultar o CNPJ. {detalhes}")


def _baixar_json(url: str, timeout: float) -> dict:
    request = Request(url, headers={"User-Agent": "agente-cnpj/0.1"})

    try:
        with urlopen(request, timeout=timeout) as resposta:
            conteudo = resposta.read().decode("utf-8")
    except HTTPError as exc:
        mensagem = _extrair_mensagem_erro(exc)
        raise ConsultaCNPJErro(f"HTTP {exc.code}: {mensagem}") from exc
    except URLError as exc:
        raise ConsultaCNPJErro(f"falha de conexao: {exc.reason}") from exc
    except TimeoutError as exc:
        raise ConsultaCNPJErro("tempo limite atingido") from exc

    try:
        return json.loads(conteudo)
    except json.JSONDecodeError as exc:
        raise ConsultaCNPJErro("resposta nao esta em JSON valido") from exc


def _extrair_mensagem_erro(exc: HTTPError) -> str:
    try:
        payload = json.loads(exc.read().decode("utf-8"))
    except Exception:
        return exc.reason or "erro desconhecido"

    if isinstance(payload, dict):
        return str(payload.get("message") or payload.get("erro") or payload)
    return str(payload)
