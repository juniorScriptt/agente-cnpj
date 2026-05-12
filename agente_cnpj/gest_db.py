import os
import subprocess

from .cnpj import formatar_cnpj, normalizar_cnpj, validar_cnpj


class GestDBErro(RuntimeError):
    pass


def listar_clientes(
    limit: int = 50,
    termo: str = "",
    codigo: str = "",
    cnpj: str = "",
    cpf: str = "",
    data_inicio: str = "",
    data_fim: str = "",
) -> list[dict]:
    limit = max(1, min(int(limit or 50), 500))
    filtro = _montar_filtro(
        termo=termo,
        codigo=codigo,
        cnpj=cnpj,
        cpf=cpf,
        data_inicio=data_inicio,
        data_fim=data_fim,
    )
    sql = f"""
SET NOCOUNT ON;
SELECT TOP ({limit})
  CAST(CODCLI AS varchar(20)),
  REPLACE(REPLACE(REPLACE(ISNULL(NOMCLI,''), CHAR(9), ' '), CHAR(10), ' '), '|', ' '),
  REPLACE(REPLACE(REPLACE(ISNULL(NOMFAN,''), CHAR(9), ' '), CHAR(10), ' '), '|', ' '),
  ISNULL(CGCCLI,''),
  REPLACE(REPLACE(REPLACE(ISNULL(CIDCLI,''), CHAR(9), ' '), CHAR(10), ' '), '|', ' '),
  ISNULL(ESTCLI,''),
  ISNULL(INSEST,''),
  ISNULL(STACLI,''),
  CONVERT(varchar(10), DATCAD, 23)
FROM dbo.CADCLI
WHERE ISNULL(CGCCLI,'') <> ''
  AND LEN(REPLACE(REPLACE(REPLACE(REPLACE(CGCCLI,'.',''),'/',''),'-',''),' ','')) IN (11, 14)
  {filtro}
ORDER BY NOMCLI;
"""
    rows = _executar_sql(sql)
    clientes = []

    for row in rows:
        if len(row) < 9:
            continue

        documento = row[3].strip()
        digitos = _normalizar_documento(documento)
        tipo_documento = _tipo_documento(digitos)
        clientes.append(
            {
                "codigo": row[0].strip(),
                "nome": row[1].strip(),
                "fantasia": row[2].strip(),
                "documento": _formatar_documento(digitos),
                "documento_digitos": digitos,
                "documento_tipo": tipo_documento,
                "documento_valido": _documento_valido(digitos),
                "cnpj": formatar_cnpj(digitos) if tipo_documento == "CNPJ" else "",
                "cnpj_digitos": digitos if tipo_documento == "CNPJ" else "",
                "cnpj_valido": validar_cnpj(digitos) if tipo_documento == "CNPJ" else False,
                "cpf": _formatar_cpf(digitos) if tipo_documento == "CPF" else "",
                "cpf_digitos": digitos if tipo_documento == "CPF" else "",
                "cpf_valido": _validar_cpf(digitos) if tipo_documento == "CPF" else False,
                "cidade": row[4].strip(),
                "uf": row[5].strip(),
                "inscricao_estadual": row[6].strip(),
                "status": row[7].strip(),
                "data_cadastro": row[8].strip(),
            }
        )

    return clientes


def analisar_historico_cliente(cnpj: str = "", codigo: str = "") -> dict:
    cliente = _buscar_cliente(cnpj=cnpj, codigo=codigo)
    if not cliente:
        return {
            "ok": True,
            "cliente_cadastrado": False,
            "mensagem": "Cliente nao encontrado no CADCLI. Historico interno disponivel apenas para clientes cadastrados.",
        }

    codcli = int(cliente["codigo"])
    duplicatas = _resumo_duplicatas(codcli)
    compras = _resumo_compras(codcli)
    pagamentos = _resumo_pagamentos(codcli)
    indicadores = _calcular_indicadores_internos(duplicatas, compras, pagamentos)
    parecer = gerar_parecer_historico_interno(indicadores)

    return {
        "ok": True,
        "cliente_cadastrado": True,
        "cliente": cliente,
        "duplicatas": duplicatas,
        "compras": compras,
        "pagamentos": pagamentos,
        "indicadores": indicadores,
        "parecer": parecer,
    }


