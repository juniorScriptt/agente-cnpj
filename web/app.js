const form = document.querySelector("[data-form]");
const input = document.querySelector("[data-cnpj]");
const button = document.querySelector("[data-submit]");
const statusBox = document.querySelector("[data-status]");
const resultBox = document.querySelector("[data-result]");
const historyList = document.querySelector("[data-history]");
const historySearch = document.querySelector("[data-history-search]");
const summaryText = document.querySelector("[data-summary]");
const copySummaryButton = document.querySelector("[data-copy-summary]");
const whatsappButton = document.querySelector("[data-whatsapp]");
const exportCsvButton = document.querySelector("[data-export-csv]");
const exportPdfButton = document.querySelector("[data-export-pdf]");
const printReportButton = document.querySelector("[data-print-report]");
const newButtons = document.querySelectorAll("[data-new]");
const clearHistoryButton = document.querySelector("[data-clear-history]");
const loadClientsButton = document.querySelector("[data-load-clients]");
const gestSearch = document.querySelector("[data-gest-search]");
const gestCode = document.querySelector("[data-gest-code]");
const gestCnpj = document.querySelector("[data-gest-cnpj]");
const gestStart = document.querySelector("[data-gest-start]");
const gestEnd = document.querySelector("[data-gest-end]");
const gestOutsideManaus = document.querySelector("[data-gest-outside-manaus]");
const clientsStatus = document.querySelector("[data-clients-status]");
const clientsBox = document.querySelector("[data-clients]");
const trafficPanel = document.querySelector("[data-traffic-panel]");
const trafficLight = document.querySelector("[data-traffic-light]");
const trafficTitle = document.querySelector("[data-traffic-title]");
const trafficMessage = document.querySelector("[data-traffic-message]");
const recommendationScore = document.querySelector("[data-recommendation-score]");
const recommendationsBox = document.querySelector("[data-recommendations]");
const referenceForm = document.querySelector("[data-reference-form]");
const referenceCompany = document.querySelector("[data-reference-company]");
const referenceContact = document.querySelector("[data-reference-contact]");
const referencePhone = document.querySelector("[data-reference-phone]");
const referenceLimit = document.querySelector("[data-reference-limit]");
const referenceNote = document.querySelector("[data-reference-note]");
const referencesBox = document.querySelector("[data-references]");
const tabButtons = document.querySelectorAll("[data-tab]");
const tabTargets = document.querySelectorAll("[data-tab-target]");
const appViews = document.querySelectorAll("[data-view]");
const dashboardBox = document.querySelector("[data-dashboard]");
const serasaForm = document.querySelector("[data-serasa-form]");
const serasaDocument = document.querySelector("[data-serasa-document]");
const serasaUser = document.querySelector("[data-serasa-user]");
const serasaReason = document.querySelector("[data-serasa-reason]");
const serasaLegal = document.querySelector("[data-serasa-legal]");
const serasaStatus = document.querySelector("[data-serasa-status]");
const serasaBoard = document.querySelector("[data-serasa-board]");
const serasaPrint = document.querySelector("[data-serasa-print]");
const portfolioDocuments = document.querySelector("[data-portfolio-documents]");
const portfolioRun = document.querySelector("[data-portfolio-run]");
const portfolioResult = document.querySelector("[data-portfolio-result]");
const adminLoad = document.querySelector("[data-admin-load]");
const adminPanel = document.querySelector("[data-admin-panel]");
const partnerList = document.querySelector("[data-partners-list]");
const partnerForm = document.querySelector("[data-partner-form]");
const partnerName = document.querySelector("[data-partner-name]");
const partnerCpf = document.querySelector("[data-partner-cpf]");
const partnerResult = document.querySelector("[data-partners-result]");
const adminForm = document.querySelector("[data-admin-form]");
const adminUserName = document.querySelector("[data-admin-user-name]");
const adminUserEmail = document.querySelector("[data-admin-user-email]");
const adminUserRole = document.querySelector("[data-admin-user-role]");
const adminUserStatus = document.querySelector("[data-admin-user-status]");
const clearCurrentButton = document.querySelector("[data-clear-current]");
const historyTabs = document.querySelectorAll("[data-history-kind]");
const summaryPreviewBox = document.querySelector("[data-summary-preview]");
const summaryPrintButton = document.querySelector("[data-summary-print]");
const summaryWhatsappButton = document.querySelector("[data-summary-whatsapp]");
const saveConsultationButton = document.querySelector("[data-save-consultation]");
const storageForm = document.querySelector("[data-storage-form]");
const storagePath = document.querySelector("[data-storage-path]");
const storageMode = document.querySelector("[data-storage-mode]");
const storageCloud = document.querySelector("[data-storage-cloud]");

const HISTORY_KEY = "agenteCnpj.history.v2";
const CREDIT_HISTORY_KEY = "agenteCnpj.creditHistory.v1";
const CACHE_KEY = "agenteCnpj.cache.v2";
const CLIENT_OK_KEY = "agenteCnpj.clientOk.v1";
const REFERENCES_KEY = "agenteCnpj.references.v1";
const ADMIN_USERS_KEY = "agenteCnpj.adminUsers.v1";
const ADMIN_SETTINGS_KEY = "agenteCnpj.adminSettings.v1";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const MAX_HISTORY = 30;

let history = loadHistory();
let creditHistory = loadCreditHistory();
let cache = loadCache();
let clientOk = loadClientOk();
let references = loadReferences();
let adminUsers = loadAdminUsers();
let adminSettings = loadAdminSettings();
let lastPayload = null;
let lastCreditAnalysis = null;
let lastInternalHistory = null;
let lastGestClients = [];
let gestSort = { key: "nome", direction: "asc" };
let historyKind = "cnpj";

input.addEventListener("input", () => {
  input.value = maskCnpj(input.value);
});

tabButtons.forEach((tabButton) => {
  tabButton.addEventListener("click", () => {
    setActiveView(tabButton.dataset.tab);
  });
});

tabTargets.forEach((targetButton) => {
  targetButton.addEventListener("click", () => {
    setActiveView(targetButton.dataset.tabTarget);
  });
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  await consultar(input.value.trim());
});

historySearch.addEventListener("input", () => {
  renderHistory(historySearch.value);
});

historyList.addEventListener("click", (event) => {
  const creditButton = event.target.closest("[data-history-credit]");
  if (creditButton) {
    const item = findCreditHistory(creditButton.dataset.historyCredit);
    if (!item) {
      showStatus("Análise de crédito salva não encontrada.", "error");
      return;
    }
    lastCreditAnalysis = item.data;
    serasaDocument.value = formatDocument(item.document);
    renderSerasaResult(item.data, item.mock);
    serasaPrint.disabled = false;
    renderDashboard();
    renderSummaryPreview();
    setActiveView("credito-serasa");
    return;
  }

  const buttonElement = event.target.closest("[data-history-cnpj]");
  if (!buttonElement) {
    return;
  }

  const payload = findStoredPayload(buttonElement.dataset.historyCnpj);
  if (!payload) {
    showStatus("Consulta salva nao encontrada.", "error");
    return;
  }

  input.value = payload.cnpj_formatado || formatCnpj(payload.dados?.cnpj || "");
  setActiveView("resultado");
  showPayload(payload, "Resultado carregado do historico local.");
});

copySummaryButton.addEventListener("click", async () => {
  if (!lastPayload) {
    return;
  }

  await navigator.clipboard.writeText(buildSummary(lastPayload));
  showStatus("Resumo copiado.", "success");
});

exportCsvButton.addEventListener("click", () => {
  if (!lastPayload) {
    return;
  }

  downloadFile(
    `cnpj-${onlyDigits(lastPayload.cnpj_formatado)}.csv`,
    buildCsv(lastPayload),
    "text/csv;charset=utf-8",
  );
});

exportPdfButton.addEventListener("click", () => {
  if (!lastPayload) {
    return;
  }

  openPrintableReport(lastPayload);
});

printReportButton.addEventListener("click", () => {
  if (!lastPayload) {
    return;
  }

  openPrintableReport(lastPayload);
});

newButtons.forEach((newButton) => {
  newButton.addEventListener("click", () => {
    input.value = "";
    lastPayload = null;
    resultBox.innerHTML = emptyResult();
    summaryText.value = "";
    updateWhatsappLink("");
    renderSummaryPreview();
    renderRecommendations(null);
    renderReferences("");
    renderSerasaEmpty();
    setTrafficState("idle", "Pronto para consultar", "Informe um CNPJ ou selecione um cliente do GEST para iniciar a análise.");
    setExportEnabled(false);
    showStatus("Pronto para consultar.", "idle");
    renderDashboard();
    setActiveView("consulta");
    input.focus();
  });
});

referenceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!lastPayload) {
    showStatus("Consulte um CNPJ antes de adicionar referencias.", "error");
    return;
  }

  const cnpj = onlyDigits(lastPayload.cnpj_formatado || lastPayload.dados?.cnpj || "");
  const reference = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    company: referenceCompany.value.trim(),
    contact: referenceContact.value.trim(),
    phone: referencePhone.value.trim(),
    limit: formatCurrencyInput(referenceLimit.value),
    note: referenceNote.value.trim(),
    createdAt: new Date().toISOString(),
  };

  if (!reference.company && !reference.contact && !reference.phone) {
    showStatus("Informe pelo menos empresa, contato ou telefone da referencia.", "error");
    return;
  }

  references[cnpj] = [reference, ...(references[cnpj] || [])].slice(0, 20);
  saveReferences();
  referenceForm.reset();
  renderReferences(cnpj);
  renderRecommendations(lastPayload);
  summaryText.value = buildSummary(lastPayload);
  updateWhatsappLink(summaryText.value);
  showStatus("Referencia comercial adicionada.", "success");
});

referencesBox.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-reference]");
  if (!removeButton || !lastPayload) {
    return;
  }

  const cnpj = onlyDigits(lastPayload.cnpj_formatado || lastPayload.dados?.cnpj || "");
  references[cnpj] = (references[cnpj] || []).filter((item) => item.id !== removeButton.dataset.removeReference);
  saveReferences();
  renderReferences(cnpj);
  renderRecommendations(lastPayload);
  summaryText.value = buildSummary(lastPayload);
  updateWhatsappLink(summaryText.value);
});

clearHistoryButton.addEventListener("click", () => {
  if (!confirm("Limpar historico e cache local deste app?")) {
    return;
  }

  history = [];
  creditHistory = [];
  cache = {};
  saveHistory();
  saveCreditHistory();
  saveCache();
  renderHistory(historySearch.value);
  renderDashboard();
  showStatus("Historico local limpo.", "success");
});

loadClientsButton.addEventListener("click", () => {
  loadGestClients();
});

[gestSearch, gestCode, gestCnpj, gestStart, gestEnd].forEach((field) => {
  field.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      loadGestClients();
    }
  });
});

gestOutsideManaus.addEventListener("change", () => {
  renderGestClients(lastGestClients);
});

gestCnpj.addEventListener("input", () => {
  gestCnpj.value = maskCnpj(gestCnpj.value);
});

referenceLimit.addEventListener("blur", () => {
  referenceLimit.value = formatCurrencyInput(referenceLimit.value);
});

serasaForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await runSerasaAnalysis(serasaDocument.value);
});

serasaPrint.addEventListener("click", () => {
  if (lastCreditAnalysis) {
    openCreditReport(lastCreditAnalysis);
  }
});

portfolioRun.addEventListener("click", () => {
  runPortfolioAnalysis();
});

adminLoad.addEventListener("click", () => {
  loadAdminPanel();
});

partnerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await runPartnerCpfAnalysis();
});

partnerList.addEventListener("click", (event) => {
  const fillButton = event.target.closest("[data-fill-partner]");
  if (!fillButton) {
    return;
  }
  partnerName.value = fillButton.dataset.fillPartner;
  setActiveView("credito-serasa");
  partnerCpf.focus();
});

partnerCpf.addEventListener("input", () => {
  partnerCpf.value = formatDocument(partnerCpf.value);
});

adminForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addAdminUser();
});

clearCurrentButton.addEventListener("click", () => {
  clearCurrentAnalysis();
});

historyTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    historyKind = tab.dataset.historyKind || "cnpj";
    historyTabs.forEach((item) => item.classList.toggle("is-active", item === tab));
    renderHistory(historySearch.value);
  });
});

summaryPrintButton.addEventListener("click", () => {
  if (lastPayload) {
    openPrintableReport(lastPayload);
  } else if (lastCreditAnalysis) {
    openCreditReport(lastCreditAnalysis);
  }
});

