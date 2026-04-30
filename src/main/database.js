const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(process.cwd(), 'data', 'cnpj360.db');
const db = new Database(dbPath);

function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS empresas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cnpj TEXT UNIQUE,
      razao_social TEXT,
      nome_fantasia TEXT,
      situacao TEXT,
      data_situacao TEXT,
      motivo_situacao TEXT,
      uf TEXT,
      municipio TEXT,
      endereco TEXT,
      bairro TEXT,
      cep TEXT,
      telefone TEXT,
      email TEXT,
      cnae_principal_codigo TEXT,
      cnae_principal_descricao TEXT,
      cnaes_secundarios_json TEXT,
      natureza_juridica TEXT,
      porte TEXT,
      tipo_estabelecimento TEXT,
      data_abertura TEXT,
      classificacao_comercial TEXT,
      score_comercial INTEGER,
      observacoes TEXT,
      fonte_api TEXT,
      data_ultima_consulta TEXT
    );
    CREATE TABLE IF NOT EXISTS consultas (id INTEGER PRIMARY KEY, cnpj TEXT, status_http INTEGER, cache INTEGER, erro TEXT, tempo_resposta INTEGER, lote_id INTEGER, criado_em TEXT DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS lotes (id INTEGER PRIMARY KEY, nome_arquivo TEXT, status TEXT, progresso INTEGER DEFAULT 0, criado_em TEXT DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS arquivos_importados (id INTEGER PRIMARY KEY, nome TEXT, tipo TEXT, criado_em TEXT DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS arquivos_arquivados (id INTEGER PRIMARY KEY, cnpj TEXT, status TEXT, observacao TEXT, criado_em TEXT DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS configuracoes (chave TEXT PRIMARY KEY, valor TEXT);
    CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY, tipo TEXT, mensagem TEXT, payload TEXT, criado_em TEXT DEFAULT CURRENT_TIMESTAMP);
  `);
}

module.exports = { db, initDatabase };