def gerar_parecer_historico_interno(indicadores: dict) -> dict:
    score = int(indicadores.get("score_interno", 0))
    valor_aberto = float(indicadores.get("valor_aberto", 0) or 0)
    valor_vencido = float(indicadores.get("valor_vencido", 0) or 0)
    percentual_vencido = float(indicadores.get("percentual_aberto_vencido", 0) or 0)
    pontualidade = float(indicadores.get("pontualidade_percentual", 0) or 0)
    compras_12m = float(indicadores.get("compras_12m", 0) or 0)
    frequencia = float(indicadores.get("frequencia_compras_dias", 0) or 0)
    recencia = int(indicadores.get("recencia_compra_dias", 0) or 0)

    if score >= 80:
        nivel = "favoravel"
        titulo = "Desempenho interno favoravel"
        opiniao = "Cliente apresenta bom comportamento comercial no historico interno, com sinais positivos para relacionamento recorrente."
        acao = "Pode apoiar aumento ou manutencao de limite, mantendo acompanhamento de duplicatas abertas."
    elif score >= 60:
        nivel = "moderado"
        titulo = "Desempenho interno moderado"
        opiniao = "Cliente possui relacionamento util para analise, mas exige revisao de exposicao aberta, frequencia recente e pontualidade."
        acao = "Liberar com limite controlado, prazo menor ou validacao manual do financeiro."
    else:
        nivel = "atencao"
        titulo = "Desempenho interno exige cuidado"
        opiniao = "Historico interno indica risco operacional maior para venda a prazo."
        acao = "Priorizar regularizacao de pendencias, entrada antecipada, garantia ou bloqueio temporario de novo credito."

    alertas = []
    if valor_vencido > 0:
        alertas.append(f"Existem duplicatas vencidas em aberto ({_formatar_moeda_texto(valor_vencido)}).")
    if percentual_vencido >= 25:
        alertas.append("Parcela relevante da exposicao aberta esta vencida.")
    if pontualidade and pontualidade < 70:
        alertas.append("Pontualidade historica abaixo do ideal para ampliacao de credito.")
    if compras_12m <= 0:
        alertas.append("Sem compras nos ultimos 12 meses no historico consultado.")
    if recencia > 180:
        alertas.append(f"Ultima compra ha {recencia} dia(s), indicando relacionamento pouco recente.")
    if frequencia > 0 and frequencia <= 45:
        alertas.append("Frequencia de compra recorrente, sinal comercial positivo.")
    if valor_aberto <= 0 and compras_12m > 0:
        alertas.append("Cliente sem exposicao aberta no momento, bom sinal para nova analise.")

    return {
        "nivel": nivel,
        "titulo": titulo,
        "opiniao": opiniao,
        "acao": acao,
        "alertas": alertas[:5],
    }


def _buscar_cliente(cnpj: str = "", codigo: str = "") -> dict | None:
    filtros = []
    codigo = str(codigo or "").strip()
    if codigo.isdigit():
        filtros.append(f"CODCLI = {int(codigo)}")

    cnpj_digitos = normalizar_cnpj(cnpj)
    if cnpj_digitos:
        filtros.append(
            "REPLACE(REPLACE(REPLACE(REPLACE(CGCCLI,'.',''),'/',''),'-',''),' ','') "
            f"= '{cnpj_digitos}'"
        )

    if not filtros:
        return None

    sql = f"""
SET NOCOUNT ON;
SELECT TOP 1
  CAST(CODCLI AS varchar(20)),
  REPLACE(REPLACE(REPLACE(ISNULL(NOMCLI,''), CHAR(9), ' '), CHAR(10), ' '), '|', ' '),
  REPLACE(REPLACE(REPLACE(ISNULL(NOMFAN,''), CHAR(9), ' '), CHAR(10), ' '), '|', ' '),
  ISNULL(CGCCLI,''),
  REPLACE(REPLACE(REPLACE(ISNULL(CIDCLI,''), CHAR(9), ' '), CHAR(10), ' '), '|', ' '),
  ISNULL(ESTCLI,''),
  CONVERT(varchar(10), DATCAD, 23)
FROM dbo.CADCLI
WHERE {" OR ".join(filtros)}
ORDER BY CODCLI;
"""
    rows = _executar_sql(sql)
    if not rows:
        return None
    row = rows[0]
    digitos = normalizar_cnpj(row[3] if len(row) > 3 else "")
    return {
        "codigo": row[0].strip(),
        "nome": row[1].strip(),
        "fantasia": row[2].strip(),
        "cnpj": formatar_cnpj(digitos),
        "cnpj_digitos": digitos,
        "cidade": row[4].strip(),
        "uf": row[5].strip(),
        "data_cadastro": row[6].strip(),
    }


