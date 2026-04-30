async function consultarBrasilAPI(cnpj) {
  const ini = Date.now();
  const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
  const tempo = Date.now() - ini;
  if (!res.ok) {
    const msg = await res.text();
    throw Object.assign(new Error(msg || 'Erro BrasilAPI'), { status: res.status, tempo });
  }
  const data = await res.json();
  return { data, status: res.status, tempo };
}
module.exports = { consultarBrasilAPI };
