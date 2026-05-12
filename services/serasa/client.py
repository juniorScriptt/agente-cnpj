from services.credit.client import (
    BureauError as SerasaErro,
    CreditClient as SerasaClient,
    calcular_limite_sugerido,
    calcular_risco_credito,
    consultar_cnpj,
    consultar_cpf,
    gerar_analise_carteira,
    normalizar_resposta_bureau,
)
from services.credit.providers import load_bureau_config


def normalizar_resposta_serasa(raw, *, document_type: str):
    provider = f"{load_bureau_config().provider}_mock"
    return normalizar_resposta_bureau(raw, document_type=document_type, fallback_provider=provider)