def _resumo_duplicatas(codcli: int) -> dict:
    sql = f"""
SET NOCOUNT ON;
SELECT
  COUNT(*),
  ISNULL(SUM(ISNULL(VALOR,0)),0),
  COUNT(DISTINCT CASE WHEN ISNULL(NUMNF,0) > 0 THEN NUMNF END),
  ISNULL(SUM(CASE WHEN ISNULL(NUMNF,0) > 0 THEN ISNULL(VALOR,0) ELSE 0 END),0),
  ISNULL(SUM(CASE WHEN UPPER(ISNULL(JAPAGA,'')) IN ('S','SIM') OR ISNULL(VLPAGO,0) >= ISNULL(VALOR,0) THEN 1 ELSE 0 END),0),
  ISNULL(SUM(CASE WHEN UPPER(ISNULL(JAPAGA,'')) IN ('S','SIM') OR ISNULL(VLPAGO,0) >= ISNULL(VALOR,0) THEN ISNULL(VLPAGO,ISNULL(VALOR,0)) ELSE 0 END),0),
  ISNULL(SUM(CASE WHEN NOT (UPPER(ISNULL(JAPAGA,'')) IN ('S','SIM') OR ISNULL(VLPAGO,0) >= ISNULL(VALOR,0)) THEN 1 ELSE 0 END),0),
  ISNULL(SUM(CASE WHEN NOT (UPPER(ISNULL(JAPAGA,'')) IN ('S','SIM') OR ISNULL(VLPAGO,0) >= ISNULL(VALOR,0)) THEN ISNULL(VALOR,0) - ISNULL(VLPAGO,0) ELSE 0 END),0),
  ISNULL(SUM(CASE WHEN NOT (UPPER(ISNULL(JAPAGA,'')) IN ('S','SIM') OR ISNULL(VLPAGO,0) >= ISNULL(VALOR,0)) AND VENCIM < CAST(GETDATE() AS date) THEN 1 ELSE 0 END),0),
  ISNULL(SUM(CASE WHEN NOT (UPPER(ISNULL(JAPAGA,'')) IN ('S','SIM') OR ISNULL(VLPAGO,0) >= ISNULL(VALOR,0)) AND VENCIM < CAST(GETDATE() AS date) THEN ISNULL(VALOR,0) - ISNULL(VLPAGO,0) ELSE 0 END),0),
  CONVERT(varchar(10), MAX(EMISSAO), 23),
  CONVERT(varchar(10), MAX(VENCIM), 23)
FROM dbo.MOVREC
WHERE CODCLI = {codcli};
"""
    row = _first_row(sql, 12)
    return {
        "quantidade_total": _int(row[0]),
        "valor_total": _float(row[1]),
        "compras_faturadas": _int(row[2]),
        "valor_faturado": _float(row[3]),
        "quantidade_paga": _int(row[4]),
        "valor_pago": _float(row[5]),
        "quantidade_aberta": _int(row[6]),
        "valor_aberto": _float(row[7]),
        "quantidade_vencida": _int(row[8]),
        "valor_vencido": _float(row[9]),
        "ultima_emissao": row[10],
        "ultimo_vencimento": row[11],
    }


