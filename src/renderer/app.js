const content = document.getElementById('content');
const title = document.getElementById('title');
const api = window.api || {
  consultarCnpj: async (cnpj, force = false) => request('/api/cnpj/consultar', {
    method: 'POST',
    body: JSON.stringify({ cnpj, force })
  }),
  obterStats: () => request('/api/stats'),
  listarEmpresas: () => request('/api/empresas'),
  arquivar: (cnpj, status, observacao) => request('/api/arquivos/arquivar', {
    method: 'POST',
    body: JSON.stringify({ cnpj, status, observacao })
  }),
  salvarArquivo: async (_, conteudo) => {
    const response = await fetch('/api/exportar/html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conteudo })
    });
    if (!response.ok) throw new Error('Falha ao gerar arquivo');
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'relatorio-cnpj-360.html';
    link.click();
    URL.revokeObjectURL(url);
    return 'download';
  }
};

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Erro na comunicação com o servidor');
  return data;
}

const pages = {
  dashboard: async () => { const s = await api.obterStats(); content.innerHTML = `<div class='cards'><div class='card'>Total ${s.total}</div><div class='card'>Ativos ${s.ativos}</div><div class='card'>Não recomendados ${s.nao}</div></div>`; },
  consulta: () => { content.innerHTML = `<input id='cnpj' placeholder='Digite o CNPJ'><button id='consultar'>Consultar</button><button id='imprimir'>Imprimir</button><button id='pdf'>Gerar PDF</button><div id='resultado'></div>`;
    document.getElementById('consultar').onclick = async () => { try{ const r = await api.consultarCnpj(document.getElementById('cnpj').value); const e=r.empresa; document.getElementById('resultado').innerHTML=`<h3>${e.razao_social||''}</h3><p>${e.cnpj} - <span class='badge ${e.classificacao_comercial==='APTO PARA PROSPECÇÃO'?'ok':'bad'}'>${e.classificacao_comercial}</span></p><p>${e.situacao} | ${e.uf}/${e.municipio}</p><button id='arquivar'>Arquivar</button>`; document.getElementById('arquivar').onclick=()=>api.arquivar(e.cnpj,'Em análise','Arquivado via tela'); }
      catch(err){ alert(err.message); } };
    document.getElementById('imprimir').onclick=()=>window.print();
    document.getElementById('pdf').onclick=()=>api.salvarArquivo('html', document.documentElement.outerHTML);
  },
  lote: async () => { const list = await api.listarEmpresas(); content.innerHTML = `<h3>Resultado de lote/exportação</h3><p>Importação CSV/TXT/XLSX disponível pelo módulo utilitário.</p><table><tr><th>CNPJ</th><th>Razão social</th><th>Situação</th><th>UF</th><th>Classificação</th></tr>${list.map(e=>`<tr><td>${e.cnpj}</td><td>${e.razao_social||''}</td><td>${e.situacao||''}</td><td>${e.uf||''}</td><td>${e.classificacao_comercial||''}</td></tr>`).join('')}</table>`; },
  inteligencia: async () => { const list=await api.listarEmpresas(); const porUf={}; list.forEach(e=>porUf[e.uf]=(porUf[e.uf]||0)+1); content.innerHTML='<h3>Ranking por UF</h3><ul>'+Object.entries(porUf).sort((a,b)=>b[1]-a[1]).map(([uf,n])=>`<li>${uf}: ${n}</li>`).join('')+'</ul>'; }
};
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{ const p=b.dataset.page; title.textContent=b.textContent; pages[p]();}); pages.dashboard();
