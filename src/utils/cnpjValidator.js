function limparCNPJ(cnpj = '') { return cnpj.replace(/\D/g, ''); }
function validarCNPJ(cnpj) {
  const v = limparCNPJ(cnpj);
  if (!/^\d{14}$/.test(v) || /^(\d)\1{13}$/.test(v)) return false;
  const calc = (base, pesos) => {
    const soma = base.split('').reduce((acc, n, i) => acc + Number(n) * pesos[i], 0);
    const mod = soma % 11;
    return mod < 2 ? 0 : 11 - mod;
  };
  const d1 = calc(v.slice(0, 12), [5,4,3,2,9,8,7,6,5,4,3,2]);
  const d2 = calc(v.slice(0, 12) + d1, [6,5,4,3,2,9,8,7,6,5,4,3,2]);
  return v.endsWith(`${d1}${d2}`);
}
module.exports = { limparCNPJ, validarCNPJ };