def _resumo_compras(codcli: int) -> dict:
    sql = f"""
SET NOCOUNT ON;
WITH movimentos AS (
  SELECT
    DOCUM,
    DATSAI,
    CASE
      WHEN ISNULL(totalv,0) > 0 THEN ISNULL(totalv,0)
      WHEN ISNULL(VLRSAI,0) > 0 AND ISNULL(QUASAI,0) > 0 THEN ISNULL(VLRSAI,0) * ISNULL(QUASAI,1)
      WHEN ISNULL(totalmc,0) > 0 THEN ISNULL(totalmc,0)
      WHEN ISNULL(vlrent,0) > 0 THEN ISNULL(vlrent,0)
      ELSE 0
    END AS valor_movimento
  FROM dbo.MOVSAI
  WHERE CODCLI = {codcli}
)
SELECT
  COUNT(DISTINCT DOCUM),
  ISNULL(SUM(valor_movimento),0),
  ISNULL(SUM(CASE WHEN DATSAI >= DATEADD(month, -12, GETDATE()) THEN valor_movimento ELSE 0 END),0),
  COUNT(DISTINCT CASE WHEN DATSAI >= DATEADD(month, -12, GETDATE()) THEN DOCUM END),
  CONVERT(varchar(10), MIN(DATSAI), 23),
  CONVERT(varchar(10), MAX(DATSAI), 23),
  ISNULL(DATEDIFF(day, MIN(DATSAI), MAX(DATSAI)),0),
  ISNULL(DATEDIFF(day, MAX(DATSAI), GETDATE()),0)
FROM movimentos;
"""
    row = _first_row(sql, 8)
    documentos_total = _int(row[0])
    documentos_12m = _int(row[3])
    valor_total = _float(row[1])
    valor_12m = _float(row[2])
    periodo_dias = _int(row[6])
    return {
        "documentos_total": documentos_total,
        "valor_total": valor_total,
        "valor_12m": valor_12m,
        "documentos_12m": documentos_12m,
        "primeira_compra": row[4],
        "ultima_compra": row[5],
        "periodo_compras_dias": periodo_dias,
        "recencia_compra_dias": _int(row[7]) if documentos_total else 0,
        "ticket_medio": round(valor_total / documentos_total, 2) if documentos_total else 0.0,
        "ticket_medio_12m": round(valor_12m / documentos_12m, 2) if documentos_12m else 0.0,
        "frequencia_compras_dias": round(periodo_dias / max(documentos_total - 1, 1), 1) if documentos_total > 1 else 0.0,
        "compras_mes_12m": round(documentos_12m / 12, 2) if documentos_12m else 0.0,
    }


def _resumo_pagamentos(codcli: int) -> dict:
    sql = f"""
SET NOCOUNT ON;
SELECT
  COUNT(*),
  ISNULL(SUM(ISNULL(VLPAGO,0)),0),
  ISNULL(AVG(CASE WHEN PAGAME IS NOT NULL THEN DATEDIFF(day, VENCIM, PAGAME) END),0),
  ISNULL(SUM(CASE WHEN PAGAME IS NOT NULL AND PAGAME <= VENCIM THEN 1 ELSE 0 END),0),
  ISNULL(SUM(CASE WHEN PAGAME IS NOT NULL AND PAGAME > VENCIM THEN 1 ELSE 0 END),0),
  CONVERT(varchar(10), MAX(PAGAME), 23)
FROM dbo.MOVREC
WHERE CODCLI = {codcli}
  AND (UPPER(ISNULL(JAPAGA,'')) IN ('S','SIM') OR PAGAME IS NOT NULL OR ISNULL(VLPAGO,0) > 0);
"""
    row = _first_row(sql, 6)
    return {
        "quantidade_pagamentos": _int(row[0]),
        "valor_pago": _float(row[1]),
        "atraso_medio_dias": round(_float(row[2]), 1),
        "pagamentos_pontuais": _int(row[3]),
        "pagamentos_atrasados": _int(row[4]),
        "ultimo_pagamento": row[5],
    }


