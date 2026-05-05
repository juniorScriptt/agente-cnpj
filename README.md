# agente-cnpj

Agente simples em Python para validar CNPJ e consultar dados publicos usando BrasilAPI com fallback para Minha Receita.

Interface desenvolvida por Scriptt.

## Como usar

Na pasta do projeto, execute:

```powershell
python app.py
```

Depois abra:

```text
http://127.0.0.1:8000
```

No Windows, tambem da para abrir pelo arquivo:

```text
abrir_agente_cnpj.bat
```

Tambem da para usar pelo terminal:

```powershell
python main.py 11.222.333/0001-81
```

## Recursos da interface

- Consulta CNPJ
- Historico local persistente
- Cache local por 24 horas
- Busca por razao social, nome fantasia, cidade ou CNPJ dentro do historico/cache local
- Exportacao em CSV, JSON e relatorio para PDF pela impressao do navegador
- Detalhes cadastrais, socios/QSA e CNAEs secundarios quando a fonte retornar esses dados
- Logo Scriptt e credito "Desenvolvido por Scriptt"
- Lista de clientes do banco GEST via tabela `CADCLI`
- Filtros do `CADCLI` por periodo (`DATCAD`), nome, codigo (`CODCLI`) e CNPJ (`CGCCLI`)
- Validacao interna de CNPJ e marcacao local "OK usuario"
- Atalho para consulta manual no Sintegra, copiando o CNPJ
- Area preparada para Analise de Credito
- UX com fluxo por etapas: consulta, clientes GEST, resultado, analise, referencias e resumo
- Card de semaforo durante a consulta: pronto, consultando, concluido ou alerta
- Recomendacoes automaticas com acoes, cuidados e estrategias para credito
- Referencias comerciais manuais por CNPJ
- Acoes de compartilhar: copiar resumo, WhatsApp, CSV, impressao/PDF

## Banco GEST

O app nao grava senha no codigo. Para habilitar a lista de clientes, inicie o servidor com as variaveis:

```powershell
$env:GEST_DB_SERVER="192.168.0.100"
$env:GEST_DB_USER="sa"
$env:GEST_DB_NAME="gest"
$env:GEST_DB_PASSWORD="sua_senha"
python app.py
```

Por seguranca, nao coloque a senha em arquivos versionados.

Para validar sem consultar a internet:

```powershell
python main.py 11.222.333/0001-81 --sem-consulta
```

Para receber a resposta completa em JSON:

```powershell
python main.py 11.222.333/0001-81 --json
```

## Desenvolvimento

Rodar testes:

```powershell
python -m unittest discover -s tests
```

## Fontes de dados

A consulta tenta primeiro o endpoint publico de CNPJ da BrasilAPI:

```text
https://brasilapi.com.br/api/cnpj/v1/{cnpj}
```

Se a primeira fonte falhar ou nao encontrar o CNPJ, o app tenta a Minha Receita:

```text
https://minhareceita.org/{cnpj}
```
