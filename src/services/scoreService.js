function classificarEmpresa(empresa, cfg = {}) {
  const situacao = (empresa.situacao || '').toUpperCase();
  const ativas = ['ATIVA'];
  const naoRec = ['BAIXADA', 'INAPTA', 'SUSPENSA', 'NULA'];
  let score = 0;
  if (ativas.includes(situacao)) score += 50; else score -= 50;
  if (empresa.telefone) score += 15;
  if (empresa.email) score += 15;
  const cnae = empresa.cnae_principal_codigo || '';
  if ((cfg.cnaesInteresse || []).includes(cnae)) score += 10;
  if ((cfg.ufsEstrategicas || []).includes(empresa.uf) || (cfg.municipiosEstrategicos || []).includes(empresa.municipio)) score += 10;
  score = Math.max(0, Math.min(100, score));
  let classificacao = 'VERIFICAR MANUALMENTE';
  if (naoRec.includes(situacao)) classificacao = 'NÃO RECOMENDADO';
  else if (situacao === 'ATIVA' && empresa.razao_social) classificacao = 'APTO PARA PROSPECÇÃO';
  return { score, classificacao };
}
module.exports = { classificarEmpresa };
