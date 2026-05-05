from .client import (
    SerasaClient,
    SerasaErro,
    calcular_limite_sugerido,
    calcular_risco_credito,
    consultar_cnpj,
    consultar_cpf,
    gerar_analise_carteira,
    normalizar_resposta_serasa,
)

serasaClient = SerasaClient

__all__ = [
    "SerasaClient",
    "SerasaErro",
    "calcular_limite_sugerido",
    "calcular_risco_credito",
    "consultar_cnpj",
    "consultar_cpf",
    "gerar_analise_carteira",
    "normalizar_resposta_serasa",
    "serasaClient",
]