saveConsultationButton.addEventListener("click", () => {
  saveCurrentConsultation();
});

storageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  adminSettings = {
    storagePath: storagePath.value.trim(),
    storageMode: storageMode.value,
    storageCloud: storageCloud.value,
    updatedAt: new Date().toISOString(),
  };
  saveAdminSettings();
  loadAdminPanel();
  showStatus("Configuração de armazenamento salva.", "success");
});

clientsBox.addEventListener("click", async (event) => {
  const consultButton = event.target.closest("[data-consult-client]");
  const sintegraButton = event.target.closest("[data-sintegra-client]");
  const okButton = event.target.closest("[data-ok-client]");
  const sortButton = event.target.closest("[data-sort-clients]");

  if (sortButton) {
    const key = sortButton.dataset.sortClients;
    gestSort = {
      key,
      direction: gestSort.key === key && gestSort.direction === "asc" ? "desc" : "asc",
    };
    renderGestClients(lastGestClients);
    return;
  }

  if (consultButton) {
    input.value = consultButton.dataset.consultClient;
    await consultar(input.value);
    return;
  }

  if (sintegraButton) {
    const cnpj = sintegraButton.dataset.cnpj;
    const uf = sintegraButton.dataset.uf;
    await navigator.clipboard.writeText(cnpj);
    window.open(`http://www.sintegra.gov.br/`, "_blank", "noopener");
    showStatus(`CNPJ copiado para consulta no Sintegra ${uf || ""}.`, "success");
    return;
  }

  if (okButton) {
    const cnpj = onlyDigits(okButton.dataset.okClient);
    clientOk[cnpj] = {
      checkedAt: new Date().toISOString(),
      status: "ok_usuario",
    };
    saveClientOk();
    okButton.textContent = "OK usuario";
    okButton.disabled = true;
    okButton.closest("tr")?.classList.add("user-ok-row");
    showStatus("Cliente marcado como OK pelo usuario.", "success");
  }
});

