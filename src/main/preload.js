const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('api', {
  consultarCnpj: (cnpj, force = false) => ipcRenderer.invoke('consultar-cnpj', cnpj, force),
  obterStats: () => ipcRenderer.invoke('obter-stats'),
  listarEmpresas: () => ipcRenderer.invoke('listar-empresas'),
  salvarArquivo: (tipo, conteudo) => ipcRenderer.invoke('salvar-arquivo', tipo, conteudo),
  arquivar: (cnpj, status, observacao) => ipcRenderer.invoke('arquivar', cnpj, status, observacao)
});
