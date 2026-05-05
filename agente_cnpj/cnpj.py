import re


_DIGITOS_RE = re.compile(r"\D")


def normalizar_cnpj(valor: str) -> str:
    """Remove mascara e retorna apenas os digitos do CNPJ."""
    return _DIGITOS_RE.sub("", str(valor or ""))


def formatar_cnpj(valor: str) -> str:
    digitos = normalizar_cnpj(valor)
    if len(digitos) != 14:
        return digitos
    return (
        f"{digitos[:2]}.{digitos[2:5]}.{digitos[5:8]}/"
        f"{digitos[8:12]}-{digitos[12:]}"
    )


def validar_cnpj(valor: str) -> bool:
    digitos = normalizar_cnpj(valor)

    if len(digitos) != 14:
        return False

    if digitos == digitos[0] * 14:
        return False

    primeiro = _calcular_digito(digitos[:12], [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
    segundo = _calcular_digito(
        digitos[:12] + str(primeiro),
        [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
    )

    return digitos[-2:] == f"{primeiro}{segundo}"


def _calcular_digito(base: str, pesos: list[int]) -> int:
    soma = sum(int(numero) * peso for numero, peso in zip(base, pesos))
    resto = soma % 11
    return 0 if resto < 2 else 11 - resto
