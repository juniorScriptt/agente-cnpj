const { db } = require('../main/database');
const { limparCNPJ, validarCNPJ } = require('../utils/cnpjValidator');
const { consultarBrasilAPI } = require('./brasilApiService');
const { consultarCnpjWs } = require('./cnpjWsService');
const { classificarEmpresa } = require('./scoreService');

function mapBrasilApi(raw) {
  return {
    cnpj: raw.cnpj?.replace(/\D/g, ''), razao_social: raw.razao_social, nome_fantasia: raw.nome_fantasia,
    situacao: raw.descricao_situacao_cadastral || raw.situacao_cadastral, data_situacao: raw.data_situacao_cadastral,
    motivo_situacao: raw.motivo_situacao_cadastral, uf: raw.uf, municipio: raw.municipio,
    endereco: `${raw.logradouro || ''}, ${raw.numero || ''}`.trim(), bairro: raw.bairro, cep: raw.cep,
    telefone: raw.ddd_telefone_1, email: raw.email, cnae_principal_codigo: raw.cnae_fiscal,
    cnae_principal_descricao: raw.cnae_fiscal_descricao, cnaes_secundarios_json: JSON.stringify(raw.cnaes_secundarios || []),
    natureza_juridica: raw.natureza_juridica, porte: raw.porte, tipo_estabelecimento: raw.descricao_identificador_matriz_filial,
    data_abertura: raw.data_inicio_atividade
  };
}

async function consultarCNPJ(cnpj, force = false) {
  const limpo = limparCNPJ(cnpj);
  if (!validarCNPJ(limpo)) throw new Error('CNPJ inválido');
  const cached = db.prepare('SELECT * FROM empresas WHERE cnpj = ?').get(limpo);
  if (cached && !force) return { origem: 'CACHE', empresa: cached };
  let fonte = 'BrasilAPI'; let ret;
  try { ret = await consultarBrasilAPI(limpo); }
  catch (e) { fonte = 'CNPJ.ws'; ret = await consultarCnpjWs(limpo); }
  const e = mapBrasilApi(ret.data.estabelecimento ? {
    cnpj: ret.data.estabelecimento.cnpj,
    razao_social: ret.data.razao_social, nome_fantasia: ret.data.estabelecimento.nome_fantasia,
    descricao_situacao_cadastral: ret.data.estabelecimento.situacao_cadastral,
    data_situacao_cadastral: ret.data.estabelecimento.data_situacao_cadastral,
    uf: ret.data.estabelecimento.estado.sigla, municipio: ret.data.estabelecimento.cidade.nome,
    logradouro: ret.data.estabelecimento.tipo_logradouro + ' ' + ret.data.estabelecimento.logradouro,
    numero: ret.data.estabelecimento.numero, bairro: ret.data.estabelecimento.bairro,
    cep: ret.data.estabelecimento.cep, ddd_telefone_1: ret.data.estabelecimento.telefone1,
    email: ret.data.estabelecimento.email, cnae_fiscal: ret.data.estabelecimento.atividade_principal?.id,
    cnae_fiscal_descricao: ret.data.estabelecimento.atividade_principal?.text,
    cnaes_secundarios: ret.data.estabelecimento.atividades_secundarias, natureza_juridica: ret.data.natureza_juridica?.descricao,
    porte: ret.data.porte?.descricao, descricao_identificador_matriz_filial: ret.data.estabelecimento.tipo,
    data_inicio_atividade: ret.data.estabelecimento.data_inicio_atividade
  } : ret.data);
  const { score, classificacao } = classificarEmpresa(e, {});
  const row = { ...e, score_comercial: score, classificacao_comercial: classificacao, fonte_api: fonte, data_ultima_consulta: new Date().toISOString() };
  const cols = Object.keys(row);
  db.prepare(`INSERT INTO empresas (${cols.join(',')}) VALUES (${cols.map(c => '@'+c).join(',')}) ON CONFLICT(cnpj) DO UPDATE SET ${cols.filter(c=>c!=='cnpj').map(c=>`${c}=excluded.${c}`).join(',')}`).run(row);
  return { origem: 'API', empresa: row };
}
module.exports = { consultarCNPJ };
