async function consultarCnpjWs(cnpj) {
  const ini = Date.now();
  const res = await fetch(`https://publica.cnpj.ws/cnpj/${cnpj}`);
  const tempo = Date.now() - ini;
  if (!res.ok) throw Object.assign(new Error('Erro CNPJ.ws'), { status: res.status, tempo });
  return { data: await res.json(), status: res.status, tempo };
}
module.exports = { consultarCnpjWs };