function setActiveView(viewName) {
  const target = viewName || "dashboard";
  appViews.forEach((view) => {
    view.classList.toggle("is-active", view.dataset.view === target);
  });
  tabButtons.forEach((tabButton) => {
    tabButton.classList.toggle("is-active", tabButton.dataset.tab === target);
  });
  if (target === "dashboard") {
    renderDashboard();
  }
  if (target === "resumo") {
    renderSummaryPreview();
  }
  if (target === "admin") {
    loadAdminPanel();
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function consultar(cnpj) {
  if (!cnpj) {
    showStatus("Digite um CNPJ para consultar.", "error");
    return;
  }

  const digits = onlyDigits(cnpj);
  const cachedPayload = getCachedPayload(digits);
  if (cachedPayload) {
    setTrafficState("green", "Consulta localizada no cache", "Dados recentes encontrados localmente. Revise recomendações e referências.");
    scrollToPanel(trafficPanel);
    showPayload(cachedPayload, "Resultado carregado do cache local.");
    addHistory(cachedPayload);
    return;
  }

  setLoading(true);
  setTrafficState("yellow", "Consulta em andamento", "Validando CNPJ e consultando fontes públicas. Aguarde a conclusão.");
  scrollToPanel(trafficPanel);
  showStatus("Consultando fontes publicas...", "loading");
  resultBox.innerHTML = loadingResult();
  summaryText.value = "";
  updateWhatsappLink("");
  setExportEnabled(false);

  try {
    const response = await fetch(`/api/cnpj?cnpj=${encodeURIComponent(cnpj)}`);
    const payload = await response.json();

    if (!response.ok || !payload.ok) {
      showStatus(formatError(payload), "error");
      resultBox.innerHTML = errorResult(formatError(payload));
      setTrafficState("red", "Consulta com alerta", formatError(payload));
      return;
    }

    showPayload(payload, payload.fonte ? `Consulta concluida via ${payload.fonte}.` : "Consulta concluida.");
    cachePayload(payload);
    addHistory(payload);
  } catch (error) {
    const message = "Falha de conexao com o app local.";
    showStatus(message, "error");
    resultBox.innerHTML = errorResult(message);
    setTrafficState("red", "Falha na consulta", message);
  } finally {
    setLoading(false);
  }
}

async function loadGestClients() {
  loadClientsButton.disabled = true;
  clientsStatus.textContent = "Carregando clientes do banco GEST...";
  clientsBox.innerHTML = "";

  try {
    const params = new URLSearchParams({
      limit: "80",
      q: gestSearch.value.trim(),
      codigo: gestCode.value.trim(),
      cnpj: gestCnpj.value.trim(),
      data_inicio: gestStart.value,
      data_fim: gestEnd.value,
    });
    const response = await fetch(`/api/gest/clientes?${params.toString()}`);
    const payload = await response.json();

    if (!response.ok || !payload.ok) {
      clientsStatus.textContent = payload.erro || "Nao foi possivel carregar os clientes.";
      return;
    }

    lastGestClients = payload.clientes || [];
    renderGestClients(lastGestClients);
  } catch {
    clientsStatus.textContent = "Falha ao conversar com o app local.";
  } finally {
    loadClientsButton.disabled = false;
  }
}

function renderGestClients(clientes) {
  const visibleClients = sortGestClients(filterGestClients(clientes));
  clientsStatus.textContent = `${visibleClients.length} de ${clientes.length} cliente(s) exibido(s).`;

  if (!visibleClients.length) {
    clientsBox.innerHTML = `<div class="empty-row">Nenhum cliente encontrado.</div>`;
    return;
  }

  clientsBox.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>${sortHeader("Cliente", "nome")}</th>
          <th>${sortHeader("CNPJ", "cnpj")}</th>
          <th>${sortHeader("Cidade/UF", "cidade")}</th>
          <th>${sortHeader("IE", "ie")}</th>
          <th>${sortHeader("Status", "status")}</th>
          <th>Acoes</th>
        </tr>
      </thead>
      <tbody>
        ${visibleClients.map((cliente) => `
          <tr class="${clientOk[onlyDigits(cliente.cnpj)] ? "user-ok-row" : ""}">
            <td>
              <strong>${escapeHtml(cliente.nome || "Sem nome")}</strong>
              ${cliente.fantasia ? `<small>${escapeHtml(cliente.fantasia)}</small>` : ""}
              ${cliente.data_cadastro ? `<small>Cadastro: ${escapeHtml(formatDate(cliente.data_cadastro))}</small>` : ""}
            </td>
            <td>${escapeHtml(cliente.cnpj)}</td>
            <td>${escapeHtml([cliente.cidade, cliente.uf].filter(Boolean).join(" - "))}</td>
            <td>${escapeHtml(cliente.inscricao_estadual || "-")}</td>
            <td>
              <span class="${cliente.cnpj_valido ? "valid-chip" : "invalid-chip"}">
                ${cliente.cnpj_valido ? "Valido" : "Invalido"}
              </span>
            </td>
            <td>
              <div class="row-actions">
                <button type="button" class="secondary-button" data-consult-client="${escapeHtml(cliente.cnpj)}">Consultar</button>
                <button type="button" class="secondary-button" data-sintegra-client data-cnpj="${escapeHtml(cliente.cnpj)}" data-uf="${escapeHtml(cliente.uf || "")}">Sintegra</button>
                <button type="button" class="secondary-button" data-ok-client="${escapeHtml(cliente.cnpj)}" ${clientOk[onlyDigits(cliente.cnpj)] ? "disabled" : ""}>${clientOk[onlyDigits(cliente.cnpj)] ? "OK usuario" : "Marcar OK"}</button>
              </div>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function filterGestClients(clientes) {
  if (!gestOutsideManaus.checked) {
    return clientes;
  }
  return clientes.filter((cliente) => normalizeText(cliente.cidade) !== "manaus");
}

function sortGestClients(clientes) {
  const direction = gestSort.direction === "desc" ? -1 : 1;
  return [...clientes].sort((a, b) => {
    const left = gestSortValue(a, gestSort.key);
    const right = gestSortValue(b, gestSort.key);
    return left.localeCompare(right, "pt-BR", { numeric: true, sensitivity: "base" }) * direction;
  });
}

function gestSortValue(cliente, key) {
  const values = {
    nome: cliente.nome || cliente.fantasia || "",
    cnpj: onlyDigits(cliente.cnpj),
    cidade: [cliente.cidade, cliente.uf].filter(Boolean).join(" "),
    ie: cliente.inscricao_estadual || "",
    status: cliente.cnpj_valido ? "valido" : "invalido",
  };
  return String(values[key] || "");
}

function sortHeader(label, key) {
  const active = gestSort.key === key;
  const arrow = active ? (gestSort.direction === "asc" ? "↑" : "↓") : "↕";
  return `<button type="button" class="sort-button ${active ? "is-active" : ""}" data-sort-clients="${escapeHtml(key)}">${escapeHtml(label)} <span>${arrow}</span></button>`;
}

function showPayload(payload, message) {
  lastPayload = payload;
  lastInternalHistory = null;
  renderResult(payload);
  renderRecommendations(payload);
  renderReferences(onlyDigits(payload.cnpj_formatado || payload.dados?.cnpj || ""));
  serasaDocument.value = payload.cnpj_formatado || formatCnpj(payload.dados?.cnpj || "");
  renderSerasaReady(payload);
  renderPartners(payload);
  const summary = buildSummary(payload);
  summaryText.value = summary;
  updateWhatsappLink(summary);
  renderSummaryPreview();
  setExportEnabled(true);
  setTrafficState("green", "Consulta concluída", "Dados carregados. Revise recomendações, referências e opções de compartilhamento.");
  showStatus(message, "success");
  renderDashboard();
  setActiveView("resultado");
  loadInternalHistory(payload);
}

async function loadInternalHistory(payload) {
  const cnpj = payload.cnpj_formatado || payload.dados?.cnpj || "";
  if (!cnpj) {
    return;
  }

  try {
    const response = await fetch(`/api/gest/historico?cnpj=${encodeURIComponent(cnpj)}`);
    const data = await response.json();
    if (!response.ok || !data.ok) {
      lastInternalHistory = {
        ok: false,
        cliente_cadastrado: false,
        mensagem: data.erro || "Histórico interno indisponível.",
      };
    } else {
      lastInternalHistory = data;
    }
  } catch {
    lastInternalHistory = {
      ok: false,
      cliente_cadastrado: false,
      mensagem: "Histórico interno indisponível no momento.",
    };
  }

  if (lastPayload === payload) {
    renderResult(payload);
    summaryText.value = buildSummary(payload);
    updateWhatsappLink(summaryText.value);
    renderSummaryPreview();
    renderDashboard();
  }
}

async function runSerasaAnalysis(documentValue) {
  const digits = onlyDigits(documentValue);
  if (![11, 14].includes(digits.length)) {
    renderSerasaError("Informe um CPF ou CNPJ valido para análise de crédito.");
    return;
  }

  const type = digits.length === 14 ? "cnpj" : "cpf";
  if (type === "cpf") {
    renderPartners(null);
    partnerResult.innerHTML = `
      <div class="empty-row">
        CPF individual em análise. A lista de sócios abaixo é exibida apenas quando um CNPJ está carregado no Resultado.
      </div>
    `;
  }
  serasaStatus.textContent = "Consultando";
  serasaStatus.dataset.level = "watch";
  serasaBoard.innerHTML = loadingCreditResult();
  try {
    const params = new URLSearchParams({
      usuario: serasaUser.value.trim() || "operador",
      motivo: serasaReason.value.trim() || "analise_credito",
      base_legal: serasaLegal.value.trim() || "proteção ao crédito",
      produto: "score-relatorio-credito",
    });
    const response = await fetch(`/api/credito/${type}/${digits}?${params.toString()}`);
    const payload = await response.json();
    if (!response.ok || !payload.ok) {
      renderSerasaError(payload.erro || "Dados Serasa indisponíveis no momento.");
      return;
    }
    lastCreditAnalysis = payload.data;
    addCreditHistory(payload.data, payload.mock, type === "cpf" ? "CPF analisado" : "");
    renderSerasaResult(payload.data, payload.mock);
    serasaPrint.disabled = false;
    summaryPrintButton.disabled = false;
    saveConsultationButton.disabled = false;
    renderDashboard();
    summaryText.value = lastPayload ? buildSummary(lastPayload) : summaryText.value;
    updateWhatsappLink(summaryText.value);
    renderSummaryPreview();
  } catch {
    renderSerasaError("Dados Serasa indisponíveis no momento.");
  }
}

async function runPortfolioAnalysis() {
  const documents = portfolioDocuments.value
    .split(/\n|,|;/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (!documents.length) {
    portfolioResult.innerHTML = `<strong>Nenhum documento informado</strong><span>Cole CPF/CNPJ um por linha.</span>`;
    return;
  }

  portfolioRun.disabled = true;
  portfolioResult.innerHTML = `<strong>Analisando carteira...</strong><span>Consultando backend e registrando auditoria LGPD.</span>`;
  try {
    const response = await fetch("/api/carteira/analisar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        documents,
        queried_by: serasaUser.value.trim() || "operador",
        query_reason: serasaReason.value.trim() || "analise_carteira",
        legal_basis: serasaLegal.value.trim() || "proteção ao crédito",
      }),
    });
    const payload = await response.json();
    if (!response.ok || !payload.ok) {
      portfolioResult.innerHTML = `<strong>Carteira não analisada</strong><span>${escapeHtml(payload.erro || "Falha no backend.")}</span>`;
      return;
    }
    renderPortfolioResult(payload.analysis, payload.errors || []);
  } catch {
    portfolioResult.innerHTML = `<strong>Carteira não analisada</strong><span>Falha ao conversar com o backend.</span>`;
  } finally {
    portfolioRun.disabled = false;
  }
}

async function runPartnerCpfAnalysis() {
  const cpf = onlyDigits(partnerCpf.value);
  if (cpf.length !== 11) {
    partnerResult.innerHTML = `<strong>CPF inválido</strong><span>Informe o CPF autorizado do sócio para análise.</span>`;
    return;
  }
  partnerResult.innerHTML = `<strong>Analisando sócio...</strong><span>Consulta CPF via backend com registro de finalidade e auditoria.</span>`;
  try {
    const params = new URLSearchParams({
      usuario: serasaUser.value.trim() || "operador",
      motivo: `Análise do sócio ${partnerName.value.trim() || ""}`.trim(),
      base_legal: serasaLegal.value.trim() || "proteção ao crédito",
      produto: "score-socio-cpf",
    });
    const response = await fetch(`/api/credito/cpf/${cpf}?${params.toString()}`);
    const payload = await response.json();
    if (!response.ok || !payload.ok) {
      partnerResult.innerHTML = `<strong>CPF não analisado</strong><span>${escapeHtml(payload.erro || "Dados indisponíveis.")}</span>`;
      return;
    }
    const data = payload.data;
    addCreditHistory(data, payload.mock, partnerName.value.trim() || "Sócio analisado");
    partnerResult.innerHTML = `
      <article class="partner-credit-card ${escapeHtml(data.risk_level)}">
        <strong>${escapeHtml(partnerName.value.trim() || "Sócio analisado")}</strong>
        <span>CPF: ${escapeHtml(formatDocument(data.document))}</span>
        <span>Score: ${escapeHtml(data.score_serasa)} · Risco: ${escapeHtml(data.risk_label)} · Decisão: ${escapeHtml(data.decision)}</span>
        <span>Limite referência: ${formatMoney(data.recommended_limit)}</span>
      </article>
    `;
  } catch {
    partnerResult.innerHTML = `<strong>CPF não analisado</strong><span>Falha ao conversar com o backend.</span>`;
  }
}

async function loadAdminPanel() {
  adminLoad.disabled = true;
  storagePath.value = adminSettings.storagePath || "";
  storageMode.value = adminSettings.storageMode || "local_db";
  storageCloud.value = adminSettings.storageCloud || "none";
  try {
    const response = await fetch("/api/admin/credito");
    const payload = await response.json();
    if (!response.ok || !payload.ok) {
      return;
    }
    renderAdminPanel(payload);
  } finally {
    adminLoad.disabled = false;
  }
}

function setLoading(isLoading) {
  button.disabled = isLoading;
  button.textContent = isLoading ? "Consultando" : "Consultar";
}

function clearCurrentAnalysis() {
  input.value = "";
  serasaDocument.value = "";
  lastPayload = null;
  lastCreditAnalysis = null;
  lastInternalHistory = null;
  resultBox.innerHTML = emptyResult();
  summaryText.value = "";
  renderSummaryPreview();
  updateWhatsappLink("");
  renderRecommendations(null);
  renderReferences("");
  renderSerasaEmpty();
  renderPartners(null);
  setExportEnabled(false);
  setTrafficState("idle", "Pronto para consultar", "Informe um CNPJ ou selecione um cliente do GEST para iniciar a análise.");
  showStatus("Tela atual limpa. O histórico foi preservado.", "success");
  renderDashboard();
}

function setExportEnabled(isEnabled) {
  copySummaryButton.disabled = !isEnabled;
  exportCsvButton.disabled = !isEnabled;
  exportPdfButton.disabled = !isEnabled;
  printReportButton.disabled = !isEnabled;
  summaryPrintButton.disabled = !isEnabled && !lastCreditAnalysis;
  saveConsultationButton.disabled = !isEnabled && !lastCreditAnalysis;
  whatsappButton.classList.toggle("is-disabled", !isEnabled);
  whatsappButton.setAttribute("aria-disabled", String(!isEnabled));
  summaryWhatsappButton.classList.toggle("is-disabled", !isEnabled && !lastCreditAnalysis);
  summaryWhatsappButton.setAttribute("aria-disabled", String(!isEnabled && !lastCreditAnalysis));
}

function setTrafficState(state, title, message) {
  trafficLight.dataset.trafficLight = state;
  trafficTitle.textContent = title;
  trafficMessage.textContent = message;
}

function scrollToPanel(panel) {
  if (!panel) {
    return;
  }

  panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function showStatus(message, type) {
  statusBox.textContent = message;
  statusBox.dataset.type = type;
}

function renderResult(payload) {
  const dados = payload.dados || {};
  const socios = Array.isArray(dados.qsa) ? dados.qsa : [];
  const cnaes = secondaryActivities(dados);
  const fonte = payload.fonte || dados.fonte_consulta || "";
  const cityUf = [dados.municipio, dados.uf].filter(Boolean).join(" - ");
  const endereco = [
    dados.tipo_logradouro,
    dados.logradouro,
    dados.numero,
    dados.complemento,
    dados.bairro,
    dados.municipio,
    dados.uf,
    formatCep(dados.cep),
  ].filter(Boolean).join(", ");

  resultBox.innerHTML = `
    <div class="summary">
      <div class="summary-meta">
        <span class="pill">${escapeHtml(dados.descricao_situacao_cadastral || "Sem situacao")}</span>
        ${fonte ? `<span class="source-pill">${escapeHtml(fonte)}</span>` : ""}
      </div>
      <h2>${escapeHtml(dados.razao_social || "Razao social nao informada")}</h2>
      <p>${escapeHtml(dados.nome_fantasia || "Nome fantasia nao informado")}</p>
      ${cityUf ? `<strong class="city-highlight">${escapeHtml(cityUf)}</strong>` : ""}
    </div>
    <dl class="details">
      ${row("CNPJ", payload.cnpj_formatado || formatCnpj(dados.cnpj))}
      ${row("Cidade/UF", cityUf)}
      ${row("Abertura", formatDate(dados.data_inicio_atividade))}
      ${row("CNAE principal", formatCnae(dados))}
      ${row("Porte", dados.porte)}
      ${row("Natureza juridica", dados.natureza_juridica)}
      ${row("Capital social", formatMoney(dados.capital_social))}
      ${row("Endereco", endereco)}
      ${row("Email", dados.email)}
      ${row("Telefone", [formatPhone(dados.ddd_telefone_1), formatPhone(dados.ddd_telefone_2)].filter(Boolean).join(" / "))}
    </dl>
    ${renderInternalHistoryCard(lastInternalHistory)}
    ${renderSocios(socios)}
    ${renderSecondaryActivities(cnaes)}
  `;
}

function renderInternalHistoryCard(historyData) {
  if (!historyData) {
    return `
      <section class="internal-history-card loading">
        <div>
          <span>Histórico interno GEST</span>
          <h3>Verificando cadastro do cliente</h3>
          <p>O app está conferindo se este CNPJ existe no CADCLI para buscar duplicatas, compras e pagamentos.</p>
        </div>
      </section>
    `;
  }

  if (!historyData.cliente_cadastrado) {
    return `
      <section class="internal-history-card muted-card">
        <div>
          <span>Histórico interno GEST</span>
          <h3>Cliente não cadastrado</h3>
          <p>${escapeHtml(historyData.mensagem || "Sem histórico interno para este CNPJ.")}</p>
        </div>
      </section>
    `;
  }

  const duplicatas = historyData.duplicatas || {};
  const compras = historyData.compras || {};
  const pagamentos = historyData.pagamentos || {};
  const indicadores = historyData.indicadores || {};
  const parecer = historyData.parecer || {};
  const score = Number(indicadores.score_interno || 0);
  return `
    <section class="internal-history-card ${escapeHtml(parecer.nivel || "moderado")}">
      <div class="internal-history-head">
        <div>
          <span>Histórico interno GEST</span>
          <h3>${escapeHtml(parecer.titulo || "Desempenho interno")}</h3>
          <p>${escapeHtml(parecer.opiniao || "")}</p>
        </div>
        <div class="internal-score" style="--score:${Math.max(0, Math.min(100, score))}">
          <strong>${escapeHtml(indicadores.score_interno ?? "-")}</strong>
          <small>pontuação</small>
        </div>
      </div>
      <div class="client-dash-grid">
        ${internalMetric("Nº de compras", compras.documentos_total || 0, `Última: ${formatDate(compras.ultima_compra) || "-"}`, "commercial")}
        ${internalMetric("Valor total comprado", formatMoney(compras.valor_total), `${compras.documentos_12m || 0} compra(s) nos últimos 12m`, "commercial")}
        ${internalMetric("Ticket médio", formatMoney(compras.ticket_medio), compras.ticket_medio_12m ? `12m: ${formatMoney(compras.ticket_medio_12m)}` : "Sem ticket nos últimos 12m", "commercial")}
        ${internalMetric("Compras faturadas", duplicatas.compras_faturadas || 0, formatMoney(duplicatas.valor_faturado), "finance")}
        ${internalMetric("Duplicatas abertas", duplicatas.quantidade_aberta || 0, formatMoney(duplicatas.valor_aberto), "finance")}
        ${internalMetric("Duplicatas vencidas", duplicatas.quantidade_vencida || 0, formatMoney(duplicatas.valor_vencido), "risk")}
        ${internalMetric("Atraso médio", `${indicadores.atraso_medio_dias || 0} dia(s)`, `Último pgto: ${formatDate(pagamentos.ultimo_pagamento) || "-"}`, "risk")}
        ${internalMetric("Frequência de compras", formatFrequency(compras.frequencia_compras_dias), `${compras.compras_mes_12m || 0} compra(s)/mês em 12m`, "commercial")}
        ${internalMetric("Pontualidade", `${indicadores.pontualidade_percentual || 0}%`, `${pagamentos.pagamentos_pontuais || 0} pontuais · ${pagamentos.pagamentos_atrasados || 0} atrasados`, "finance")}
      </div>
      <div class="internal-opinion">
        <strong>Ação sugerida</strong>
        <p>${escapeHtml(parecer.acao || "")}</p>
        ${(parecer.alertas || []).length ? `<ul>${parecer.alertas.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
      </div>
    </section>
  `;
}

function internalMetric(label, value, detail, tone = "") {
  return `
    <article class="${escapeHtml(tone)}">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(String(value))}</strong>
      <small>${escapeHtml(detail || "")}</small>
    </article>
  `;
}

function formatFrequency(days) {
  const value = Number(days || 0);
  if (!value) {
    return "Sem recorrência";
  }
  if (value <= 30) {
    return `A cada ${value.toFixed(0)} dia(s)`;
  }
  const months = value / 30;
  return `A cada ${months.toFixed(months >= 10 ? 0 : 1)} mês(es)`;
}

function renderRecommendations(payload) {
  if (!payload) {
    recommendationScore.textContent = "Aguardando consulta";
    recommendationsBox.innerHTML = `
      <article>
        <h3>Sem análise carregada</h3>
        <p>As recomendações serão geradas com base na situação cadastral, idade da empresa, porte, CNAE, capital social, cidade/UF, QSA e referências comerciais.</p>
      </article>
    `;
    return;
  }

  const analysis = analyzeCredit(payload);
  recommendationScore.textContent = analysis.label;
  recommendationScore.dataset.level = analysis.level;
  recommendationsBox.innerHTML = analysis.items.map((item) => `
    <article class="recommendation-card ${escapeHtml(item.level)}">
      <span>${escapeHtml(item.type)}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.text)}</p>
    </article>
  `).join("");
}

function renderDashboard() {
  const last = lastPayload?.dados || {};
  const lastName = last.razao_social || last.nome_fantasia || "Nenhuma";
  const creditLabel = lastCreditAnalysis ? lastCreditAnalysis.risk_label : "Sem análise";
  const creditLimit = lastCreditAnalysis ? formatMoney(lastCreditAnalysis.recommended_limit) : "R$ 0,00";
  const cnpjCreditCount = creditHistory.filter((item) => item.documentType === "CNPJ").length;
  const cpfCreditCount = creditHistory.filter((item) => item.documentType === "CPF").length;
  const totalSearches = history.length + creditHistory.length;
  dashboardBox.innerHTML = `
    <article>
      <span>Pesquisas totais</span>
      <strong>${totalSearches}</strong>
      <p>${history.length} CNPJ cadastral · ${cnpjCreditCount} CNPJ crédito · ${cpfCreditCount} CPF crédito.</p>
    </article>
    <article>
      <span>Última empresa</span>
      <strong>${escapeHtml(lastName)}</strong>
      <p>${escapeHtml([last.municipio, last.uf].filter(Boolean).join(" - ") || "Aguardando consulta cadastral.")}</p>
    </article>
    <article>
      <span>Risco consolidado</span>
      <strong>${escapeHtml(creditLabel)}</strong>
      <p>Limite sugerido: ${escapeHtml(creditLimit)}.</p>
    </article>
    <article class="dashboard-chart-card">
      <span>Gráfico de consultas</span>
      ${renderSearchChart(history.length, cnpjCreditCount, cpfCreditCount)}
    </article>
    <article>
      <span>Referências</span>
      <strong>${lastPayload ? (references[onlyDigits(lastPayload.cnpj_formatado || last.cnpj || "")] || []).length : 0}</strong>
      <p>Referências comerciais anexadas à ficha do cliente.</p>
    </article>
    <article>
      <span>Sócios</span>
      <strong>${Array.isArray(last.qsa) ? last.qsa.length : 0}</strong>
      <p>CPFs de sócios podem ser analisados manualmente quando autorizados.</p>
    </article>
    <article>
      <span>Admin</span>
      <strong>${adminUsers.length}</strong>
      <p>Usuários cadastrados na matriz local de acessos.</p>
    </article>
  `;
}

function renderSearchChart(cnpjPublic, cnpjCredit, cpfCredit) {
  const max = Math.max(cnpjPublic, cnpjCredit, cpfCredit, 1);
  const bars = [
    ["CNPJ", cnpjPublic, "#0b84ff"],
    ["Crédito CNPJ", cnpjCredit, "#11795f"],
    ["CPF", cpfCredit, "#f59e0b"],
  ];
  return `
    <div class="mini-chart" aria-label="Pesquisas por tipo">
      ${bars.map(([label, value, color]) => `
        <div class="mini-chart-row">
          <small>${escapeHtml(label)}</small>
          <div><span style="width:${Math.max(6, (value / max) * 100)}%; background:${color}"></span></div>
          <strong>${value}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function renderSerasaEmpty() {
  lastCreditAnalysis = null;
  serasaDocument.value = "";
  serasaPrint.disabled = true;
  serasaStatus.textContent = "Mock/Sandbox";
  serasaStatus.dataset.level = "watch";
  serasaBoard.innerHTML = `
    <article>
      <h3>Integração protegida</h3>
      <p>A Serasa é chamada somente pelo backend. Enquanto não houver credenciais reais, o app usa mock/sandbox com auditoria local.</p>
    </article>
  `;
}

function renderPartners(payload) {
  const socios = Array.isArray(payload?.dados?.qsa) ? payload.dados.qsa : [];
  if (!socios.length) {
    partnerList.innerHTML = `<strong>Nenhum QSA carregado</strong><span>Consulte um CNPJ para listar os sócios.</span>`;
    return;
  }
  partnerList.innerHTML = socios.map((socio) => `
    <article class="partner-row">
      <strong>${escapeHtml(socio.nome_socio || socio.nome || "Sócio não informado")}</strong>
      <span>${escapeHtml(socio.qualificacao_socio || socio.qualificacao || "Qualificação não informada")}</span>
      <small>CPF público: ${escapeHtml(socio.cnpj_cpf_do_socio || "mascarado")}</small>
      <button type="button" class="secondary-button" data-fill-partner="${escapeHtml(socio.nome_socio || socio.nome || "")}">Usar nome</button>
    </article>
  `).join("");
}

function renderSerasaReady(payload) {
  lastCreditAnalysis = null;
  const dados = payload.dados || {};
  serasaStatus.textContent = "Pronto";
  serasaStatus.dataset.level = "good";
  serasaBoard.innerHTML = `
    <article class="credit-hero-card">
      <span>Documento carregado</span>
      <h3>${escapeHtml(dados.razao_social || "Empresa selecionada")}</h3>
      <p>Execute a análise forte para combinar score Serasa, restrições, protestos, dívidas, situação cadastral e regras internas.</p>
    </article>
    ${premiumBlock("Score de risco completo", "Score Serasa, score final combinado e probabilidade de inadimplência.")}
    ${premiumBlock("Protestos e dívidas", "Resumo de restrições financeiras, protestos, dívidas vencidas e pendências comerciais.")}
    ${premiumBlock("Análise com IA", "Parecer comercial, limite sugerido, ações, cuidados e estratégia de liberação.")}
  `;
}

function renderSerasaResult(data, isMock) {
  serasaStatus.textContent = isMock ? "Mock/Sandbox" : "Serasa";
  serasaStatus.dataset.level = data.risk_level === "baixo" ? "good" : data.risk_level === "medio" ? "watch" : "risk";
  const isCpf = data.document_type === "CPF";
  serasaBoard.innerHTML = `
    <article class="credit-hero-card ${isMock ? "mock-warning-card" : ""}">
      <span>${escapeHtml(data.document_type || "Documento")} analisado</span>
      <h3>${escapeHtml(formatDocument(data.document))}</h3>
      <p>${isMock ? "Modo sandbox/mock: este retorno simula risco e score, mas não identifica nome real do CPF. Para validação nominal, conecte credenciais oficiais da Serasa ou outro provedor autorizado." : "Consulta retornada pelo provedor configurado no backend."}</p>
    </article>
    <article class="credit-score-card ${escapeHtml(data.risk_level)}">
      <span>Score Serasa</span>
      <strong>${escapeHtml(data.score_serasa)}</strong>
      <small>Score final combinado: ${escapeHtml(data.score_final)}</small>
    </article>
    <article class="credit-score-card ${escapeHtml(data.risk_level)}">
      <span>Risco final</span>
      <strong>${escapeHtml(data.risk_label)}</strong>
      <small>${escapeHtml(data.decision)}</small>
    </article>
    <article class="credit-score-card">
      <span>Limite sugerido</span>
      <strong>${formatMoney(data.recommended_limit)}</strong>
      <small>${escapeHtml(data.recommendation)}</small>
    </article>
    <dl class="serasa-details">
      ${row("Prob. inadimplência", `${data.probabilidade_inadimplencia}%`)}
      ${row("Restrições financeiras", data.restricoes_financeiras)}
      ${row("Protestos", data.protestos)}
      ${row("Dívidas vencidas", data.dividas_vencidas)}
      ${row("Pendências comerciais", data.pendencias_comerciais)}
      ${row("Ações judiciais", data.acoes_judiciais)}
      ${row("Situação cadastral", data.situacao_cadastral)}
      ${row("Tipo de documento", data.document_type)}
      ${row("Documento", formatDocument(data.document))}
      ${row("Provider", data.provider)}
    </dl>
    <article class="decision-card">
      <h3>Motivos da decisão</h3>
      <ul>
        ${(data.reasons || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </article>
  `;
}

function renderSerasaError(message) {
  lastCreditAnalysis = null;
  serasaStatus.textContent = "Fallback ativo";
  serasaStatus.dataset.level = "risk";
  serasaBoard.innerHTML = `
    <article class="credit-error">
      <h3>Dados Serasa indisponíveis no momento</h3>
      <p>${escapeHtml(message)} A análise atual do app permanece disponível e a falha foi registrada no backend.</p>
    </article>
  `;
}

function renderSummaryPreview() {
  if (!summaryPreviewBox) {
    return;
  }

  const hasPayload = Boolean(lastPayload);
  const hasCredit = Boolean(lastCreditAnalysis);
  if (!hasPayload && !hasCredit) {
    summaryPreviewBox.innerHTML = `
      <div class="empty-state">
        <strong>Nenhum resumo carregado</strong>
        <span>Consulte um CNPJ ou execute uma análise de crédito para visualizar a ficha em formato de impressão.</span>
      </div>
    `;
    summaryPrintButton.disabled = true;
    saveConsultationButton.disabled = true;
    summaryWhatsappButton.href = "#";
    summaryWhatsappButton.classList.add("is-disabled");
    return;
  }

  const dados = lastPayload?.dados || {};
  const cnpjDigits = onlyDigits(lastPayload?.cnpj_formatado || dados.cnpj || "");
  const refs = cnpjDigits ? references[cnpjDigits] || [] : [];
  const socios = Array.isArray(dados.qsa) ? dados.qsa : [];
  const analysis = lastPayload ? analyzeCredit(lastPayload) : null;
  const cityUf = [dados.municipio, dados.uf].filter(Boolean).join(" - ");
  const cnaes = lastPayload ? secondaryActivities(dados) : [];
  const summary = lastPayload ? buildSummary(lastPayload) : buildCreditSummary(lastCreditAnalysis);
  const approval = lastCreditAnalysis ? approvalLevel(lastCreditAnalysis) : { label: analysis?.label || "Aguardando crédito", score: 45 };
  const internal = lastInternalHistory?.cliente_cadastrado ? lastInternalHistory : null;

  summaryPreviewBox.innerHTML = `
    <article class="print-preview-card">
      <header>
        <img src="/assets/logo-scriptt.png" alt="Scriptt">
        <div>
          <span>Relatório executivo</span>
          <h3>${escapeHtml(dados.razao_social || dados.nome_fantasia || "Documento analisado")}</h3>
          <p>${escapeHtml(lastPayload?.cnpj_formatado || formatDocument(lastCreditAnalysis?.document || ""))}${cityUf ? ` · ${escapeHtml(cityUf)}` : ""}</p>
        </div>
      </header>
      <div class="preview-grid">
        ${previewCell("Situação", dados.descricao_situacao_cadastral || lastCreditAnalysis?.situacao_cadastral || "-")}
        ${previewCell("Score final", lastCreditAnalysis?.score_final || "-")}
        ${previewCell("Risco", lastCreditAnalysis?.risk_label || analysis?.label || "-")}
        ${previewCell("Limite sugerido", lastCreditAnalysis ? formatMoney(lastCreditAnalysis.recommended_limit) : "-")}
        ${previewCell("CNAE", formatCnae(dados) || "-")}
        ${previewCell("Capital social", formatMoney(dados.capital_social) || "-")}
        ${previewCell("Sócios", socios.length || "-")}
        ${previewCell("Referências", refs.length || "-")}
      </div>
      ${internal ? `
        <div class="internal-preview-card">
          <div>
            <span>Histórico interno GEST</span>
            <strong>${escapeHtml(internal.parecer?.titulo || "Desempenho interno")}</strong>
            <p>${escapeHtml(internal.parecer?.opiniao || "")}</p>
          </div>
          <div class="preview-grid compact-preview-grid">
            ${previewCell("Compras", `${internal.compras?.documentos_total || 0} · ${formatMoney(internal.compras?.valor_total)}`)}
            ${previewCell("Ticket médio", formatMoney(internal.compras?.ticket_medio))}
            ${previewCell("Compras faturadas", `${internal.duplicatas?.compras_faturadas || 0} · ${formatMoney(internal.duplicatas?.valor_faturado)}`)}
            ${previewCell("Frequência", formatFrequency(internal.compras?.frequencia_compras_dias))}
            ${previewCell("Duplicatas abertas", `${internal.duplicatas?.quantidade_aberta || 0} · ${formatMoney(internal.duplicatas?.valor_aberto)}`)}
            ${previewCell("Atraso médio", `${internal.indicadores?.atraso_medio_dias || 0} dia(s)`)}
            ${previewCell("Pontualidade", `${internal.indicadores?.pontualidade_percentual || 0}%`)}
            ${previewCell("Score interno", internal.indicadores?.score_interno ?? "-")}
          </div>
        </div>
      ` : `
        <div class="internal-preview-card muted-card">
          <span>Histórico interno GEST</span>
          <strong>Sem histórico interno</strong>
          <p>Disponível somente para CNPJs cadastrados no CADCLI.</p>
        </div>
      `}
      <div class="approval-preview">
        <div>
          <strong>Nível de aprovação</strong>
          <span>${escapeHtml(approval.label)}</span>
        </div>
        <div class="approval-meter"><span style="width:${approval.score}%"></span></div>
      </div>
      <div class="preview-columns">
        <section>
          <h4>Dados cruzados</h4>
          <ul>
            <li>${escapeHtml(lastCreditAnalysis ? `${lastCreditAnalysis.restricoes_financeiras} restrição(ões), ${lastCreditAnalysis.protestos} protesto(s), ${lastCreditAnalysis.dividas_vencidas} dívida(s)` : "Execute o crédito Serasa para cruzar restrições, protestos e dívidas.")}</li>
            <li>${escapeHtml(socios.length ? `${socios.length} sócio(s)/administrador(es) no QSA para conferência.` : "QSA não carregado ou não informado.")}</li>
            <li>${escapeHtml(cnaes.length ? `${cnaes.length} CNAE(s) secundários resumidos no relatório A4.` : "Sem CNAEs secundários relevantes.")}</li>
          </ul>
        </section>
        <section>
          <h4>Recomendações</h4>
          <ul>
            ${(analysis?.items || lastCreditAnalysis?.reasons || []).slice(0, 4).map((item) => {
              const text = typeof item === "string" ? item : `${item.title}: ${item.text}`;
              return `<li>${escapeHtml(text)}</li>`;
            }).join("") || "<li>Consulte um CNPJ para gerar recomendações.</li>"}
          </ul>
        </section>
      </div>
    </article>
  `;
  summaryPrintButton.disabled = false;
  saveConsultationButton.disabled = false;
  summaryWhatsappButton.href = `https://wa.me/?text=${encodeURIComponent(summary)}`;
  summaryWhatsappButton.classList.remove("is-disabled");
}

function previewCell(label, value) {
  return `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(String(value || "-"))}</strong></div>`;
}

function loadingCreditResult() {
  return `
    <article class="credit-hero-card">
      <span>Consultando backend</span>
      <h3>Análise forte em andamento</h3>
      <p>Registrando auditoria LGPD e calculando score combinado, risco final, limite sugerido e recomendação assistida.</p>
    </article>
  `;
}

function premiumBlock(title, text) {
  return `
    <article class="premium-block">
      <span>Premium</span>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(text)}</p>
    </article>
  `;
}

function renderPortfolioResult(analysis, errors) {
  const summary = analysis.summary || {};
  portfolioResult.innerHTML = `
    <div class="portfolio-kpis">
      ${kpi("Total analisado", summary.total_analisado || 0)}
      ${kpi("Baixo risco", summary.baixo || 0)}
      ${kpi("Médio risco", summary.medio || 0)}
      ${kpi("Alto risco", summary.alto || 0)}
      ${kpi("Crítico", summary.critico || 0)}
      ${kpi("Limite total", formatMoney(summary.limite_total_recomendado || 0))}
    </div>
    <div class="portfolio-columns">
      <article>
        <h3>Melhores clientes</h3>
        ${portfolioRanking(analysis.ranking_melhores || [])}
      </article>
      <article>
        <h3>Piores clientes</h3>
        ${portfolioRanking(analysis.ranking_piores || [])}
      </article>
    </div>
    <article class="decision-card">
      <h3>Alertas prioritários</h3>
      <ul>
        ${(summary.alertas_prioritarios || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("") || "<li>Nenhum alerta crítico na carteira.</li>"}
        ${errors.length ? `<li>${errors.length} documento(s) não analisado(s) por erro de validação ou backend.</li>` : ""}
      </ul>
    </article>
  `;
}

function renderAdminPanel(payload) {
  const stats = payload.stats || {};
  adminPanel.innerHTML = `
    <article>
      <h3>Matriz de usuários e acessos</h3>
      <table>
        <thead><tr><th>Perfil</th><th>Permissões</th></tr></thead>
        <tbody>
          ${(payload.access_matrix || []).map((rowItem) => `
            <tr>
              <td>${escapeHtml(rowItem.perfil)}</td>
              <td>${escapeHtml((rowItem.permissoes || []).join(", "))}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </article>
    <article>
      <h3>Configurações e restrições</h3>
      <dl class="serasa-details">
        ${row("Consultas", stats.credit_queries || 0)}
        ${row("Logs LGPD", stats.credit_audit_logs || 0)}
        ${row("Banco local", stats.database || "")}
        ${row("Decisão automática", payload.feature_flags?.decisao_automatica ? "Ligada" : "Desligada")}
        ${row("Modo Serasa", payload.feature_flags?.serasa_mock ? "Mock/Sandbox" : "Produção")}
        ${row("Limite carteira", payload.feature_flags?.portfolio_limit || 0)}
        ${row("Armazenamento", storageModeLabel(adminSettings.storageMode))}
        ${row("Pasta padrão", adminSettings.storagePath || "Não configurada")}
        ${row("Nuvem", storageCloudLabel(adminSettings.storageCloud))}
      </dl>
    </article>
    <article>
      <h3>Usuários cadastrados</h3>
      ${renderAdminUsers()}
    </article>
  `;
}

function renderAdminUsers() {
  if (!adminUsers.length) {
    return `<p class="muted">Nenhum usuário local cadastrado.</p>`;
  }
  return `
    <table>
      <thead><tr><th>Nome</th><th>Login</th><th>Perfil</th><th>Status</th></tr></thead>
      <tbody>
        ${adminUsers.map((user) => `
          <tr>
            <td>${escapeHtml(user.name)}</td>
            <td>${escapeHtml(user.email)}</td>
            <td>${escapeHtml(user.role)}</td>
            <td>${escapeHtml(user.status)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function addAdminUser() {
  const user = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    name: adminUserName.value.trim(),
    email: adminUserEmail.value.trim(),
    role: adminUserRole.value,
    status: adminUserStatus.value,
  };
  if (!user.name || !user.email) {
    return;
  }
  adminUsers = [user, ...adminUsers.filter((item) => item.email !== user.email)].slice(0, 50);
  saveAdminUsers();
  adminForm.reset();
  loadAdminPanel();
  renderDashboard();
}

function kpi(label, value) {
  return `<article><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></article>`;
}

function portfolioRanking(items) {
  if (!items.length) {
    return `<p class="muted">Sem dados.</p>`;
  }
  return `
    <ol class="ranking-list">
      ${items.slice(0, 6).map((item) => `
        <li>
          <strong>${escapeHtml(formatDocument(item.document || ""))}</strong>
          <span>${escapeHtml(item.risk_label || item.risk_level)} · Score ${escapeHtml(item.score_final || item.score_serasa || 0)} · ${formatMoney(item.recommended_limit || 0)}</span>
        </li>
      `).join("")}
    </ol>
  `;
}

function analyzeCredit(payload) {
  const dados = payload.dados || {};
  const cnpj = onlyDigits(payload.cnpj_formatado || dados.cnpj || "");
  const refs = references[cnpj] || [];
  const socios = Array.isArray(dados.qsa) ? dados.qsa : [];
  const ageYears = companyAgeYears(dados.data_inicio_atividade);
  const situacao = normalizeText(dados.descricao_situacao_cadastral);
  const capital = Number(dados.capital_social || 0);
  const items = [];
  let score = 0;

  if (situacao.includes("ativa")) {
    score += 25;
    items.push({
      level: "good",
      type: "Ação",
      title: "Cadastro ativo",
      text: "CNPJ ativo nas fontes públicas. Prosseguir para análise de limite, histórico interno e referências.",
    });
  } else {
    score -= 35;
    items.push({
      level: "risk",
      type: "Cuidado",
      title: "Situação cadastral exige bloqueio preventivo",
      text: "Evite liberar crédito sem conferência manual e documentação complementar.",
    });
  }

  if (ageYears >= 5) {
    score += 20;
    items.push({
      level: "good",
      type: "Estratégia",
      title: "Empresa com maturidade operacional",
      text: `Abertura há aproximadamente ${ageYears} ano(s). Pode comportar limite inicial moderado se o histórico interno estiver saudável.`,
    });
  } else if (ageYears >= 1) {
    score += 8;
    items.push({
      level: "watch",
      type: "Cuidado",
      title: "Empresa relativamente nova",
      text: "Comece com limite reduzido e reavalie após pagamentos pontuais.",
    });
  } else {
    score -= 10;
    items.push({
      level: "risk",
      type: "Cuidado",
      title: "Empresa recém-aberta ou sem data confiável",
      text: "Exija referências comerciais e pagamento antecipado/parcial na primeira compra.",
    });
  }

  if (capital >= 100000) {
    score += 10;
    items.push({
      level: "good",
      type: "Sinal",
      title: "Capital social relevante",
      text: `Capital social informado: ${formatMoney(capital)}. Use como apoio, não como garantia isolada.`,
    });
  } else {
    items.push({
      level: "watch",
      type: "Cuidado",
      title: "Capital social baixo ou ausente",
      text: "Combine limite menor com referências comerciais e histórico de compras.",
    });
  }

  if (socios.length) {
    score += 8;
    items.push({
      level: "good",
      type: "Sinal",
      title: "QSA disponível",
      text: `${socios.length} registro(s) de sócios/administradores encontrados. Conferir responsáveis em contratos e cobranças.`,
    });
  } else {
    score -= 5;
    items.push({
      level: "watch",
      type: "Cuidado",
      title: "QSA não retornado",
      text: "Solicite dados do responsável financeiro e confirme poderes de compra.",
    });
  }

  if (refs.length >= 2) {
    score += 18;
    items.push({
      level: "good",
      type: "Ação",
      title: "Referências comerciais suficientes",
      text: "Use as referências para confirmar prazo médio, pontualidade e limite praticado por outros fornecedores.",
    });
  } else {
    score -= 8;
    items.push({
      level: "watch",
      type: "Ação",
      title: "Adicionar referências comerciais",
      text: "Peça ao cliente 2 ou 3 fornecedores com telefone, limite e prazo para fortalecer a análise.",
    });
  }

  items.push({
    level: "watch",
    type: "Próximas funções",
    title: "Dados que deixam a análise mais confiável",
    text: "Integrar duplicatas em aberto, atrasos, compras dos últimos 12 meses, limite atual, Serasa/Boa Vista, protestos e Sintegra/IE.",
  });

  if (score >= 70) {
    return { level: "good", label: "Tendência favorável", items };
  }
  if (score >= 35) {
    return { level: "watch", label: "Análise moderada", items };
  }
  return { level: "risk", label: "Alto cuidado", items };
}

function renderReferences(cnpj) {
  if (!cnpj) {
    referencesBox.innerHTML = `<div class="empty-row">Consulte um CNPJ para adicionar referências comerciais à ficha.</div>`;
    return;
  }

  const items = references[cnpj] || [];
  if (!items.length) {
    referencesBox.innerHTML = `<div class="empty-row">Nenhuma referência comercial adicionada para este CNPJ.</div>`;
    return;
  }

  referencesBox.innerHTML = items.map((item) => `
    <article class="reference-card">
      <div class="reference-content">
        <strong>${escapeHtml(item.company || "Empresa não informada")}</strong>
        <dl class="reference-fields">
          ${referenceField("Contato", item.contact || "Não informado")}
          ${referenceField("Telefone", item.phone || "Não informado")}
          ${referenceField("Limite informado", item.limit || "Não informado")}
          ${referenceField("Observação", item.note || "Não informado")}
        </dl>
      </div>
      <button type="button" class="secondary-button" data-remove-reference="${escapeHtml(item.id)}">Remover</button>
    </article>
  `).join("");
}

function referenceField(label, value) {
  return `
    <div>
      <dt>${escapeHtml(label)}</dt>
      <dd>${escapeHtml(value)}</dd>
    </div>
  `;
}

function row(label, value) {
  if (value === undefined || value === null || value === "") {
    return "";
  }

  return `
    <div>
      <dt>${escapeHtml(label)}</dt>
      <dd>${escapeHtml(String(value))}</dd>
    </div>
  `;
}

function renderSocios(socios) {
  if (!socios.length) {
    return "";
  }

  return `
    <section class="detail-section">
      <div class="section-heading">
        <h3>Socios e administradores</h3>
        <span>${socios.length}</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Qualificacao</th>
              <th>Entrada</th>
            </tr>
          </thead>
          <tbody>
            ${socios.map((socio) => `
              <tr>
                <td>${escapeHtml(socio.nome_socio || socio.nome || "Nao informado")}</td>
                <td>${escapeHtml(socio.qualificacao_socio || socio.qualificacao || socio.codigo_qualificacao_socio || "Nao informado")}</td>
                <td>${escapeHtml(formatDate(socio.data_entrada_sociedade) || "-")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderSecondaryActivities(cnaes) {
  if (!cnaes.length) {
    return "";
  }

  return `
    <section class="detail-section">
      <div class="section-heading">
        <h3>CNAEs secundarios</h3>
        <span>${cnaes.length}</span>
      </div>
      <ul class="activity-list">
        ${cnaes.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </section>
  `;
}

function emptyResult() {
  return `
    <div class="empty-state">
      <strong>Nenhuma consulta carregada</strong>
      <span>Informe um CNPJ valido para ver os dados cadastrais.</span>
    </div>
  `;
}

function loadingResult() {
  return `
    <div class="empty-state">
      <strong>Consultando fontes publicas</strong>
      <span>Aguarde alguns instantes.</span>
    </div>
  `;
}

function errorResult(message) {
  return `
    <div class="empty-state error-state">
      <strong>Consulta nao concluida</strong>
      <span>${escapeHtml(message)}</span>
    </div>
  `;
}

function addHistory(payload) {
  const cnpj = onlyDigits(payload.cnpj_formatado || payload.dados?.cnpj || "");
  if (!cnpj) {
    return;
  }

  history = history.filter((item) => onlyDigits(item.cnpj) !== cnpj);
  history.unshift({
    cnpj: payload.cnpj_formatado || formatCnpj(cnpj),
    name: payload.dados?.razao_social || payload.dados?.nome_fantasia || "Empresa",
    fantasy: payload.dados?.nome_fantasia || "",
    city: [payload.dados?.municipio, payload.dados?.uf].filter(Boolean).join(" - "),
    fonte: payload.fonte || payload.dados?.fonte_consulta || "",
    consultedAt: new Date().toISOString(),
    payload,
  });
  history = history.slice(0, MAX_HISTORY);
  saveHistory();
  renderHistory(historySearch.value);
}

function addCreditHistory(credit, isMock, displayName = "") {
  const document = onlyDigits(credit.document || "");
  if (!document) {
    return;
  }
  const documentType = document.length === 11 ? "CPF" : "CNPJ";
  creditHistory = creditHistory.filter((item) => onlyDigits(item.document) !== document);
  creditHistory.unshift({
    document,
    documentType,
    name: displayName || (documentType === "CNPJ" ? lastPayload?.dados?.razao_social || "CNPJ analisado" : "CPF analisado"),
    riskLabel: credit.risk_label || "",
    score: credit.score_final || credit.score_serasa || 0,
    limit: credit.recommended_limit || 0,
    mock: Boolean(isMock),
    consultedAt: new Date().toISOString(),
    data: credit,
  });
  creditHistory = creditHistory.slice(0, MAX_HISTORY);
  saveCreditHistory();
  renderHistory(historySearch.value);
}

function renderHistory(filterValue = "") {
  const query = normalizeText(filterValue);
  if (historyKind === "cpf") {
    renderCreditHistory(query);
    return;
  }

  const creditCnpj = creditHistory.filter((item) => item.documentType === "CNPJ");
  const cadastralItems = history.map((item) => ({ ...item, kind: "cadastral" }));
  const creditItems = creditCnpj.map((item) => ({ ...item, kind: "credito" }));
  const items = [...cadastralItems, ...creditItems].filter((item) => {
    const haystack = normalizeText([
      item.cnpj || item.document,
      item.name,
      item.fantasy,
      item.city,
      item.fonte,
      item.riskLabel,
    ].join(" "));
    return !query || haystack.includes(query);
  }).sort((a, b) => new Date(b.consultedAt) - new Date(a.consultedAt));

  if (!items.length) {
    historyList.innerHTML = `<li class="muted">Nenhuma consulta salva.</li>`;
    return;
  }

  historyList.innerHTML = items.map((item) => {
    if (item.kind === "credito") {
      return creditHistoryItem(item);
    }
    return `
      <li>
        <button type="button" class="history-item" data-history-cnpj="${escapeHtml(onlyDigits(item.cnpj))}">
          <strong>${escapeHtml(item.name)}</strong>
          <span>${escapeHtml(item.cnpj)}${item.city ? ` - ${escapeHtml(item.city)}` : ""}</span>
          <small>${escapeHtml(item.fonte || "Fonte publica")} - ${escapeHtml(formatDateTime(item.consultedAt))}</small>
        </button>
      </li>
    `;
  }).join("");
}

function renderCreditHistory(query) {
  const items = creditHistory.filter((item) => {
    if (item.documentType !== "CPF") {
      return false;
    }
    const haystack = normalizeText([item.document, item.name, item.riskLabel, item.score].join(" "));
    return !query || haystack.includes(query);
  });
  if (!items.length) {
    historyList.innerHTML = `<li class="muted">Nenhum CPF analisado.</li>`;
    return;
  }
  historyList.innerHTML = items.map(creditHistoryItem).join("");
}

function creditHistoryItem(item) {
  return `
    <li>
      <button type="button" class="history-item credit-history-item" data-history-credit="${escapeHtml(onlyDigits(item.document))}">
        <strong>${escapeHtml(item.name || item.documentType)}</strong>
        <span>${escapeHtml(formatDocument(item.document))} · ${escapeHtml(item.riskLabel || "Sem risco")}</span>
        <small>Score ${escapeHtml(item.score)} · ${formatMoney(item.limit)} · ${escapeHtml(formatDateTime(item.consultedAt))}</small>
      </button>
    </li>
  `;
}

function cachePayload(payload) {
  const cnpj = onlyDigits(payload.cnpj_formatado || payload.dados?.cnpj || "");
  if (!cnpj) {
    return;
  }

  cache[cnpj] = {
    savedAt: Date.now(),
    payload,
  };
  saveCache();
}

function getCachedPayload(cnpj) {
  const entry = cache[onlyDigits(cnpj)];
  if (!entry) {
    return null;
  }

  if (Date.now() - entry.savedAt > CACHE_TTL_MS) {
    delete cache[onlyDigits(cnpj)];
    saveCache();
    return null;
  }

  return entry.payload;
}

function findStoredPayload(cnpj) {
  const digits = onlyDigits(cnpj);
  const item = history.find((historyItem) => onlyDigits(historyItem.cnpj) === digits);
  return item?.payload || getCachedPayload(digits);
}

function findCreditHistory(document) {
  const digits = onlyDigits(document);
  return creditHistory.find((item) => onlyDigits(item.document) === digits);
}

function buildCsv(payload) {
  const dados = payload.dados || {};
  const rows = [
    ["Campo", "Valor"],
    ["CNPJ", payload.cnpj_formatado || formatCnpj(dados.cnpj)],
    ["Razao social", dados.razao_social],
    ["Nome fantasia", dados.nome_fantasia],
    ["Situacao", dados.descricao_situacao_cadastral],
    ["Abertura", formatDate(dados.data_inicio_atividade)],
    ["CNAE principal", formatCnae(dados)],
    ["Porte", dados.porte],
    ["Natureza juridica", dados.natureza_juridica],
    ["Capital social", formatMoney(dados.capital_social)],
    ["Municipio", dados.municipio],
    ["UF", dados.uf],
    ["Fonte", payload.fonte || dados.fonte_consulta],
  ];

  if (Array.isArray(dados.qsa)) {
    dados.qsa.forEach((socio, index) => {
      rows.push([`Socio ${index + 1}`, socio.nome_socio || socio.nome || ""]);
      rows.push([`Qualificacao socio ${index + 1}`, socio.qualificacao_socio || socio.qualificacao || ""]);
    });
  }

  return rows
    .filter((row) => row[1] !== undefined && row[1] !== null && row[1] !== "")
    .map((row) => row.map(csvCell).join(";"))
    .join("\n");
}

function buildSummary(payload) {
  const dados = payload.dados || {};
  const socios = Array.isArray(dados.qsa) ? dados.qsa : [];
  const cnpjDigits = onlyDigits(payload.cnpj_formatado || dados.cnpj || "");
  const refs = references[cnpjDigits] || [];
  const analysis = analyzeCredit(payload);
  const cityUf = [dados.municipio, dados.uf].filter(Boolean).join(" - ");
  const endereco = [
    dados.tipo_logradouro,
    dados.logradouro,
    dados.numero,
    dados.complemento,
    dados.bairro,
    cityUf,
    formatCep(dados.cep),
  ].filter(Boolean).join(", ");
  const telefone = [formatPhone(dados.ddd_telefone_1), formatPhone(dados.ddd_telefone_2)].filter(Boolean).join(" / ");
  const linhas = [
    "Resumo da pesquisa CNPJ",
    "",
    `CNPJ: ${payload.cnpj_formatado || formatCnpj(dados.cnpj)}`,
    `Razao social: ${dados.razao_social || "Nao informado"}`,
    `Nome fantasia: ${dados.nome_fantasia || "Nao informado"}`,
    `Situacao: ${dados.descricao_situacao_cadastral || "Nao informado"}`,
    cityUf ? `Cidade/UF: ${cityUf}` : "",
    `Abertura: ${formatDate(dados.data_inicio_atividade) || "Nao informado"}`,
    `CNAE principal: ${formatCnae(dados) || "Nao informado"}`,
    dados.porte ? `Porte: ${dados.porte}` : "",
    dados.natureza_juridica ? `Natureza juridica: ${dados.natureza_juridica}` : "",
    dados.capital_social ? `Capital social: ${formatMoney(dados.capital_social)}` : "",
    endereco ? `Endereco: ${endereco}` : "",
    dados.email ? `Email: ${dados.email}` : "",
    telefone ? `Telefone: ${telefone}` : "",
    socios.length ? `Socios/QSA: ${socios.length} registro(s)` : "",
    payload.fonte || dados.fonte_consulta ? `Fonte: ${payload.fonte || dados.fonte_consulta}` : "",
    lastCreditAnalysis ? `Score Serasa: ${lastCreditAnalysis.score_serasa}` : "",
    lastCreditAnalysis ? `Risco consolidado: ${lastCreditAnalysis.risk_label}` : "",
    lastCreditAnalysis ? `Limite sugerido: ${formatMoney(lastCreditAnalysis.recommended_limit)}` : "",
    lastCreditAnalysis ? `Decisão assistida: ${lastCreditAnalysis.decision}` : "",
    "",
    ...buildInternalHistorySummaryLines(),
    "",
    `Recomendação: ${analysis.label}`,
    ...analysis.items.slice(0, 5).map((item) => `- ${item.title}: ${item.text}`),
    "",
    refs.length ? `Referências comerciais: ${refs.length}` : "Referências comerciais: não informadas",
    ...refs.slice(0, 3).map((item) => `- ${item.company || "Empresa"} | ${item.contact || "Contato"} | ${item.phone || "Telefone"} | ${item.limit || "Limite não informado"}`),
    "",
    "Desenvolvido por Scriptt",
  ];

  return linhas.filter(Boolean).join("\n");
}

function buildInternalHistorySummaryLines() {
  if (!lastInternalHistory) {
    return ["Histórico interno GEST: verificando cadastro no CADCLI"];
  }
  if (!lastInternalHistory.cliente_cadastrado) {
    return ["Histórico interno GEST: indisponível para CNPJ não cadastrado no CADCLI"];
  }
  const duplicatas = lastInternalHistory.duplicatas || {};
  const compras = lastInternalHistory.compras || {};
  const indicadores = lastInternalHistory.indicadores || {};
  const parecer = lastInternalHistory.parecer || {};
  return [
    "Histórico interno GEST:",
    `Cliente CADCLI: ${lastInternalHistory.cliente?.codigo || ""} - ${lastInternalHistory.cliente?.nome || ""}`,
    `Numero de compras: ${compras.documentos_total || 0}`,
    `Valor total comprado: ${formatMoney(compras.valor_total)}`,
    `Ticket medio: ${formatMoney(compras.ticket_medio)}`,
    `Compras faturadas: ${duplicatas.compras_faturadas || 0} (${formatMoney(duplicatas.valor_faturado)})`,
    `Duplicatas totais: ${duplicatas.quantidade_total || 0} (${formatMoney(duplicatas.valor_total)})`,
    `Duplicatas abertas: ${duplicatas.quantidade_aberta || 0} (${formatMoney(duplicatas.valor_aberto)})`,
    `Duplicatas vencidas: ${duplicatas.quantidade_vencida || 0} (${formatMoney(duplicatas.valor_vencido)})`,
    `Compras últimos 12 meses: ${compras.documentos_12m || 0} (${formatMoney(compras.valor_12m)})`,
    `Atraso medio: ${indicadores.atraso_medio_dias || 0} dia(s)`,
    `Frequencia de compras: ${formatFrequency(compras.frequencia_compras_dias)}`,
    `Pontualidade: ${indicadores.pontualidade_percentual || 0}% | Score interno: ${indicadores.score_interno ?? "-"}`,
    `Opinião: ${parecer.opiniao || ""}`,
    `Ação sugerida: ${parecer.acao || ""}`,
  ];
}

function buildCreditSummary(credit) {
  if (!credit) {
    return "";
  }
  return [
    "Resumo de análise de crédito",
    "",
    `Documento: ${formatDocument(credit.document)}`,
    `Score Serasa: ${credit.score_serasa}`,
    `Score final: ${credit.score_final}`,
    `Risco consolidado: ${credit.risk_label}`,
    `Limite sugerido: ${formatMoney(credit.recommended_limit)}`,
    `Decisão assistida: ${credit.decision}`,
    `Probabilidade de inadimplência: ${credit.probabilidade_inadimplencia}%`,
    `Restrições: ${credit.restricoes_financeiras}`,
    `Protestos: ${credit.protestos}`,
    `Dívidas vencidas: ${credit.dividas_vencidas}`,
    "",
    "Motivos:",
    ...(credit.reasons || []).map((item) => `- ${item}`),
    "",
    "Desenvolvido por Scriptt",
  ].filter(Boolean).join("\n");
}

function approvalLevel(credit) {
  if (!credit) {
    return { label: "Aguardando análise", score: 0 };
  }
  const score = Math.max(0, Math.min(100, Number(credit.score_final || credit.score_serasa || 0) / 10));
  const labels = {
    baixo: "Aprovação favorecida",
    medio: "Aprovar com revisão",
    alto: "Aprovar só com garantia",
    critico: "Negar ou bloquear",
  };
  return { label: labels[credit.risk_level] || credit.decision || "Revisar manualmente", score };
}

function updateWhatsappLink(summary) {
  if (!summary) {
    whatsappButton.href = "#";
    return;
  }

  whatsappButton.href = `https://wa.me/?text=${encodeURIComponent(summary)}`;
}

function openCreditReport(credit) {
  const dados = lastPayload?.dados || {};
  const company = dados.razao_social || dados.nome_fantasia || "Documento analisado";
  const documentLabel = formatDocument(credit.document || serasaDocument.value);
  const approval = approvalLevel(credit);
  const reportWindow = window.open("", "_blank");
  if (!reportWindow) {
    showStatus("O navegador bloqueou a janela do relatório.", "error");
    return;
  }
  reportWindow.document.write(`
    <!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8">
        <title>Análise de crédito ${escapeHtml(documentLabel)}</title>
        <style>
          @page { size: A4 portrait; margin: 8mm; }
          * { box-sizing: border-box; }
          body { color: #15202b; font-family: Arial, sans-serif; font-size: 10px; margin: 0; }
          header { align-items: center; border-bottom: 2px solid #0b84ff; display: flex; gap: 10px; padding-bottom: 8px; }
          img { background: #10253b; border-radius: 8px; height: 40px; object-fit: contain; padding: 5px; width: 92px; }
          h1 { font-size: 16px; margin: 0; }
          h2 { color: #075fb9; font-size: 11px; margin: 10px 0 6px; text-transform: uppercase; }
          p { margin: 0; }
          .kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; margin-top: 8px; }
          .card { border: 1px solid #d7e0e8; border-radius: 7px; padding: 7px; }
          .card span { color: #617181; display: block; font-size: 7px; font-weight: 800; text-transform: uppercase; }
          .card strong { display: block; font-size: 18px; margin-top: 3px; }
          dl { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; }
          dl div { border: 1px solid #d7e0e8; border-radius: 7px; padding: 6px; }
          dt { color: #617181; font-size: 7px; font-weight: 800; text-transform: uppercase; }
          dd { margin: 3px 0 0; overflow-wrap: anywhere; }
          ul { margin: 0; padding-left: 16px; }
          li { margin-bottom: 3px; }
          .bar { height: 10px; border-radius: 999px; background: #e8edf2; overflow: hidden; }
          .bar span { display: block; height: 100%; background: #11795f; width: ${Math.min(100, Math.max(0, Number(credit.score_final || 0) / 10))}%; }
          .approval { border: 1px solid #d7e0e8; border-radius: 7px; display: grid; gap: 5px; margin-top: 8px; padding: 7px; }
          footer { border-top: 1px solid #d7e0e8; color: #617181; font-size: 8px; margin-top: 10px; padding-top: 5px; }
        </style>
      </head>
      <body>
        <header>
          <img src="${location.origin}/assets/logo-scriptt.png" alt="Scriptt">
          <div>
            <h1>Resumo individual de crédito</h1>
            <p>${escapeHtml(company)} · ${escapeHtml(documentLabel)} · Desenvolvido por Scriptt</p>
          </div>
        </header>
        <section class="kpis">
          <div class="card"><span>Score Serasa</span><strong>${escapeHtml(credit.score_serasa)}</strong></div>
          <div class="card"><span>Score final</span><strong>${escapeHtml(credit.score_final)}</strong></div>
          <div class="card"><span>Risco</span><strong>${escapeHtml(credit.risk_label)}</strong></div>
          <div class="card"><span>Limite</span><strong>${formatMoney(credit.recommended_limit)}</strong></div>
        </section>
        <h2>Indicadores</h2>
        <div class="approval">
          <strong>Nível de aprovação: ${escapeHtml(approval.label)}</strong>
          <div class="bar"><span></span></div>
        </div>
        <dl>
          ${reportRow("Prob. inadimplência", `${credit.probabilidade_inadimplencia}%`)}
          ${reportRow("Restrições", credit.restricoes_financeiras)}
          ${reportRow("Protestos", credit.protestos)}
          ${reportRow("Dívidas vencidas", credit.dividas_vencidas)}
          ${reportRow("Pendências comerciais", credit.pendencias_comerciais)}
          ${reportRow("Ações judiciais", credit.acoes_judiciais)}
          ${reportRow("Situação cadastral", credit.situacao_cadastral)}
          ${reportRow("Decisão", credit.decision)}
          ${reportRow("Provider", credit.provider)}
        </dl>
        <h2>Motivos e recomendações</h2>
        <ul>${(credit.reasons || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        <div class="card"><strong>${escapeHtml(credit.decision)}</strong><p>${escapeHtml(credit.recommendation)}</p></div>
        <footer>Relatório A4 para anexar à documentação da empresa. Dados Serasa em modo ${escapeHtml(credit.environment || "sandbox")} quando sem credenciais reais.</footer>
        <script>window.print();</script>
      </body>
    </html>
  `);
  reportWindow.document.close();
}

function openPrintableReport(payload) {
  const dados = payload.dados || {};
  const socios = Array.isArray(dados.qsa) ? dados.qsa : [];
  const cnaes = secondaryActivities(dados);
  const cnpjDigits = onlyDigits(payload.cnpj_formatado || dados.cnpj || "");
  const refs = references[cnpjDigits] || [];
  const analysis = analyzeCredit(payload);
  const credit = lastCreditAnalysis;
  const approval = approvalLevel(credit);
  const internal = lastInternalHistory?.cliente_cadastrado ? lastInternalHistory : null;
  const cityUf = [dados.municipio, dados.uf].filter(Boolean).join(" - ");
  const endereco = [
    dados.tipo_logradouro,
    dados.logradouro,
    dados.numero,
    dados.complemento,
    dados.bairro,
    cityUf,
    formatCep(dados.cep),
  ].filter(Boolean).join(", ");
  const telefone = [formatPhone(dados.ddd_telefone_1), formatPhone(dados.ddd_telefone_2)].filter(Boolean).join(" / ");
  const reportWindow = window.open("", "_blank");
  if (!reportWindow) {
    showStatus("O navegador bloqueou a janela do PDF.", "error");
    return;
  }

  reportWindow.document.write(`
    <!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8">
        <title>Relatorio CNPJ ${escapeHtml(payload.cnpj_formatado || "")}</title>
        <style>
          @page { size: A4 portrait; margin: 6mm; }
          * { box-sizing: border-box; }
          html, body { height: 100%; }
          body { color: #17202a; font-family: Arial, sans-serif; font-size: 8.8px; line-height: 1.18; margin: 0; }
          header { align-items: center; border-bottom: 2px solid #0b84ff; display: flex; gap: 8px; padding-bottom: 5px; }
          img { background: #10253b; border-radius: 6px; height: 32px; object-fit: contain; padding: 4px; width: 78px; }
          h1 { font-size: 14px; margin: 0 0 1px; }
          h2 { color: #075fb9; font-size: 9.4px; margin: 6px 0 4px; text-transform: uppercase; }
          p { margin: 0; }
          dl { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3px; margin: 5px 0 0; }
          dl > div { border: 1px solid #d7dee5; border-radius: 4px; min-height: 27px; padding: 3px 4px; }
          dt { color: #52616b; font-size: 6.7px; font-weight: 700; text-transform: uppercase; }
          dd { margin: 1px 0 0; overflow-wrap: anywhere; }
          table { border-collapse: collapse; margin-top: 3px; width: 100%; }
          th, td { border: 1px solid #d7dee5; padding: 3px; text-align: left; vertical-align: top; }
          th { background: #eef6ff; font-size: 6.5px; text-transform: uppercase; }
          footer { border-top: 1px solid #d7dee5; color: #52616b; font-size: 7px; margin-top: 4px; padding-top: 3px; }
          .page { height: 285mm; overflow: hidden; width: 198mm; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
          .card { border: 1px solid #d7dee5; border-radius: 5px; margin-top: 3px; padding: 4px; }
          .card strong { display: block; font-size: 8px; margin-bottom: 1px; }
          .badge { border-radius: 999px; background: #e8f3ff; color: #075fb9; display: inline-block; font-weight: 700; padding: 3px 6px; }
          .compact-list { display: grid; gap: 2px; }
          .minor { color: #52616b; font-size: 7.2px; line-height: 1.15; }
          .section-grid { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 5px; }
          .risk-chart { border: 1px solid #d7dee5; border-radius: 5px; display: grid; gap: 3px; margin: 4px 0; padding: 4px; }
          .risk-chart strong { font-size: 8px; }
          .risk-chart .meter { background: #e8edf2; border-radius: 999px; height: 7px; overflow: hidden; }
          .risk-chart .meter span { background: linear-gradient(90deg, #dc2626, #f59e0b, #11795f); display: block; height: 100%; width: ${approval.score}%; }
          .risk-cross { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3px; }
          .internal-box { border: 1px solid #d7dee5; border-radius: 5px; margin-top: 4px; padding: 4px; }
          .internal-box strong { display: block; font-size: 8px; margin-bottom: 2px; }
          .activity-list { display: grid; grid-template-columns: 1fr 1fr; gap: 2px 4px; margin: 0; padding: 0; list-style: none; }
          .activity-list li { border: 1px solid #d7dee5; border-radius: 4px; padding: 2px 3px; }
          .avoid-break { break-inside: avoid; page-break-inside: avoid; }
        </style>
      </head>
      <body>
        <main class="page">
          <header>
            <img src="${location.origin}/assets/logo-scriptt.png" alt="Scriptt">
            <div>
              <h1>Relatório executivo de CNPJ e crédito</h1>
              <p>Desenvolvido por Scriptt · ${escapeHtml(new Date().toLocaleDateString("pt-BR"))}</p>
            </div>
          </header>
          <h2>Identificação cadastral</h2>
          <dl>
            ${reportRow("CNPJ", payload.cnpj_formatado || formatCnpj(dados.cnpj))}
            ${reportRow("Razão social", dados.razao_social)}
            ${reportRow("Nome fantasia", dados.nome_fantasia)}
            ${reportRow("Situação", dados.descricao_situacao_cadastral)}
            ${reportRow("Abertura", formatDate(dados.data_inicio_atividade))}
            ${reportRow("Cidade/UF", cityUf)}
            ${reportRow("CNAE principal", formatCnae(dados))}
            ${reportRow("Porte", dados.porte)}
            ${reportRow("Natureza jurídica", dados.natureza_juridica)}
            ${reportRow("Capital social", formatMoney(dados.capital_social))}
            ${reportRow("Endereço", endereco)}
            ${reportRow("Telefone", telefone)}
            ${reportRow("Email", dados.email)}
            ${reportRow("Fonte", payload.fonte || dados.fonte_consulta)}
          </dl>
          <div class="section-grid">
            <section class="avoid-break">
              ${socios.length ? `
                <h2>Sócios e administradores (${socios.length})</h2>
                <table>
                  <thead><tr><th>Nome</th><th>Qualificação</th><th>Entrada</th></tr></thead>
                  <tbody>
                    ${socios.slice(0, 4).map((socio) => `
                      <tr>
                        <td>${escapeHtml(socio.nome_socio || socio.nome || "")}</td>
                        <td>${escapeHtml(socio.qualificacao_socio || socio.qualificacao || "")}</td>
                        <td>${escapeHtml(formatDate(socio.data_entrada_sociedade) || "-")}</td>
                      </tr>
                    `).join("")}
                  </tbody>
                </table>
              ` : ""}
            </section>
            <section class="avoid-break">
              <h2>Recomendações <span class="badge">${escapeHtml(analysis.label)}</span></h2>
              <div class="compact-list">
                ${analysis.items.slice(0, 4).map((item) => `
                  <div class="card">
                    <strong>${escapeHtml(item.title)}</strong>
                    <p>${escapeHtml(item.text)}</p>
                  </div>
                `).join("")}
              </div>
            </section>
          </div>
          ${credit ? `
            <h2>Análise Serasa e risco consolidado</h2>
            <div class="risk-chart">
              <strong>${escapeHtml(approval.label)}</strong>
              <div class="meter"><span></span></div>
              <p class="minor">Cruzamento: score, restrições, protestos, dívidas, cadastro, QSA, CNAE, capital social e referências comerciais.</p>
            </div>
            <dl>
              ${reportRow("Score Serasa", credit.score_serasa)}
              ${reportRow("Score final", credit.score_final)}
              ${reportRow("Risco", credit.risk_label)}
              ${reportRow("Decisão assistida", credit.decision)}
              ${reportRow("Limite sugerido", formatMoney(credit.recommended_limit))}
              ${reportRow("Prob. inadimplência", `${credit.probabilidade_inadimplencia}%`)}
              ${reportRow("Restrições", credit.restricoes_financeiras)}
              ${reportRow("Protestos", credit.protestos)}
            </dl>
          ` : ""}
          <h2>Histórico interno GEST</h2>
          ${internal ? `
            <div class="internal-box">
              <strong>${escapeHtml(internal.parecer?.titulo || "Desempenho interno")}</strong>
              <p>${escapeHtml(internal.parecer?.opiniao || "")}</p>
              <dl>
                ${reportRow("Nº compras", internal.compras?.documentos_total || 0)}
                ${reportRow("Valor total", formatMoney(internal.compras?.valor_total))}
                ${reportRow("Ticket médio", formatMoney(internal.compras?.ticket_medio))}
                ${reportRow("Compras faturadas", `${internal.duplicatas?.compras_faturadas || 0} · ${formatMoney(internal.duplicatas?.valor_faturado)}`)}
                ${reportRow("Duplicatas totais", `${internal.duplicatas?.quantidade_total || 0} · ${formatMoney(internal.duplicatas?.valor_total)}`)}
                ${reportRow("Abertas", `${internal.duplicatas?.quantidade_aberta || 0} · ${formatMoney(internal.duplicatas?.valor_aberto)}`)}
                ${reportRow("Vencidas", `${internal.duplicatas?.quantidade_vencida || 0} · ${formatMoney(internal.duplicatas?.valor_vencido)}`)}
                ${reportRow("Compras 12m", `${internal.compras?.documentos_12m || 0} · ${formatMoney(internal.compras?.valor_12m)}`)}
                ${reportRow("Frequência", formatFrequency(internal.compras?.frequencia_compras_dias))}
                ${reportRow("Atraso médio", `${internal.indicadores?.atraso_medio_dias || 0} dia(s)`)}
                ${reportRow("Pontualidade", `${internal.indicadores?.pontualidade_percentual || 0}%`)}
                ${reportRow("Score interno", internal.indicadores?.score_interno ?? "-")}
              </dl>
            </div>
          ` : `<p class="minor">Disponível somente para clientes cadastrados no CADCLI.</p>`}
          <h2>CNAEs secundários (${cnaes.length})</h2>
          ${cnaes.length ? reportActivityList(cnaes) : "<p class=\"minor\">Nenhum CNAE secundário informado.</p>"}
          <h2>Referências comerciais</h2>
          ${refs.length ? refs.slice(0, 3).map((item) => `
            <div class="card minor">
              <strong>${escapeHtml(item.company || "Empresa não informada")}</strong>
              <p>${escapeHtml([
                item.contact ? `Contato: ${item.contact}` : "",
                item.phone ? `Telefone: ${item.phone}` : "",
                item.limit ? `Limite: ${item.limit}` : "",
                item.note ? `Observação: ${item.note}` : "",
              ].filter(Boolean).join(" | "))}</p>
            </div>
          `).join("") : "<p class=\"minor\">Nenhuma referência comercial informada.</p>"}
          <footer>Relatório em uma folha A4. Dados gratuitos/públicos: Receita/BrasilAPI, Minha Receita, GEST e referências manuais. Listas longas são resumidas para impressão.</footer>
        </main>
        <script>window.print();</script>
      </body>
    </html>
  `);
  reportWindow.document.close();
}

function reportRow(label, value) {
  if (value === undefined || value === null || value === "") {
    return "";
  }
  return `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(String(value))}</dd></div>`;
}

function reportActivityList(items) {
  const visibleLimit = items.length > 30 ? 24 : 30;
  const visibleItems = items.slice(0, visibleLimit);
  const remaining = Math.max(0, items.length - visibleItems.length);
  return `
    <ul class="activity-list minor">
      ${visibleItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      ${remaining ? `<li><strong>+${remaining} CNAE(s)</strong> resumidos para manter o relatório em uma folha A4.</li>` : ""}
    </ul>
  `;
}

function downloadFile(filename, content, type) {
  const blob = new Blob([type.startsWith("text/csv") ? "\ufeff" + content : content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

async function saveCurrentConsultation() {
  if (!lastPayload && !lastCreditAnalysis) {
    showStatus("Nenhuma consulta para salvar.", "error");
    return;
  }
  const dados = lastPayload?.dados || {};
  const documentDigits = onlyDigits(lastPayload?.cnpj_formatado || dados.cnpj || lastCreditAnalysis?.document || "");
  const defaultName = safeFileName(dados.razao_social || dados.nome_fantasia || documentDigits || "consulta");
  const content = {
    saved_at: new Date().toISOString(),
    storage: adminSettings,
    cnpj_payload: lastPayload,
    credit_analysis: lastCreditAnalysis,
    internal_history: lastInternalHistory,
    summary: lastPayload ? buildSummary(lastPayload) : buildCreditSummary(lastCreditAnalysis),
  };

  try {
    const response = await fetch("/api/consultas/salvar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        folder: adminSettings.storagePath || "",
        mode: adminSettings.storageMode || "local_db",
        cloud: adminSettings.storageCloud || "none",
        filename: `${defaultName}.json`,
        content,
      }),
    });
    const payload = await response.json();
    if (!response.ok || !payload.ok) {
      throw new Error(payload.erro || "Falha ao salvar.");
    }
    showStatus(`Consulta salva em ${payload.path || "banco local"}.`, "success");
  } catch (error) {
    downloadFile(`${defaultName}.json`, JSON.stringify(content, null, 2), "application/json;charset=utf-8");
    showStatus("Não consegui salvar no backend; gerei o arquivo JSON para download.", "error");
  }
}

function safeFileName(value) {
  return normalizeText(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90) || "consulta";
}

function loadHistory() {
  try {
    const parsed = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveHistory() {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function loadCreditHistory() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CREDIT_HISTORY_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCreditHistory() {
  localStorage.setItem(CREDIT_HISTORY_KEY, JSON.stringify(creditHistory));
}

function loadCache() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveCache() {
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
}

function loadClientOk() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CLIENT_OK_KEY) || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveClientOk() {
  localStorage.setItem(CLIENT_OK_KEY, JSON.stringify(clientOk));
}

function loadReferences() {
  try {
    const parsed = JSON.parse(localStorage.getItem(REFERENCES_KEY) || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveReferences() {
  localStorage.setItem(REFERENCES_KEY, JSON.stringify(references));
}

function loadAdminUsers() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ADMIN_USERS_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveAdminUsers() {
  localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(adminUsers));
}

function loadAdminSettings() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ADMIN_SETTINGS_KEY) || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveAdminSettings() {
  localStorage.setItem(ADMIN_SETTINGS_KEY, JSON.stringify(adminSettings));
}

function storageModeLabel(value) {
  const labels = {
    local_db: "Banco local da máquina",
    folder: "Pasta local",
    cloud: "Nuvem",
  };
  return labels[value] || "Banco local da máquina";
}

function storageCloudLabel(value) {
  const labels = {
    none: "Não usar",
    onedrive: "OneDrive",
    google_drive: "Google Drive",
    sharepoint: "SharePoint",
    s3: "S3 compatível",
  };
  return labels[value] || "Não usar";
}

function formatError(payload) {
  const message = payload?.erro || "Nao foi possivel consultar este CNPJ.";

  if (message.includes("HTTP 404")) {
    return "CNPJ valido, mas nao encontrado nas fontes publicas.";
  }

  if (message.includes("tempo limite") || message.includes("timed out")) {
    return "As fontes publicas demoraram para responder. Tente novamente.";
  }

  if (message.includes("falha de conexao")) {
    return "Nao foi possivel conectar as fontes publicas.";
  }

  return message;
}

function secondaryActivities(dados) {
  const raw = dados.cnaes_secundarios || dados.cnae_fiscal_secundaria || [];
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.map((item) => {
    if (typeof item === "string") {
      return item;
    }
    return [item.codigo, item.descricao].filter(Boolean).join(" - ");
  }).filter(Boolean);
}

function formatCnae(dados) {
  return [dados.cnae_fiscal, dados.cnae_fiscal_descricao].filter(Boolean).join(" - ");
}

function maskCnpj(value) {
  const digits = onlyDigits(value).slice(0, 14);
  return formatCnpj(digits);
}

function formatCnpj(value) {
  const digits = onlyDigits(value).slice(0, 14);
  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

function formatDocument(value) {
  const digits = onlyDigits(value);
  if (digits.length === 14) {
    return formatCnpj(digits);
  }
  if (digits.length === 11) {
    return digits
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");
  }
  return value || "";
}

function onlyDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

function formatMoney(value) {
  if (value === undefined || value === null || value === "") {
    return "";
  }

  const number = Number(value);
  if (!Number.isFinite(number)) {
    return String(value);
  }

  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatCurrencyInput(value) {
  const raw = String(value || "").trim();
  if (!raw) {
    return "";
  }

  const cleaned = raw.replace(/[R$\s]/g, "");
  const normalized = cleaned.includes(",")
    ? cleaned.replace(/\./g, "").replace(",", ".")
    : cleaned.replace(/,/g, "");
  const number = Number(normalized);
  if (!Number.isFinite(number)) {
    return "";
  }

  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

function formatPhone(value) {
  const digits = onlyDigits(value);
  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  return value || "";
}

function formatCep(value) {
  const digits = onlyDigits(value);
  if (digits.length !== 8) {
    return value || "";
  }
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("pt-BR");
}

function formatDateTime(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function companyAgeYears(value) {
  if (!value) {
    return 0;
  }

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return 0;
  }

  const now = new Date();
  let years = now.getFullYear() - date.getFullYear();
  const monthDiff = now.getMonth() - date.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < date.getDate())) {
    years -= 1;
  }
  return Math.max(0, years);
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function csvCell(value) {
  return `"${String(value || "").replaceAll('"', '""')}"`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

resultBox.innerHTML = emptyResult();
renderSerasaEmpty();
renderHistory();
renderDashboard();
setActiveView("dashboard");