def _calcular_indicadores_internos(duplicatas: dict, compras: dict, pagamentos: dict) -> dict:
    valor_total_duplicatas = float(duplicatas.get("valor_total", 0) or 0)
    valor_aberto = float(duplicatas.get("valor_aberto", 0) or 0)
    valor_vencido = float(duplicatas.get("valor_vencido", 0) or 0)
    qtd_pagamentos = int(pagamentos.get("quantidade_pagamentos", 0) or 0)
    pontuais = int(pagamentos.get("pagamentos_pontuais", 0) or 0)
    atraso_medio = float(pagamentos.get("atraso_medio_dias", 0) or 0)
    documentos_total = int(compras.get("documentos_total", 0) or 0)
    valor_total_compras = float(compras.get("valor_total", 0) or 0)
    ticket_medio = float(compras.get("ticket_medio", 0) or 0)
    frequencia = float(compras.get("frequencia_compras_dias", 0) or 0)
    recencia = int(compras.get("recencia_compra_dias", 0) or 0)

    pontualidade = (pontuais / qtd_pagamentos * 100) if qtd_pagamentos else 0
    exposicao_percentual = (valor_aberto / valor_total_duplicatas * 100) if valor_total_duplicatas else 0
    percentual_vencido = (valor_vencido / valor_aberto * 100) if valor_aberto else 0

    score = 70
    if pontualidade >= 85:
        score += 15
    elif pontualidade >= 65:
        score += 5
    elif qtd_pagamentos:
        score -= 15

    if valor_vencido > 0:
        score -= 25
    if percentual_vencido >= 25:
        score -= 15
    if atraso_medio > 10:
        score -= 10
    if compras.get("valor_12m", 0) > 0:
        score += 5
    if documentos_total >= 10:
        score += 5
    if frequencia and frequencia <= 45:
        score += 5
    if recencia > 365:
        score -= 10
    elif recencia and recencia <= 90:
        score += 5
    if valor_aberto <= 0 and valor_total_duplicatas > 0:
        score += 5

    score = max(0, min(100, score))
    return {
        "score_interno": score,
        "pontualidade_percentual": round(pontualidade, 1),
        "exposicao_aberta_percentual": round(exposicao_percentual, 1),
        "percentual_aberto_vencido": round(percentual_vencido, 1),
        "atraso_medio_dias": atraso_medio,
        "valor_aberto": valor_aberto,
        "valor_vencido": valor_vencido,
        "compras_12m": float(compras.get("valor_12m", 0) or 0),
        "compras_total": documentos_total,
        "valor_total_compras": valor_total_compras,
        "ticket_medio": ticket_medio,
        "ticket_medio_12m": float(compras.get("ticket_medio_12m", 0) or 0),
        "frequencia_compras_dias": frequencia,
        "compras_mes_12m": float(compras.get("compras_mes_12m", 0) or 0),
        "recencia_compra_dias": recencia,
        "compras_faturadas": int(duplicatas.get("compras_faturadas", 0) or 0),
        "valor_faturado": float(duplicatas.get("valor_faturado", 0) or 0),
    }


def _first_row(sql: str, size: int) -> list[str]:
    rows = _executar_sql(sql)
    if not rows:
        return [""] * size
    row = rows[0]
    row = ["" if str(value).upper() == "NULL" else value for value in row]
    return row + [""] * max(0, size - len(row))


def _float(value: str) -> float:
    try:
        return float(str(value or "0").replace(",", "."))
    except ValueError:
        return 0.0


def _int(value: str) -> int:
    try:
        return int(float(str(value or "0").replace(",", ".")))
    except ValueError:
        return 0


def _formatar_moeda_texto(value: float) -> str:
    return f"R$ {value:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")


def _executar_sql(sql: str) -> list[list[str]]:
    password = os.getenv("GEST_DB_PASSWORD")
    if not password:
        raise GestDBErro("Configure a variavel GEST_DB_PASSWORD para acessar o banco gest.")

    server = os.getenv("GEST_DB_SERVER", "192.168.0.100")
    user = os.getenv("GEST_DB_USER", "sa")
    database = os.getenv("GEST_DB_NAME", "gest")
    env = os.environ.copy()
    env["SQLCMDPASSWORD"] = password

    command = [
        "sqlcmd",
        "-S",
        server,
        "-U",
        user,
        "-d",
        database,
        "-C",
        "-h",
        "-1",
        "-W",
        "-s",
        "|",
        "-Q",
        sql,
    ]

    try:
        completed = subprocess.run(
            command,
            check=False,
            capture_output=True,
            encoding="utf-8",
            errors="replace",
            env=env,
            timeout=30,
        )
    except FileNotFoundError as exc:
        raise GestDBErro("sqlcmd nao foi encontrado nesta maquina.") from exc
    except subprocess.TimeoutExpired as exc:
        raise GestDBErro("Tempo limite atingido ao consultar o banco gest.") from exc

    if completed.returncode != 0:
        detalhe = (completed.stderr or completed.stdout).strip()
        raise GestDBErro(f"Falha ao consultar banco gest: {detalhe}")

    rows = []
    for line in completed.stdout.splitlines():
        line = line.strip()
        if not line or line.startswith("("):
            continue
        rows.append([part.strip() for part in line.split("|")])

    return rows


