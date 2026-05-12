# Agente Comercial CNPJ 360
Sistema para consulta, qualificação comercial, cache local, arquivamento e relatórios de CNPJs. O projeto roda como aplicativo desktop Electron ou como painel web em uma VPS.

## Instalação
```bash
npm install
npm start
```

## Execução em VPS
Recomendado: Node.js 20 LTS.

Em Ubuntu/Debian, instale os pacotes nativos necessários para o SQLite:

```bash
sudo apt update
sudo apt install -y build-essential python3 make g++
```

```bash
npm install
npm run start:web
```

Por padrão o servidor web escuta em:

```text
http://0.0.0.0:3000
```

Para escolher outra porta:

```bash
PORT=8080 npm run start:web
```

Em produção, use um gerenciador como PM2:

```bash
npm install -g pm2
pm2 start src/server/server.js --name agente-cnpj-360
pm2 save
```

Exemplo com Nginx como proxy reverso:

```nginx
server {
  server_name seu-dominio.com.br;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Se quiser separar o banco da pasta do projeto:

```bash
CNPJ360_DATA_DIR=/var/lib/agente-cnpj-360 PORT=3000 npm run start:web
```

O banco SQLite será criado automaticamente como `cnpj360.db` dentro da pasta `data` ou da pasta definida em `CNPJ360_DATA_DIR`.

## Build Windows
```bash
npm run build
```

## Funcionalidades
- Consulta individual com BrasilAPI e fallback CNPJ.ws.
- Validação completa de CNPJ e limpeza de máscara.
- Cache local em SQLite para evitar bloqueio e reduzir consumo de API.
- Classificação comercial automática (Apto, Verificar Manualmente, Não Recomendado).
- Score comercial de 0 a 100 configurável via regras.
- Dashboard inicial com indicadores.
- Módulo de lote (base para importação/exportação).
- Arquivamento com status comerciais.
- Impressão e geração de arquivo para PDF/HTML.

## Importação
Aceita CSV/TXT/XLSX (estrutura preparada em `src/utils/csvUtils.js`).

## Formato sugerido CSV
```csv
cnpj
11222333000181
19131243000197
```

## Limites públicos de API
- CNPJ.ws pública: 3 req/min por IP.
- CNPJá pública: 5 req/min por IP.
- O sistema usa cache para reduzir chamadas e pode ser estendido para modos seguro/moderado/rápido.

## Estrutura
Conforme especificação solicitada em `src/main`, `src/services`, `src/utils`, `src/renderer` com páginas e componentes dedicados.
