const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { initDatabase, db } = require('./database');
const { consultarCNPJ } = require('../services/cnpjService');

function createWindow() {
  const win = new BrowserWindow({ width: 1400, height: 900, webPreferences: { preload: path.join(__dirname, 'preload.js') } });
  win.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'));
}
app.whenReady().then(() => { initDatabase(); createWindow(); });
ipcMain.handle('consultar-cnpj', async (_, cnpj, force) => consultarCNPJ(cnpj, force));
ipcMain.handle('obter-stats', () => {
  const total = db.prepare('SELECT COUNT(*) c FROM empresas').get().c;
  const ativos = db.prepare("SELECT COUNT(*) c FROM empresas WHERE UPPER(situacao) LIKE '%ATIV%' ").get().c;
  const nao = db.prepare("SELECT COUNT(*) c FROM empresas WHERE classificacao_comercial='NÃO RECOMENDADO'").get().c;
  return { total, ativos, nao };
});
ipcMain.handle('listar-empresas', () => db.prepare('SELECT * FROM empresas ORDER BY data_ultima_consulta DESC').all());
ipcMain.handle('arquivar', (_, cnpj, status, observacao) => db.prepare('INSERT INTO arquivos_arquivados (cnpj,status,observacao) VALUES (?,?,?)').run(cnpj,status,observacao));
ipcMain.handle('salvar-arquivo', async (_, tipo, conteudo) => {
  const { filePath } = await dialog.showSaveDialog({ defaultPath: `relatorio.${tipo}` });
  if (!filePath) return null;
  fs.writeFileSync(filePath, conteudo);
  return filePath;
});
