# Agente Comercial CNPJ 360
Sistema desktop em Electron para consulta, qualificação comercial, cache local, arquivamento e relatórios de CNPJs.

## Instalação
```bash
npm install
npm start
```
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