def _montar_filtro(
    termo: str = "",
    codigo: str = "",
    cnpj: str = "",
    cpf: str = "",
    data_inicio: str = "",
    data_fim: str = "",
) -> str:
    filtros = []
    termo = str(termo or "").strip()
    if termo:
        safe = termo.replace("'", "''")
        like = f"%{safe}%"
        filtros.append(
            f"""(
    NOMCLI LIKE '{like}'
    OR NOMFAN LIKE '{like}'
    OR CIDCLI LIKE '{like}'
  )"""
        )

    codigo = str(codigo or "").strip()
    if codigo.isdigit():
        filtros.append(f"CODCLI = {int(codigo)}")

    cnpj_digitos = normalizar_cnpj(cnpj)
    if cnpj_digitos:
        filtros.append(
            "REPLACE(REPLACE(REPLACE(REPLACE(CGCCLI,'.',''),'/',''),'-',''),' ','') "
            f"LIKE '%{cnpj_digitos}%'"
        )

    cpf_digitos = _normalizar_documento(cpf)
    if len(cpf_digitos) == 11:
        filtros.append(
            "REPLACE(REPLACE(REPLACE(REPLACE(CGCCLI,'.',''),'/',''),'-',''),' ','') "
            f"LIKE '%{cpf_digitos}%'"
        )

    if _data_valida(data_inicio):
        filtros.append(f"DATCAD >= '{data_inicio}'")

    if _data_valida(data_fim):
        filtros.append(f"DATCAD < DATEADD(day, 1, '{data_fim}')")

    if not filtros:
        return ""

    return "\n  AND " + "\n  AND ".join(filtros)


def _data_valida(valor: str) -> bool:
    partes = str(valor or "").split("-")
    return (
        len(partes) == 3
        and len(partes[0]) == 4
        and len(partes[1]) == 2
        and len(partes[2]) == 2
        and all(parte.isdigit() for parte in partes)
    )


def _normalizar_documento(valor: str) -> str:
    return "".join(ch for ch in str(valor or "") if ch.isdigit())


def _tipo_documento(valor: str) -> str:
    if len(valor) == 14:
        return "CNPJ"
    if len(valor) == 11:
        return "CPF"
    return "Documento"


def _formatar_documento(valor: str) -> str:
    if len(valor) == 14:
        return formatar_cnpj(valor)
    if len(valor) == 11:
        return _formatar_cpf(valor)
    return valor


def _formatar_cpf(valor: str) -> str:
    digitos = _normalizar_documento(valor)
    if len(digitos) != 11:
        return digitos
    return f"{digitos[:3]}.{digitos[3:6]}.{digitos[6:9]}-{digitos[9:]}"


def _documento_valido(valor: str) -> bool:
    if len(valor) == 14:
        return validar_cnpj(valor)
    if len(valor) == 11:
        return _validar_cpf(valor)
    return False


def _validar_cpf(valor: str) -> bool:
    digitos = _normalizar_documento(valor)
    if len(digitos) != 11 or len(set(digitos)) == 1:
        return False

    soma = sum(int(digitos[idx]) * (10 - idx) for idx in range(9))
    resto = (soma * 10) % 11
    primeiro = 0 if resto == 10 else resto
    if primeiro != int(digitos[9]):
        return False

    soma = sum(int(digitos[idx]) * (11 - idx) for idx in range(10))
    resto = (soma * 10) % 11
    segundo = 0 if resto == 10 else resto
    return segundo == int(digitos[10])
