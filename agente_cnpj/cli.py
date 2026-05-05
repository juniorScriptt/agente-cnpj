import argparse
import json
import sys

from .client import ConsultaCNPJErro, consultar_cnpj
from .cnpj import formatar_cnpj, normalizar_cnpj, validar_cnpj


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        prog="agente-cnpj",
        description="Valida CNPJ e consulta dados publicos de empresas.",
    )
    parser.add_argument("cnpj", help="CNPJ com ou sem mascara")
    parser.add_argument(
        "--sem-consulta",
        action="store_true",
        help="Apenas valida o CNPJ, sem chamar a BrasilAPI.",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Mostra a resposta completa da consulta em JSON.",
    )
    parser.add_argument(
        "--timeout",
        type=float,
        default=10,
        help="Tempo limite da consulta em segundos.",
    )

    args = parser.parse_args(argv)
    digitos = normalizar_cnpj(args.cnpj)

    if not validar_cnpj(digitos):
        print(f"CNPJ invalido: {args.cnpj}", file=sys.stderr)
        return 2

    if args.sem_consulta:
        print(f"CNPJ valido: {formatar_cnpj(digitos)}")
        return 0

    try:
        dados = consultar_cnpj(digitos, timeout=args.timeout)
    except (ConsultaCNPJErro, ValueError) as exc:
        print(str(exc), file=sys.stderr)
        return 1

    if args.json:
        print(json.dumps(dados, ensure_ascii=False, indent=2, sort_keys=True))
        return 0

    _mostrar_resumo(dados)
    return 0


def _mostrar_resumo(dados: dict) -> None:
    campos = [
        ("CNPJ", "cnpj"),
        ("Razao social", "razao_social"),
        ("Nome fantasia", "nome_fantasia"),
        ("Situacao", "descricao_situacao_cadastral"),
        ("Abertura", "data_inicio_atividade"),
        ("CNAE principal", "cnae_fiscal_descricao"),
        ("Municipio", "municipio"),
        ("UF", "uf"),
    ]

    for rotulo, chave in campos:
        valor = dados.get(chave)
        if valor:
            print(f"{rotulo}: {valor}")
