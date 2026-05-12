const path = require('path');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const { initDatabase, db } = require('../main/database');
const { consultarCNPJ } = require('../services/cnpjService');

const app = express();
const port = Number(process.env.PORT || 3000);
const rendererDir = path.join(__dirname, '..', 'renderer');

initDatabase();

app.disable('x-powered-by');
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(compression());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(rendererDir));

function getStats() {
  const total = db.prepare('SELECT COUNT(*) c FROM empresas').get().c;
  const ativos = db.prepare("SELECT COUNT(*) c FROM empresas WHERE UPPER(situacao) LIKE '%ATIV%'").get().c;
  const nao = db.prepare("SELECT COUNT(*) c FROM empresas WHERE classificacao_comercial='NÃO RECOMENDADO'").get().c;
  return { total, ativos, nao };
}

app.get('/api/health', (_, res) => {
  res.json({ ok: true, app: 'Agente Comercial CNPJ 360' });
});

app.get('/api/stats', (_, res, next) => {
  try {
    res.json(getStats());
  } catch (error) {
    next(error);
  }
});

app.get('/api/empresas', (_, res, next) => {
  try {
    const rows = db.prepare('SELECT * FROM empresas ORDER BY data_ultima_consulta DESC').all();
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

app.post('/api/cnpj/consultar', async (req, res, next) => {
  try {
    const { cnpj, force = false } = req.body;
    const result = await consultarCNPJ(cnpj, force);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

app.post('/api/arquivos/arquivar', (req, res, next) => {
  try {
    const { cnpj, status = 'Em análise', observacao = '' } = req.body;
    if (!cnpj) {
      res.status(400).json({ error: 'CNPJ é obrigatório para arquivar.' });
      return;
    }
    const result = db
      .prepare('INSERT INTO arquivos_arquivados (cnpj,status,observacao) VALUES (?,?,?)')
      .run(cnpj, status, observacao);
    res.json({ ok: true, id: result.lastInsertRowid });
  } catch (error) {
    next(error);
  }
});

app.post('/api/exportar/html', (req, res) => {
  const { conteudo = '' } = req.body;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="relatorio-cnpj-360.html"');
  res.send(conteudo);
});

app.get('*', (_, res) => {
  res.sendFile(path.join(rendererDir, 'index.html'));
});

app.use((error, req, res, _next) => {
  const statusCode = error.status || error.statusCode || 500;
  db.prepare('INSERT INTO logs (tipo, mensagem, payload) VALUES (?,?,?)').run(
    'ERRO_API_WEB',
    error.message,
    JSON.stringify({ path: req.path, method: req.method, statusCode })
  );
  res.status(statusCode).json({ error: error.message || 'Erro interno do servidor.' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Agente Comercial CNPJ 360 web em http://0.0.0.0:${port}`);
});
