const form = document.querySelector("[data-form]");
const input = document.querySelector("[data-cnpj]");
const loginOverlay = document.querySelector("[data-login-overlay]");
const loginForm = document.querySelector("[data-login-form]");
const loginUser = document.querySelector("[data-login-user]");
const loginPassword = document.querySelector("[data-login-password]");
const loginRemember = document.querySelector("[data-login-remember]");
const loginStatus = document.querySelector("[data-login-status]");
const changePasswordOverlay = document.querySelector("[data-change-password-overlay]");
const changePasswordForm = document.querySelector("[data-change-password-form]");
const changePasswordNew = document.querySelector("[data-change-password-new]");
const changePasswordConfirm = document.querySelector("[data-change-password-confirm]");
const changePasswordStatus = document.querySelector("[data-change-password-status]");
const authUserChip = document.querySelector("[data-auth-user-chip]");
const authLogoutButton = document.querySelector("[data-auth-logout]");
const globalFeedback = document.querySelector("[data-global-feedback]");
const globalFeedbackTitle = document.querySelector("[data-global-feedback-title]");
const globalFeedbackMessage = document.querySelector("[data-global-feedback-message]");
const cpfForm = document.querySelector("[data-cpf-form]");
const cpfDocument = document.querySelector("[data-cpf-document]");
const cpfName = document.querySelector("[data-cpf-name]");
const cpfStatus = document.querySelector("[data-cpf-status]");
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
const gestCpf = document.querySelector("[data-gest-cpf]");
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
const dashboardStrip = document.querySelector("[data-dashboard-strip]");
const dashboardRecent = document.querySelector("[data-dashboard-recent]");
const creditWorkbench = document.querySelector("[data-credit-workbench]");
const creditWorkbenchStatus = document.querySelector("[data-credit-workbench-status]");
const serasaForm = document.querySelector("[data-serasa-form]");
const serasaDocument = document.querySelector("[data-serasa-document]");
const serasaSubjectName = document.querySelector("[data-serasa-subject-name]");
const serasaUser = document.querySelector("[data-serasa-user]");
const serasaReason = document.querySelector("[data-serasa-reason]");
const serasaLegal = document.querySelector("[data-serasa-legal]");
const serasaStatus = document.querySelector("[data-serasa-status]");
const serasaBoard = document.querySelector("[data-serasa-board]");
const serasaPrint = document.querySelector("[data-serasa-print]");
const serasaPremiumForm = document.querySelector("[data-serasa-premium-form]");
const serasaPremiumDocument = document.querySelector("[data-serasa-premium-document]");
const serasaPremiumUser = document.querySelector("[data-serasa-premium-user]");
const serasaPremiumProduct = document.querySelector("[data-serasa-premium-product]");
const serasaPremiumSubjectName = document.querySelector("[data-serasa-premium-subject-name]");
const serasaPremiumReason = document.querySelector("[data-serasa-premium-reason]");
const serasaPremiumLegal = document.querySelector("[data-serasa-premium-legal]");
const serasaPremiumPassword = document.querySelector("[data-serasa-premium-password]");
const serasaPremiumStatus = document.querySelector("[data-serasa-premium-status]");
const serasaPremiumBoard = document.querySelector("[data-serasa-premium-board]");
const serasaPremiumPrint = document.querySelector("[data-serasa-premium-print]");
const serasaPremiumReady = document.querySelector("[data-serasa-premium-ready]");
const serasaPremiumSubmit = serasaPremiumForm?.querySelector('button[type="submit"]');
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
const adminUserPassword = document.querySelector("[data-admin-user-password]");
const adminUserPasswordConfirm = document.querySelector("[data-admin-user-password-confirm]");
const adminPermissionInputs = document.querySelectorAll("[data-admin-permission]");
const adminUserFeedback = document.querySelector("[data-admin-user-feedback]");
const adminUserFeedbackTitle = document.querySelector("[data-admin-user-feedback-title]");
const adminUserFeedbackMessage = document.querySelector("[data-admin-user-feedback-message]");
const bureauForm = document.querySelector("[data-bureau-form]");
const bureauProvider = document.querySelector("[data-bureau-provider]");
const bureauEnvironment = document.querySelector("[data-bureau-environment]");
const bureauBaseUrl = document.querySelector("[data-bureau-base-url]");
const bureauClientId = document.querySelector("[data-bureau-client-id]");
const bureauClientSecret = document.querySelector("[data-bureau-client-secret]");
const bureauAuthMode = document.querySelector("[data-bureau-auth-mode]");
const bureauUsername = document.querySelector("[data-bureau-username]");
const bureauPassword = document.querySelector("[data-bureau-password]");
const bureauApiToken = document.querySelector("[data-bureau-api-token]");
const bureauSsoToken = document.querySelector("[data-bureau-sso-token]");
const bureauConsultPath = document.querySelector("[data-bureau-consult-path]");
const bureauPortalUrl = document.querySelector("[data-bureau-portal-url]");
const bureauOrigin = document.querySelector("[data-bureau-origin]");
const bureauTokenPath = document.querySelector("[data-bureau-token-path]");
const bureauProductCode = document.querySelector("[data-bureau-product-code]");
const bureauValidationPassword = document.querySelector("[data-bureau-validation-password]");
const bureauFeaturePremium = document.querySelector("[data-bureau-feature-premium]");
const bureauFeatureScc = document.querySelector("[data-bureau-feature-scc]");
const serasaWizard = document.querySelector("[data-serasa-wizard]");
const adminAdvanced = document.querySelector(".admin-advanced");
const bureauScopedFields = document.querySelectorAll("[data-auth-scope]");
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
const REMEMBER_LOGIN_KEY = "agenteCnpj.rememberedLogin.v1";
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
let lastSerasaPremiumAnalysis = null;
let lastInternalHistory = null;
let lastCreditSubjectName = "";
let lastGestClients = [];
let gestSort = { key: "nome", direction: "asc" };
let historyKind = "cnpj";
let bureauSettings = {};
let currentUser = null;

const ROLE_PERMISSIONS = {
  Admin: [
    "consultar_cnpj",
    "consultar_cpf",
    "analisar_carteira",
    "usar_serasa_premium",
    "usar_scc_check",
    "gerenciar_credenciais_serasa",
    "ver_auditoria",
  ],
  Analista: [
    "consultar_cnpj",
    "consultar_cpf",
    "analisar_carteira",
    "usar_serasa_premium",
    "usar_scc_check",
  ],
  Comercial: [
    "consultar_cnpj",
    "consultar_cpf",
  ],
  Auditoria: [
    "ver_auditoria",
  ],
};

function setCpfStatus(message, type = "idle") {
  if (!cpfStatus) return;
  cpfStatus.textContent = message;
  cpfStatus.dataset.type = type;
}

function defaultPermissionsForRole(role) {
  return [...(ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS.Analista)];
}

function setPermissionInputs(role = adminUserRole?.value || "Analista", selected = null) {
  const active = new Set(selected || defaultPermissionsForRole(role));
  adminPermissionInputs.forEach((inputElement) => {
    inputElement.checked = active.has(inputElement.value);
  });
}

function selectedPermissions() {
  return Array.from(adminPermissionInputs)
    .filter((inputElement) => inputElement.checked)
    .map((inputElement) => inputElement.value);
}

function findAdminUser(email) {
  const normalized = String(email || "").trim().toLowerCase();
  return adminUsers.find((item) => String(item.email || "").trim().toLowerCase() === normalized) || null;
}

function userHasPermission(email, permission) {
  const current = findAdminUser(email) || (currentUser && String(currentUser.email || "").toLowerCase() === String(email || "").toLowerCase() ? currentUser : null);
  if (!current) {
    return true;
  }
  return (current.permissions || defaultPermissionsForRole(current.role)).includes(permission);
}

function currentUserHas(permission) {
  if (!currentUser) {
    return false;
  }
  return (currentUser.permissions || defaultPermissionsForRole(currentUser.role)).includes(permission);
}

function getSerasaPremiumReadiness() {
  const security = bureauSettings.security || {};
  const providerName = bureauSettings.provider || "mock";
  const providerConfig = bureauSettings.providers?.[providerName] || {};
  const providerMode = bureauSettings.environment || "sandbox";
  const authMode = providerConfig.auth_mode || "oauth";
  const hasValidation = Boolean(security.has_validation_password);
  const canPremium = currentUserHas("usar_serasa_premium");
  const canScc = currentUserHas("usar_scc_check");
  const hasDocument = [11, 14].includes(onlyDigits(serasaPremiumDocument?.value || "").length);
  const hasPasswordInput = Boolean(serasaPremiumPassword?.value?.trim());
  const product = serasaPremiumProduct?.value || "SCC_CHECK";
  const needsSccPermission = product === "SCC_CHECK";
  const hasBackendRoute = providerName === "serasa"
    ? Boolean((providerConfig.base_url || "").trim()) && Boolean((providerConfig.consult_path || "").trim())
    : true;
  let authConfigured = true;
  let authSummary = "Mock habilitado para testes locais.";
  if (providerName === "serasa") {
    if (authMode === "bearer_sso") {
      authConfigured = Boolean(providerConfig.has_api_token) && Boolean(providerConfig.has_sso_token);
      authSummary = authConfigured
        ? "Token da API e Token SSO salvos."
        : "Faltam Token da API e/ou Token SSO.";
    } else if (authMode === "logon") {
      authConfigured = Boolean((providerConfig.username || "").trim()) && Boolean(providerConfig.has_password);
      authSummary = authConfigured
        ? "Usuário/logon e senha salvos."
        : "Faltam usuário/logon e/ou senha.";
    } else {
      authConfigured = Boolean((providerConfig.client_id || "").trim()) && Boolean(providerConfig.has_client_secret);
      authSummary = authConfigured
        ? "Client ID e Client Secret salvos."
        : "Faltam Client ID e/ou Client Secret.";
    }
  }
  const consumesCredits = providerName === "serasa"
    && providerMode === "production"
    && hasBackendRoute
    && authConfigured;
  const ready = hasValidation
    && canPremium
    && hasDocument
    && hasPasswordInput
    && (providerMode !== "production" || authConfigured)
    && (!needsSccPermission || canScc);
  return {
    providerName,
    providerMode,
    authMode,
    authConfigured,
    authSummary,
    hasValidation,
    canPremium,
    canScc,
    hasDocument,
    hasPasswordInput,
    hasBackendRoute,
    consumesCredits,
    ready,
  };
}

function setSerasaPremiumReadyState() {
  if (!serasaPremiumReady) return;
  const state = getSerasaPremiumReadiness();
  const configProvider = state.providerName.toUpperCase();
  const modeLabel = state.providerMode === "production" ? "Produção" : "Mock/Sandbox";
  const pendencias = [];
  if (!state.hasValidation) pendencias.push("definir a senha premium no Admin");
  if (!state.canPremium) pendencias.push("liberar acesso premium para este usuário");
  if (!state.hasDocument) pendencias.push("informar CPF/CNPJ válido");
  if (!state.hasPasswordInput) pendencias.push("digitar a senha de validação");
  if ((serasaPremiumProduct?.value || "SCC_CHECK") === "SCC_CHECK" && !state.canScc) pendencias.push("liberar SCC Check para este usuário");
  if (state.providerName === "serasa" && state.providerMode === "production" && !state.authConfigured) {
    if (state.authMode === "bearer_sso") pendencias.push("salvar Token da API e Token SSO");
    else if (state.authMode === "logon") pendencias.push("salvar Usuário/logon e Senha/logon");
    else pendencias.push("salvar Client ID e Client Secret");
  }
  const authModeLabel = state.authMode === "bearer_sso"
    ? "Bearer + Ssotoken"
    : state.authMode === "logon"
      ? "Logon + senha"
      : "OAuth / client credentials";
  serasaPremiumReady.dataset.state = state.ready ? "success" : "warning";
  serasaPremiumReady.innerHTML = `
    <strong>${state.ready ? "Pronto para validar" : "Validação pendente"}</strong>
    <span>
      Bureau: ${escapeHtml(configProvider)} · Modo: ${escapeHtml(modeLabel)} ·
      Autenticação: ${escapeHtml(authModeLabel)} ·
      Senha premium: ${state.hasValidation ? "configurada" : "não configurada"} ·
      Acesso premium: ${state.canPremium ? "ok" : "sem permissão"} ·
      SCC Check: ${state.canScc ? "ok" : "sem permissão"} ·
      Backend Serasa: ${state.hasBackendRoute ? "configurado" : "pendente"} ·
      Credenciais: ${escapeHtml(state.authSummary)} ·
      ${state.consumesCredits ? "Consulta real pode consumir crédito." : "Consulta atual não consome crédito real."}
      ${pendencias.length ? ` · Pendências: ${escapeHtml(pendencias.join(", "))}.` : ""}
    </span>
  `;
  if (serasaPremiumSubmit) {
    serasaPremiumSubmit.disabled = !state.ready;
  }
}

function getSerasaAssistantContext() {
  const provider = bureauSettings.provider || "mock";
  const environment = bureauSettings.environment || "sandbox";
  const serasa = bureauSettings.providers?.serasa || {};
  const features = bureauSettings.features || {};
  const security = bureauSettings.security || {};
  const suggestedAuthMode = (serasa.auth_mode || "").trim()
    || ((serasa.username || "").trim() && !((serasa.client_id || "").trim())
    ? "logon"
    : "oauth");
  const productionPending = [];
  if (provider !== "serasa") productionPending.push("ativar Serasa como bureau");
  if (!(serasa.base_url || "").trim()) productionPending.push("informar Base URL");
  if (!(serasa.consult_path || "").trim()) productionPending.push("informar Caminho de consulta");
  if (!(serasa.product_code || "").trim()) productionPending.push("informar Produto padrão");
  if (suggestedAuthMode === "bearer_sso") {
    if (!serasa.has_api_token) productionPending.push("colar Token da API");
    if (!serasa.has_sso_token) productionPending.push("colar Token SSO");
  } else if (suggestedAuthMode === "oauth") {
    if (!(serasa.client_id || "").trim()) productionPending.push("informar Client ID");
    if (!serasa.has_client_secret) productionPending.push("informar Client Secret");
  } else {
    if (!(serasa.username || "").trim()) productionPending.push("informar Usuário/logon");
    if (!serasa.has_password) productionPending.push("informar Senha/logon");
  }
  if (!security.has_validation_password) productionPending.push("definir senha premium");
  return {
    provider,
    environment,
    serasa,
    features,
    security,
    suggestedAuthMode,
    productionPending,
  };
}

function renderSerasaWizard() {
  if (!serasaWizard) return;
  const ctx = getSerasaAssistantContext();
  const productionReady = ctx.productionPending.length === 0;
  const knownData = [
    `Bureau ativo: ${String(ctx.provider).toUpperCase()}`,
    `Ambiente: ${ctx.environment === "production" ? "Produção" : "Sandbox"}`,
    `Autenticação sugerida: ${
      ctx.suggestedAuthMode === "logon"
        ? "Logon + senha"
        : ctx.suggestedAuthMode === "bearer_sso"
          ? "Bearer + Ssotoken"
          : "OAuth / client credentials"
    }`,
    `Usuário/logon conhecido: ${(ctx.serasa.username || "").trim() ? "sim" : "não"}`,
    `Token da API salvo: ${ctx.serasa.has_api_token ? "sim" : "não"}`,
    `Token SSO salvo: ${ctx.serasa.has_sso_token ? "sim" : "não"}`,
    `Senha premium configurada: ${ctx.security.has_validation_password ? "sim" : "não"}`,
    `SCC Check habilitado: ${ctx.features.allow_scc_check ? "sim" : "não"}`,
  ];
  serasaWizard.innerHTML = `
    <div class="assistant-card">
      <div class="assistant-header">
        <div>
          <span class="eyebrow">Assistente Serasa</span>
          <h3>Configuração guiada</h3>
          <p>Eu já li o que o sistema conhece hoje. Use os atalhos abaixo para preencher o essencial e deixe o técnico só para a parte avançada.</p>
        </div>
        <span class="status-chip ${productionReady ? "assistant-ok" : ""}">${productionReady ? "Pronto" : "Pendente"}</span>
      </div>
      <div class="assistant-columns">
        <section>
          <h4>O que já encontramos</h4>
          <ul class="assistant-list">
            ${knownData.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </section>
        <section>
          <h4>O que falta para produção</h4>
          <ul class="assistant-list">
            ${ctx.productionPending.length
              ? ctx.productionPending.map((item) => `<li>${escapeHtml(item)}</li>`).join("")
              : "<li>Campos mínimos preenchidos para produção real.</li>"}
          </ul>
        </section>
      </div>
        <div class="assistant-actions">
          <button type="button" class="secondary-button" data-serasa-assistant-action="apply-known">Preencher formulário com o que já temos</button>
          <button type="button" class="secondary-button" data-serasa-assistant-action="use-logon">Usar logon + senha</button>
          <button type="button" class="secondary-button" data-serasa-assistant-action="use-sandbox">Manter em sandbox seguro</button>
        </div>
      </div>
    `;
}

function applySerasaAssistantAction(action) {
  const ctx = getSerasaAssistantContext();
  if (adminAdvanced) {
    adminAdvanced.open = true;
  }
  bureauProvider.value = "serasa";
  if (action === "use-sandbox" || action === "apply-known") {
    bureauEnvironment.value = "sandbox";
  }
  if (action === "use-logon" || ctx.suggestedAuthMode === "logon") {
    bureauAuthMode.value = "logon";
  } else if (ctx.suggestedAuthMode === "bearer_sso") {
    bureauAuthMode.value = "bearer_sso";
  }
  bureauBaseUrl.value = ctx.serasa.base_url || bureauBaseUrl.value || "https://api.scccheck.com.br";
  bureauUsername.value = ctx.serasa.username || bureauUsername.value;
  bureauPortalUrl.value = ctx.serasa.portal_url || bureauPortalUrl.value || "https://sso.gruporaizato.com.br/login";
  bureauOrigin.value = ctx.serasa.origin || bureauOrigin.value || "https://sistema.scccheck.com.br";
  bureauTokenPath.value = ctx.serasa.token_path || bureauTokenPath.value || "/oauth/token";
  if (!bureauProductCode.value && ctx.features.allow_scc_check) {
    bureauProductCode.value = "SCC_CHECK";
  }
  if (!bureauConsultPath.value) {
    bureauConsultPath.value = ctx.serasa.consult_path || "/scc-check-v2/consultas";
  }
  renderSerasaWizard();
  showStatus("Assistente Serasa aplicou a configuração conhecida no formulário. Agora revise os campos pendentes e salve.", "success");
}

function setAdminUserFeedback(message, type = "info", title = "Cadastro") {
  if (!adminUserFeedback || !adminUserFeedbackTitle || !adminUserFeedbackMessage) {
    showStatus(message, type);
    return;
  }
  adminUserFeedback.hidden = false;
  adminUserFeedback.dataset.type = type;
  adminUserFeedbackTitle.textContent = title;
  adminUserFeedbackMessage.textContent = message;
}

function clearAdminUserFeedback() {
  if (!adminUserFeedback) return;
  adminUserFeedback.hidden = true;
  adminUserFeedback.dataset.type = "info";
  if (adminUserFeedbackTitle) adminUserFeedbackTitle.textContent = "Cadastro";
  if (adminUserFeedbackMessage) adminUserFeedbackMessage.textContent = "";
}

function showChangePassword(message = "", level = "info") {
  if (!changePasswordOverlay) return;
  changePasswordOverlay.classList.add("is-active");
  document.body.classList.add("auth-locked");
  if (message && changePasswordStatus) {
    changePasswordStatus.innerHTML = `<strong>${level === "error" ? "Revise a senha" : "Atualize sua senha"}</strong><span>${escapeHtml(message)}</span>`;
  }
}

function hideChangePassword() {
  if (!changePasswordOverlay) return;
  changePasswordOverlay.classList.remove("is-active");
  if (!loginOverlay.classList.contains("is-active")) {
    document.body.classList.remove("auth-locked");
  }
}

function showLogin(message = "", level = "info") {
  document.body.classList.add("auth-locked");
  loginOverlay.classList.add("is-active");
  if (message) {
    loginStatus.innerHTML = `<strong>${level === "error" ? "Acesso negado" : "Entrar para continuar"}</strong><span>${escapeHtml(message)}</span>`;
  }
}

function hideLogin() {
  loginOverlay.classList.remove("is-active");
  if (!changePasswordOverlay.classList.contains("is-active")) {
    document.body.classList.remove("auth-locked");
  }
}

function applyAuthState() {
  if (currentUser) {
    authUserChip.textContent = `${currentUser.name || currentUser.email} · ${currentUser.role}`;
    authLogoutButton.disabled = false;
    hideLogin();
    if (currentUser.must_change_password) {
      showChangePassword("Este é um acesso novo ou resetado. Digite a nova senha e confirme para liberar o sistema.");
    } else {
      hideChangePassword();
    }
  } else {
    authUserChip.textContent = "Sem sessão";
    authLogoutButton.disabled = true;
    hideChangePassword();
    showLogin();
  }
  const adminTab = Array.from(tabButtons).find((item) => item.dataset.tab === "admin");
  if (adminTab) {
    adminTab.style.display = currentUserHas("configurar_modulos") || currentUserHas("gerenciar_credenciais_serasa") ? "" : "none";
  }
  const premiumTab = Array.from(tabButtons).find((item) => item.dataset.tab === "serasa-premium");
  if (premiumTab) {
    premiumTab.style.display = currentUserHas("usar_serasa_premium") ? "" : "none";
  }
  setSerasaPremiumReadyState();
}

async function bootstrapAuth() {
  try {
    const rememberedLogin = localStorage.getItem(REMEMBER_LOGIN_KEY) || "";
    if (loginUser && rememberedLogin) {
      loginUser.value = rememberedLogin;
      if (loginRemember) loginRemember.checked = true;
    }
    const response = await fetch("/api/auth/session");
    const payload = await response.json();
    if (payload.authenticated) {
      currentUser = payload.user;
      if (serasaUser) serasaUser.value = currentUser.email || "";
      if (serasaPremiumUser) serasaPremiumUser.value = currentUser.email || "";
      applyAuthState();
      return;
    }
    currentUser = null;
    const defaultCreds = payload.default_credentials || {};
    loginStatus.innerHTML = `<strong>Acesso inicial</strong><span>Login padrão: ${escapeHtml(defaultCreds.login || "admin@scriptt")} · Senha inicial: ${escapeHtml(defaultCreds.password || "Scriptt@123")}</span>`;
    applyAuthState();
  } catch {
    currentUser = null;
    showLogin("Não foi possível validar a sessão no backend.", "error");
  }
}

async function loginApp() {
  const login = loginUser.value.trim();
  const password = loginPassword.value;
  if (!login || !password) {
    showLogin("Informe login e senha para entrar.", "error");
    return;
  }
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });
    const payload = await response.json();
    if (!response.ok || !payload.ok) {
      showLogin(payload.erro || "Não foi possível entrar.", "error");
      return;
    }
    currentUser = payload.user;
    if (loginRemember?.checked) {
      localStorage.setItem(REMEMBER_LOGIN_KEY, login);
    } else {
      localStorage.removeItem(REMEMBER_LOGIN_KEY);
    }
    if (serasaUser) serasaUser.value = currentUser.email || "";
    if (serasaPremiumUser) serasaPremiumUser.value = currentUser.email || "";
    loginPassword.value = "";
    applyAuthState();
    renderDashboard();
  } catch {
    showLogin("Falha ao autenticar no servidor.", "error");
  }
}

async function logoutApp() {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } catch {
    // ignore
  }
  currentUser = null;
  applyAuthState();
}

async function submitPasswordChange() {
  const newPassword = changePasswordNew?.value || "";
  const confirmPassword = changePasswordConfirm?.value || "";
  if (!newPassword || !confirmPassword) {
    showChangePassword("Preencha a nova senha e a confirmação.", "error");
    return;
  }
  try {
    const response = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        new_password: newPassword,
        confirm_password: confirmPassword,
      }),
    });
    const payload = await response.json();
    if (!response.ok || !payload.ok) {
      showChangePassword(payload.erro || "Não foi possível atualizar a senha.", "error");
      return;
    }
    currentUser = payload.user;
    if (changePasswordForm) changePasswordForm.reset();
    hideChangePassword();
    applyAuthState();
    showStatus("Senha atualizada com sucesso. Acesso liberado.", "success");
  } catch {
    showChangePassword("Falha ao atualizar a senha no servidor.", "error");
  }
}

function clearCpfInputs() {
  if (cpfDocument) cpfDocument.value = "";
  if (cpfName) cpfName.value = "";
  setCpfStatus("CPF usa crédito Serasa/sandbox e preenche Resultado e Resumo.", "idle");
}

input.addEventListener("input", () => {
  input.value = maskCnpj(input.value);
});

if (cpfDocument) {
  cpfDocument.addEventListener("input", () => {
    cpfDocument.value = formatDocument(cpfDocument.value);
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await loginApp();
  });
}

if (changePasswordForm) {
  changePasswordForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await submitPasswordChange();
  });
}

if (authLogoutButton) {
  authLogoutButton.addEventListener("click", async () => {
    await logoutApp();
  });
}

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

if (cpfForm && cpfDocument && cpfName) {
  cpfForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await consultarCpfFluxo(cpfDocument.value, cpfName.value);
  });
}

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
    lastCreditSubjectName = item.name || (item.documentType === "CPF" ? "Titular do CPF" : "");
    serasaDocument.value = formatDocument(item.document);
    if (serasaSubjectName) {
      serasaSubjectName.value = item.name || "";
    }
    renderSerasaResult(item.data, item.mock);
    if (item.documentType === "CPF") {
      renderCreditDocumentResult(item.data, item.mock);
    }
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
  if (serasaSubjectName) {
    serasaSubjectName.value = payload.dados?.razao_social || payload.dados?.nome_fantasia || "";
  }
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
  if (!lastPayload && !lastCreditAnalysis) {
    return;
  }

  lastPayload ? openPrintableReport(lastPayload) : openCreditReport(lastCreditAnalysis);
});

printReportButton.addEventListener("click", () => {
  if (!lastPayload && !lastCreditAnalysis) {
    return;
  }

  lastPayload ? openPrintableReport(lastPayload) : openCreditReport(lastCreditAnalysis);
});

  newButtons.forEach((newButton) => {
  newButton.addEventListener("click", () => {
    input.value = "";
    clearCpfInputs();
    if (serasaSubjectName) serasaSubjectName.value = "";
    lastPayload = null;
    lastCreditSubjectName = "";
    resultBox.innerHTML = emptyResult();
    summaryText.value = "";
    updateWhatsappLink("");
    renderSummaryPreview();
    renderRecommendations(null);
    renderReferences("");
    renderSerasaEmpty();
    setTrafficState("idle", "Pronto para consultar", "Informe um CNPJ, CPF ou selecione um cliente do GEST para iniciar a análise.");
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

[gestSearch, gestCode, gestCnpj, gestCpf, gestStart, gestEnd].forEach((field) => {
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

if (gestCpf) {
  gestCpf.addEventListener("input", () => {
    gestCpf.value = formatDocument(gestCpf.value);
  });
}

referenceLimit.addEventListener("blur", () => {
  referenceLimit.value = formatCurrencyInput(referenceLimit.value);
});

serasaForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await runSerasaAnalysis(serasaDocument.value, {
    subjectName: serasaSubjectName?.value?.trim() || "",
  });
});

serasaPrint.addEventListener("click", () => {
  if (lastPayload) {
    openPrintableReport(lastPayload);
  } else if (lastCreditAnalysis) {
    openCreditReport(lastCreditAnalysis);
  }
});

if (serasaPremiumForm) {
  serasaPremiumForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await runSerasaPremiumAnalysis();
  });
}

if (serasaWizard) {
  serasaWizard.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-serasa-assistant-action]");
    if (!actionButton) return;
    applySerasaAssistantAction(actionButton.dataset.serasaAssistantAction);
  });
}

[serasaPremiumDocument, serasaPremiumPassword, serasaPremiumProduct].forEach((field) => {
  if (field) {
    field.addEventListener("input", () => {
      setSerasaPremiumReadyState();
    });
  }
});

if (serasaPremiumPrint) {
  serasaPremiumPrint.addEventListener("click", () => {
    if (lastSerasaPremiumAnalysis) {
      openCreditReport(lastSerasaPremiumAnalysis);
    }
  });
}

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

if (adminUserRole) {
  adminUserRole.addEventListener("change", () => {
    setPermissionInputs(adminUserRole.value);
  });
}

if (clearCurrentButton) {
  clearCurrentButton.addEventListener("click", () => {
    clearCurrentAnalysis();
  });
}

historyTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    historyKind = tab.dataset.historyKind || "cnpj";
    historyTabs.forEach((item) => item.classList.toggle("is-active", item === tab));
    renderHistory(historySearch.value);
  });
});

if (summaryPrintButton) {
  summaryPrintButton.addEventListener("click", () => {
    if (lastPayload) {
      openPrintableReport(lastPayload);
    } else if (lastCreditAnalysis) {
      openCreditReport(lastCreditAnalysis);
    }
  });
}

if (saveConsultationButton) {
  saveConsultationButton.addEventListener("click", () => {
    saveCurrentConsultation();
  });
}

if (storageForm) {
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
}

bureauForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const selected = bureauProvider.value;
  const existingProviders = bureauSettings.providers || {};
  const payload = {
    provider: selected,
    environment: bureauEnvironment.value,
      providers: {
        serasa: {
          base_url: selected === "serasa" ? bureauBaseUrl.value.trim() : (existingProviders.serasa?.base_url || ""),
          client_id: selected === "serasa" ? bureauClientId.value.trim() : (existingProviders.serasa?.client_id || ""),
          client_secret: selected === "serasa" ? bureauClientSecret.value.trim() : "",
          auth_mode: selected === "serasa" ? bureauAuthMode.value : (existingProviders.serasa?.auth_mode || "oauth"),
          username: selected === "serasa" ? bureauUsername.value.trim() : (existingProviders.serasa?.username || ""),
          password: selected === "serasa" ? bureauPassword.value.trim() : "",
          api_token: selected === "serasa" ? bureauApiToken.value.trim() : "",
          sso_token: selected === "serasa" ? bureauSsoToken.value.trim() : "",
          origin: selected === "serasa" ? bureauOrigin.value.trim() : (existingProviders.serasa?.origin || "https://sistema.scccheck.com.br"),
          portal_url: selected === "serasa" ? bureauPortalUrl.value.trim() : (existingProviders.serasa?.portal_url || ""),
          consult_path: selected === "serasa" ? bureauConsultPath.value.trim() : (existingProviders.serasa?.consult_path || ""),
          token_path: selected === "serasa" ? bureauTokenPath.value.trim() : (existingProviders.serasa?.token_path || "/oauth/token"),
          product_code: selected === "serasa" ? bureauProductCode.value.trim() : (existingProviders.serasa?.product_code || ""),
        },
      boavista: {
        base_url: selected === "boavista" ? bureauBaseUrl.value.trim() : (existingProviders.boavista?.base_url || ""),
        client_id: selected === "boavista" ? bureauClientId.value.trim() : (existingProviders.boavista?.client_id || ""),
        client_secret: selected === "boavista" ? bureauClientSecret.value.trim() : "",
        auth_mode: existingProviders.boavista?.auth_mode || "oauth",
        username: existingProviders.boavista?.username || "",
        password: "",
        consult_path: existingProviders.boavista?.consult_path || "",
        token_path: existingProviders.boavista?.token_path || "/oauth/token",
        product_code: existingProviders.boavista?.product_code || "",
      },
      quod: {
        base_url: selected === "quod" ? bureauBaseUrl.value.trim() : (existingProviders.quod?.base_url || ""),
        client_id: selected === "quod" ? bureauClientId.value.trim() : (existingProviders.quod?.client_id || ""),
        client_secret: selected === "quod" ? bureauClientSecret.value.trim() : "",
        auth_mode: existingProviders.quod?.auth_mode || "oauth",
        username: existingProviders.quod?.username || "",
        password: "",
        consult_path: existingProviders.quod?.consult_path || "",
        token_path: existingProviders.quod?.token_path || "/oauth/token",
        product_code: existingProviders.quod?.product_code || "",
      },
    },
    security: {
      validation_password: bureauValidationPassword?.value?.trim() || "",
    },
    features: {
      serasa_premium_enabled: Boolean(bureauFeaturePremium?.checked),
      allow_scc_check: Boolean(bureauFeatureScc?.checked),
    },
  };

  try {
    const response = await fetch("/api/admin/bureau-config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (!response.ok || !result.ok) {
      showStatus(result.erro || "Não foi possível salvar o bureau.", "error");
      return;
    }
    bureauSettings = result.config || {};
    applyBureauSettingsToForm();
    loadAdminPanel();
    showStatus("Configuração do bureau salva no backend local.", "success");
  } catch {
    showStatus("Falha ao salvar a configuração do bureau.", "error");
  }
});

bureauProvider.addEventListener("change", () => {
  const selected = bureauProvider.value;
  const current = bureauSettings.providers?.[selected] || {};
  bureauBaseUrl.value = current.base_url || "";
  bureauClientId.value = current.client_id || "";
  bureauClientSecret.value = "";
   bureauAuthMode.value = current.auth_mode || "oauth";
   bureauUsername.value = current.username || "";
   bureauPassword.value = "";
   bureauConsultPath.value = current.consult_path || "";
   bureauTokenPath.value = current.token_path || "/oauth/token";
   bureauProductCode.value = current.product_code || "";
  bureauClientSecret.placeholder = current.has_client_secret
    ? "Segredo já salvo. Preencha apenas para substituir"
    : "Informe o client secret";
  bureauPassword.placeholder = current.has_password
    ? "Senha já salva. Preencha apenas para substituir"
    : "Informe a senha do logon";
  bureauApiToken.placeholder = current.has_api_token
    ? "Token da API já salvo. Preencha apenas para substituir"
    : "Cole o Bearer token da API";
  bureauSsoToken.placeholder = current.has_sso_token
    ? "Token SSO já salvo. Preencha apenas para substituir"
    : "Cole o token SSO";
  updateBureauAuthVisibility();
  renderSerasaWizard();
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
    const documentValue = consultButton.dataset.consultClient || "";
    const documentType = consultButton.dataset.consultType || "";
    const subjectName = consultButton.dataset.consultName || "";
    if (documentType === "CPF" || onlyDigits(documentValue).length === 11) {
      if (cpfDocument) cpfDocument.value = formatDocument(documentValue);
      if (cpfName) cpfName.value = subjectName;
      await consultarCpfFluxo(documentValue, subjectName);
    } else {
      input.value = documentValue;
      await consultar(input.value);
    }
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
    const documentValue = onlyDigits(okButton.dataset.okClient);
    clientOk[documentValue] = {
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
  if (target === "analise-credito") {
    renderCreditWorkbench();
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
      cpf: gestCpf?.value?.trim() || "",
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
          <th>${sortHeader("Documento", "documento")}</th>
          <th>${sortHeader("Cidade/UF", "cidade")}</th>
          <th>${sortHeader("IE", "ie")}</th>
          <th>${sortHeader("Status", "status")}</th>
          <th>Acoes</th>
        </tr>
      </thead>
      <tbody>
        ${visibleClients.map((cliente) => `
          <tr class="${clientOk[onlyDigits(cliente.documento || cliente.cnpj || cliente.cpf || "")] ? "user-ok-row" : ""}">
            <td>
              <strong>${escapeHtml(cliente.nome || "Sem nome")}</strong>
              ${cliente.fantasia ? `<small>${escapeHtml(cliente.fantasia)}</small>` : ""}
              ${cliente.data_cadastro ? `<small>Cadastro: ${escapeHtml(formatDate(cliente.data_cadastro))}</small>` : ""}
            </td>
            <td>
              <strong>${escapeHtml(cliente.documento || cliente.cnpj || cliente.cpf || "-")}</strong>
              <small>${escapeHtml(cliente.documento_tipo || "Documento")}</small>
            </td>
            <td>${escapeHtml([cliente.cidade, cliente.uf].filter(Boolean).join(" - "))}</td>
            <td>${escapeHtml(cliente.inscricao_estadual || "-")}</td>
            <td>
              <span class="${cliente.documento_valido ? "valid-chip" : "invalid-chip"}">
                ${cliente.documento_valido ? `${escapeHtml(cliente.documento_tipo || "Documento")} válido` : `${escapeHtml(cliente.documento_tipo || "Documento")} inválido`}
              </span>
            </td>
            <td>
              <div class="row-actions">
                <button
                  type="button"
                  class="secondary-button"
                  data-consult-client="${escapeHtml(cliente.documento || cliente.cnpj || cliente.cpf || "")}"
                  data-consult-type="${escapeHtml(cliente.documento_tipo || "")}"
                  data-consult-name="${escapeHtml(cliente.nome || cliente.fantasia || "")}"
                >Consultar</button>
                ${cliente.documento_tipo === "CNPJ" ? `<button type="button" class="secondary-button" data-sintegra-client data-cnpj="${escapeHtml(cliente.cnpj)}" data-uf="${escapeHtml(cliente.uf || "")}">Sintegra</button>` : ""}
                <button type="button" class="secondary-button" data-ok-client="${escapeHtml(cliente.documento || cliente.cnpj || cliente.cpf || "")}" ${clientOk[onlyDigits(cliente.documento || cliente.cnpj || cliente.cpf || "")] ? "disabled" : ""}>${clientOk[onlyDigits(cliente.documento || cliente.cnpj || cliente.cpf || "")] ? "OK usuário" : "Marcar OK"}</button>
              </div>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
  bindGestRowActions();
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
    documento: onlyDigits(cliente.documento || cliente.cnpj || cliente.cpf || ""),
    cidade: [cliente.cidade, cliente.uf].filter(Boolean).join(" "),
    ie: cliente.inscricao_estadual || "",
    status: cliente.documento_valido ? "valido" : "invalido",
  };
  return String(values[key] || "");
}

function sortHeader(label, key) {
  const active = gestSort.key === key;
  const arrow = active ? (gestSort.direction === "asc" ? "↑" : "↓") : "↕";
  return `<button type="button" class="sort-button ${active ? "is-active" : ""}" data-sort-clients="${escapeHtml(key)}">${escapeHtml(label)} <span>${arrow}</span></button>`;
}

function bindGestRowActions() {
  clientsBox.querySelectorAll("[data-consult-client]").forEach((buttonElement) => {
    if (buttonElement.dataset.boundClick === "true") {
      return;
    }
    buttonElement.dataset.boundClick = "true";
    buttonElement.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      const documentValue = buttonElement.dataset.consultClient || "";
      const documentType = buttonElement.dataset.consultType || "";
      const subjectName = buttonElement.dataset.consultName || "";
      if (documentType === "CPF" || onlyDigits(documentValue).length === 11) {
        if (cpfDocument) cpfDocument.value = formatDocument(documentValue);
        if (cpfName) cpfName.value = subjectName;
        await consultarCpfFluxo(documentValue, subjectName);
      } else {
        input.value = documentValue;
        await consultar(documentValue);
      }
    });
  });

  clientsBox.querySelectorAll("[data-sintegra-client]").forEach((buttonElement) => {
    if (buttonElement.dataset.boundClick === "true") {
      return;
    }
    buttonElement.dataset.boundClick = "true";
    buttonElement.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      const cnpj = buttonElement.dataset.cnpj || "";
      const uf = buttonElement.dataset.uf || "";
      await navigator.clipboard.writeText(cnpj);
      window.open("http://www.sintegra.gov.br/", "_blank", "noopener");
      showStatus(`CNPJ copiado para consulta no Sintegra ${uf || ""}.`, "success");
    });
  });

  clientsBox.querySelectorAll("[data-ok-client]").forEach((buttonElement) => {
    if (buttonElement.dataset.boundClick === "true") {
      return;
    }
    buttonElement.dataset.boundClick = "true";
    buttonElement.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const documentValue = onlyDigits(buttonElement.dataset.okClient);
      clientOk[documentValue] = {
        checkedAt: new Date().toISOString(),
        status: "ok_usuario",
      };
      saveClientOk();
      buttonElement.textContent = "OK usuário";
      buttonElement.disabled = true;
      buttonElement.closest("tr")?.classList.add("user-ok-row");
      showStatus("Cliente marcado como OK pelo usuário.", "success");
    });
  });
}

function showPayload(payload, message) {
  lastPayload = payload;
  lastInternalHistory = null;
  renderResult(payload);
  renderCreditWorkbench();
  renderRecommendations(payload);
  renderReferences(onlyDigits(payload.cnpj_formatado || payload.dados?.cnpj || ""));
  serasaDocument.value = payload.cnpj_formatado || formatCnpj(payload.dados?.cnpj || "");
  if (serasaSubjectName) {
    serasaSubjectName.value = payload.dados?.razao_social || payload.dados?.nome_fantasia || "";
  }
  if (serasaPremiumDocument) {
    serasaPremiumDocument.value = payload.cnpj_formatado || formatCnpj(payload.dados?.cnpj || "");
  }
  if (serasaPremiumSubjectName) {
    serasaPremiumSubjectName.value = payload.dados?.razao_social || payload.dados?.nome_fantasia || "";
  }
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
    renderCreditWorkbench();
    summaryText.value = buildSummary(payload);
    updateWhatsappLink(summaryText.value);
    renderSummaryPreview();
    renderDashboard();
  }
}

async function runSerasaAnalysis(documentValue, options = {}) {
  const digits = onlyDigits(documentValue);
  if (![11, 14].includes(digits.length)) {
    renderSerasaError("Informe um CPF ou CNPJ valido para análise de crédito.");
    return;
  }

  const type = digits.length === 14 ? "cnpj" : "cpf";
  if (type === "cpf") {
    lastPayload = null;
    lastInternalHistory = null;
    lastCreditSubjectName = options.subjectName || lastCreditSubjectName || "Titular do CPF";
    if (serasaSubjectName) {
      serasaSubjectName.value = lastCreditSubjectName === "Titular do CPF" ? "" : lastCreditSubjectName;
    }
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
    addCreditHistory(payload.data, payload.mock, type === "cpf" ? lastCreditSubjectName || "CPF analisado" : "");
    renderSerasaResult(payload.data, payload.mock);
    if (type === "cpf") {
      renderCreditDocumentResult(payload.data, payload.mock);
      renderCreditWorkbench();
      renderRecommendations(null);
      renderReferences("");
      setExportEnabled(true);
      setCpfStatus(
        payload.mock
          ? "CPF analisado em modo sandbox/mock. Nome deve ser informado manualmente ou por API cadastral real."
          : "CPF analisado com sucesso.",
        "success"
      );
      setTrafficState("green", "CPF analisado", "Resultado de crédito carregado. Revise a aba Resultado e o Resumo para documentação.");
      if (options.navigateToResult) {
        setActiveView("resultado");
      }
    }
    serasaPrint.disabled = false;
    summaryPrintButton.disabled = false;
    saveConsultationButton.disabled = false;
    renderDashboard();
    summaryText.value = lastPayload ? buildSummary(lastPayload) : buildCreditSummary(lastCreditAnalysis);
    updateWhatsappLink(summaryText.value);
    renderSummaryPreview();
    renderCreditWorkbench();
  } catch {
    renderSerasaError("Dados Serasa indisponíveis no momento.");
    setCpfStatus("Não foi possível analisar o CPF agora.", "error");
  }
}

async function consultarCpfFluxo(documentValue, nameValue = "") {
  const digits = onlyDigits(documentValue);
  if (digits.length !== 11) {
    setCpfStatus("Informe um CPF válido.", "error");
    return;
  }

  setCpfStatus("Analisando CPF no fluxo principal...", "loading");
  serasaDocument.value = formatDocument(digits);
  if (serasaPremiumDocument) serasaPremiumDocument.value = formatDocument(digits);
  lastCreditSubjectName = nameValue.trim() || "Titular do CPF";
  if (serasaSubjectName) {
    serasaSubjectName.value = nameValue.trim();
  }
  if (serasaPremiumSubjectName) {
    serasaPremiumSubjectName.value = nameValue.trim();
  }
  await runSerasaAnalysis(digits, {
    subjectName: lastCreditSubjectName,
    source: "consulta",
    navigateToResult: true,
  });
}

async function runSerasaPremiumAnalysis() {
  const documentValue = serasaPremiumDocument?.value || "";
  const digits = onlyDigits(documentValue);
  const userLogin = serasaPremiumUser?.value?.trim() || "operador";
  const selectedProduct = serasaPremiumProduct?.value || "SCC_CHECK";
  const readiness = getSerasaPremiumReadiness();
  if (![11, 14].includes(digits.length)) {
    renderSerasaPremiumError("Informe um CPF ou CNPJ válido para o serviço pago.");
    return;
  }
  if (!userHasPermission(userLogin, "usar_serasa_premium")) {
    renderSerasaPremiumError("Este usuário não possui acesso à área Serasa Premium.");
    return;
  }
  if (selectedProduct === "SCC_CHECK" && !userHasPermission(userLogin, "usar_scc_check")) {
    renderSerasaPremiumError("Este usuário não possui permissão para SCC Check.");
    return;
  }
  if (!serasaPremiumPassword?.value?.trim()) {
    renderSerasaPremiumError("Informe a senha de validação para usar o serviço pago.");
    return;
  }
  if (!readiness.hasValidation) {
    renderSerasaPremiumError("A senha premium ainda não foi configurada no Admin.");
    return;
  }

  serasaPremiumStatus.textContent = "Consultando";
  serasaPremiumStatus.dataset.level = "watch";
  serasaPremiumBoard.innerHTML = loadingCreditResult();

  try {
    const response = await fetch("/api/serasa/premium/consultar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        document: digits,
        document_type: digits.length === 14 ? "CNPJ" : "CPF",
        queried_by: userLogin,
        query_reason: serasaPremiumReason?.value?.trim() || "analise_credito_premium",
        legal_basis: serasaPremiumLegal?.value?.trim() || "proteção ao crédito",
        product: selectedProduct,
        subject_name: serasaPremiumSubjectName?.value?.trim() || "",
        validation_password: serasaPremiumPassword.value.trim(),
      }),
    });
    const payload = await response.json();
    if (!response.ok || !payload.ok) {
      renderSerasaPremiumError(payload.erro || "Serviço premium indisponível no momento.");
      return;
    }
    lastSerasaPremiumAnalysis = payload.data;
    lastCreditAnalysis = payload.data;
    renderSerasaPremiumResult(payload.data, payload.mock, selectedProduct);
    serasaPremiumPrint.disabled = false;
    renderSummaryPreview();
    renderDashboard();
  } catch {
    renderSerasaPremiumError("Falha ao consultar o serviço pago Serasa.");
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
    const [adminResponse, bureauResponse] = await Promise.all([
      fetch("/api/admin/credito"),
      fetch("/api/admin/bureau-config"),
    ]);
    const payload = await adminResponse.json();
    const bureauPayload = await bureauResponse.json();
    if (!adminResponse.ok || !payload.ok) {
      return;
    }
    if (bureauResponse.ok && bureauPayload.ok) {
      bureauSettings = bureauPayload.config || {};
      applyBureauSettingsToForm();
      renderSerasaWizard();
    }
    adminUsers = payload.users || [];
    currentUser = payload.current_user || currentUser;
    applyAuthState();
    renderAdminPanel(payload);
  } finally {
    adminLoad.disabled = false;
  }
}

function applyBureauSettingsToForm() {
  const provider = bureauSettings.provider || "mock";
  const environment = bureauSettings.environment || "sandbox";
  const current = bureauSettings.providers?.[provider] || {};
  bureauProvider.value = provider;
  bureauEnvironment.value = environment;
  bureauBaseUrl.value = current.base_url || "";
  bureauClientId.value = current.client_id || "";
  bureauClientSecret.value = "";
  bureauAuthMode.value = current.auth_mode || "oauth";
  bureauUsername.value = current.username || "";
  bureauPassword.value = "";
  bureauApiToken.value = "";
  bureauSsoToken.value = "";
  bureauPortalUrl.value = current.portal_url || "";
  bureauOrigin.value = current.origin || "https://sistema.scccheck.com.br";
  bureauConsultPath.value = current.consult_path || "";
  bureauTokenPath.value = current.token_path || "/oauth/token";
  bureauProductCode.value = current.product_code || "";
  bureauValidationPassword.value = "";
  bureauFeaturePremium.checked = Boolean(bureauSettings.features?.serasa_premium_enabled);
  bureauFeatureScc.checked = Boolean(bureauSettings.features?.allow_scc_check);
  bureauClientSecret.placeholder = current.has_client_secret
    ? "Segredo já salvo. Preencha apenas para substituir"
    : "Informe o client secret";
  bureauPassword.placeholder = current.has_password
    ? "Senha já salva. Preencha apenas para substituir"
    : "Informe a senha do logon";
  bureauApiToken.placeholder = current.has_api_token
    ? "Token da API já salvo. Preencha apenas para substituir"
    : "Cole o Bearer token da API";
  bureauSsoToken.placeholder = current.has_sso_token
    ? "Token SSO já salvo. Preencha apenas para substituir"
    : "Cole o token SSO";
  updateBureauAuthVisibility();
  setSerasaPremiumReadyState();
  renderSerasaWizard();
}

function setLoading(isLoading) {
  button.disabled = isLoading;
  button.textContent = isLoading ? "Consultando" : "Consultar";
}

function clearCurrentAnalysis() {
  input.value = "";
  clearCpfInputs();
  serasaDocument.value = "";
  if (serasaSubjectName) serasaSubjectName.value = "";
  lastPayload = null;
  lastCreditAnalysis = null;
  lastInternalHistory = null;
  lastCreditSubjectName = "";
  resultBox.innerHTML = emptyResult();
  summaryText.value = "";
  renderSummaryPreview();
  updateWhatsappLink("");
  renderCreditWorkbench();
  renderRecommendations(null);
  renderReferences("");
  renderSerasaEmpty();
  renderSerasaPremiumEmpty();
  renderPartners(null);
  setExportEnabled(false);
  setTrafficState("idle", "Pronto para consultar", "Informe um CNPJ, CPF ou selecione um cliente do GEST para iniciar a análise.");
  showStatus("Tela atual limpa. O histórico foi preservado.", "success");
  renderDashboard();
}

function setExportEnabled(isEnabled) {
  copySummaryButton.disabled = !isEnabled;
  exportCsvButton.disabled = !isEnabled || !lastPayload;
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
  if (globalFeedback && globalFeedbackTitle && globalFeedbackMessage) {
    globalFeedback.hidden = false;
    globalFeedback.dataset.type = type || "idle";
    globalFeedbackTitle.textContent =
      type === "error" ? "Atenção"
        : type === "success" ? "Concluído"
          : type === "loading" ? "Processando"
            : "Atualização";
    globalFeedbackMessage.textContent = message;
  }
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

function updateBureauAuthVisibility() {
  const mode = bureauAuthMode?.value || "oauth";
  bureauScopedFields.forEach((field) => {
    field.classList.toggle("is-hidden", (field.dataset.authScope || "") !== mode);
  });
}

if (bureauAuthMode) {
  bureauAuthMode.addEventListener("change", () => {
    updateBureauAuthVisibility();
    renderSerasaWizard();
    setSerasaPremiumReadyState();
  });
}

function renderCreditDocumentResult(data, isMock) {
  const documentLabel = formatDocument(data.document);
  const title = data.document_type === "CPF" ? lastCreditSubjectName || "Titular do CPF" : lastCreditSubjectName || "Documento analisado";
  resultBox.innerHTML = `
    <div class="summary credit-document-summary">
      <div class="summary-meta">
        <span class="pill">${escapeHtml(data.document_type || "Documento")}</span>
        <span class="source-pill">${escapeHtml(data.provider || "Provedor")}</span>
        ${isMock ? `<span class="source-pill warning-pill">Mock/Sandbox</span>` : ""}
      </div>
      <h2>${escapeHtml(title)}</h2>
      <p>${escapeHtml(documentLabel)}</p>
      ${isMock ? `<strong class="city-highlight">Sandbox não valida nome real do CPF</strong>` : ""}
    </div>
    <dl class="details">
      ${row("Documento", documentLabel)}
      ${row("Tipo", data.document_type)}
      ${row("Nome informado", title)}
      ${row("Score Serasa", data.score_serasa)}
      ${row("Score final", data.score_final)}
      ${row("Risco", data.risk_label)}
      ${row("Decisão", data.decision)}
      ${row("Limite sugerido", formatMoney(data.recommended_limit))}
      ${row("Prob. inadimplência", `${data.probabilidade_inadimplencia}%`)}
      ${row("Restrições", data.restricoes_financeiras)}
      ${row("Protestos", data.protestos)}
      ${row("Dívidas vencidas", data.dividas_vencidas)}
      ${row("Pendências comerciais", data.pendencias_comerciais)}
      ${row("Ações judiciais", data.acoes_judiciais)}
      ${row("Situação cadastral", data.situacao_cadastral)}
      ${row("Provider", data.provider)}
    </dl>
    <section class="internal-history-card ${escapeHtml(data.risk_level || "moderado")}">
      <div class="internal-history-head">
        <div>
          <span>Análise de crédito CPF</span>
          <h3>${escapeHtml(data.risk_label || "Risco calculado")}</h3>
          <p>${escapeHtml(data.recommendation || "Revise os indicadores antes da decisão comercial.")}</p>
        </div>
        <div class="internal-score" style="--score:${Math.max(0, Math.min(100, Number(data.score_final || data.score_serasa || 0) / 10))}">
          <strong>${escapeHtml(data.score_final || data.score_serasa || "-")}</strong>
          <small>score</small>
        </div>
      </div>
      <div class="internal-opinion">
        <strong>Motivos</strong>
        <ul>${(data.reasons || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("") || "<li>Nenhum motivo detalhado retornado.</li>"}</ul>
      </div>
    </section>
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

function renderCreditWorkbench() {
  if (!creditWorkbench || !creditWorkbenchStatus) {
    return;
  }

  const dados = lastPayload?.dados || {};
  const hasPayload = Boolean(lastPayload);
  const hasCredit = Boolean(lastCreditAnalysis);
  const internal = lastInternalHistory?.cliente_cadastrado ? lastInternalHistory : null;
  const analysis = hasPayload ? analyzeCredit(lastPayload) : null;
  const title = dados.razao_social || dados.nome_fantasia || lastCreditSubjectName || "Nenhum documento carregado";
  const documentLine = hasPayload
    ? (lastPayload.cnpj_formatado || formatCnpj(dados.cnpj || ""))
    : hasCredit
      ? formatDocument(lastCreditAnalysis.document)
      : "";
  const cityUf = [dados.municipio, dados.uf].filter(Boolean).join(" - ");
  const approval = hasCredit ? approvalLevel(lastCreditAnalysis) : { label: analysis?.label || "Aguardando análise", score: 0 };
  const bureauStage = hasCredit
    ? `${lastCreditAnalysis.provider} · ${lastCreditAnalysis.risk_label}`
    : hasPayload
      ? "Pronto para rodar bureau"
      : "Aguardando documento";
  const historyStage = internal
    ? `${internal.cliente?.codigo || ""} · score ${internal.indicadores?.score_interno ?? "-"}`
    : hasPayload
      ? (lastInternalHistory?.mensagem || "Verificando histórico interno")
      : "Sem cliente selecionado";

  if (!hasPayload && !hasCredit) {
    creditWorkbenchStatus.textContent = "Preparado";
    creditWorkbenchStatus.dataset.level = "watch";
    creditWorkbench.innerHTML = `
      <article class="credit-workbench-hero">
        <span>Fluxo recomendado</span>
        <h3>Consulta, análise e documentação no mesmo eixo</h3>
        <p>Use <strong>Consulta CPF/CNPJ</strong> para localizar o documento, <strong>Clientes GEST</strong> para buscar na carteira, <strong>Análise de crédito</strong> para interpretar o caso e <strong>Resumo</strong> para imprimir ou compartilhar.</p>
      </article>
      <div class="credit-workbench-grid">
        ${workbenchCard("1. Cadastro base", "BrasilAPI, Minha Receita e dados públicos", "Consulte CNPJ ou CPF para abrir a ficha principal.")}
        ${workbenchCard("2. Histórico interno", "GEST, duplicatas, compras e pagamentos", "Quando o cliente existir no CADCLI, os indicadores aparecem aqui automaticamente.")}
        ${workbenchCard("3. Bureau", "Serasa, Boa Vista ou Quod", "A aba Crédito Serasa executa o bureau protegido pelo backend.")}
        ${workbenchCard("4. Documento final", "Resumo A4, WhatsApp e armazenamento", "A aba Resumo consolida a documentação pronta para anexar.")}
      </div>
    `;
    return;
  }

  creditWorkbenchStatus.textContent = hasCredit ? "Análise ativa" : "Cadastro carregado";
  creditWorkbenchStatus.dataset.level = hasCredit ? (lastCreditAnalysis.risk_level === "baixo" ? "good" : lastCreditAnalysis.risk_level === "medio" ? "watch" : "risk") : "good";
  creditWorkbench.innerHTML = `
    <article class="credit-workbench-hero">
      <span>Documento atual</span>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(documentLine)}${cityUf ? ` · ${escapeHtml(cityUf)}` : ""}</p>
      <div class="credit-workbench-badges">
        ${hasPayload ? `<span class="source-pill">${escapeHtml(lastPayload.fonte || dados.fonte_consulta || "Cadastro público")}</span>` : ""}
        ${hasCredit ? `<span class="pill">${escapeHtml(lastCreditAnalysis.risk_label)} · ${escapeHtml(lastCreditAnalysis.decision)}</span>` : `<span class="source-pill">Sem bureau executado</span>`}
        ${internal ? `<span class="source-pill">GEST ${escapeHtml(internal.parecer?.nivel || "interno")}</span>` : ""}
      </div>
    </article>
    <div class="credit-workbench-grid">
      ${workbenchMetric("Cadastro", hasPayload ? "Carregado" : "Pendente", hasPayload ? `${companyAgeYears(dados.data_inicio_atividade)} ano(s) · ${formatCnae(dados) || "CNAE não informado"}` : "Consulte um documento para carregar os dados base.")}
      ${workbenchMetric("Histórico interno", internal ? "Disponível" : "Pendente", historyStage)}
      ${workbenchMetric("Bureau", hasCredit ? "Executado" : "A executar", bureauStage)}
      ${workbenchMetric("Resumo A4", hasPayload || hasCredit ? "Pronto" : "Pendente", hasCredit ? approval.label : "Ficha pronta após a consulta cadastral.")}
    </div>
    <div class="credit-workbench-grid credit-workbench-grid--analysis">
      ${workbenchMetric("Score final", hasCredit ? lastCreditAnalysis.score_final : "-", hasCredit ? `Provider ${lastCreditAnalysis.provider}` : "Será preenchido após executar o bureau.")}
      ${workbenchMetric("Limite sugerido", hasCredit ? formatMoney(lastCreditAnalysis.recommended_limit) : "-", hasCredit ? lastCreditAnalysis.recommendation : "Use o bureau para gerar limite e recomendação.")}
      ${workbenchMetric("Risco interno", internal ? `${internal.indicadores?.score_interno ?? "-"} pts` : "-", internal ? internal.parecer?.opiniao || "" : "Disponível apenas para clientes cadastrados no GEST.")}
      ${workbenchMetric("Ação sugerida", hasCredit ? approval.label : (analysis?.label || "Aguardando análise"), hasCredit ? (lastCreditAnalysis.reasons || []).slice(0, 1).join(" ") : (analysis?.items?.[0]?.text || "Após consultar, o app cruza cadastro, histórico e bureau."))}
    </div>
  `;
}

function workbenchCard(title, subtitle, text) {
  return `
    <article class="workbench-card">
      <span>${escapeHtml(subtitle)}</span>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(text)}</p>
    </article>
  `;
}

function workbenchMetric(label, value, detail) {
  return `
    <article class="workbench-metric">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(String(value || "-"))}</strong>
      <p>${escapeHtml(detail || "")}</p>
    </article>
  `;
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
  const lastName = last.razao_social || last.nome_fantasia || lastCreditSubjectName || "Nenhuma";
  const creditLabel = lastCreditAnalysis ? lastCreditAnalysis.risk_label : "Sem análise";
  const creditLimit = lastCreditAnalysis ? formatMoney(lastCreditAnalysis.recommended_limit) : "R$ 0,00";
  const cnpjCreditCount = creditHistory.filter((item) => item.documentType === "CNPJ").length;
  const cpfCreditCount = creditHistory.filter((item) => item.documentType === "CPF").length;
  const totalSearches = history.length + creditHistory.length;
  const totalCredit = creditHistory.length;
  const riskStats = buildRiskStats(creditHistory);
  const approvalStats = buildApprovalStats(creditHistory);
  const recentItems = buildRecentDashboardItems();

  dashboardBox.innerHTML = `
    <article>
      <span>Pesquisas totais</span>
      <strong>${totalSearches}</strong>
      <p>${history.length} CNPJ cadastral · ${cnpjCreditCount} CNPJ crédito · ${cpfCreditCount} CPF crédito.</p>
    </article>
    <article>
      <span>Última empresa</span>
      <strong>${escapeHtml(lastName)}</strong>
      <p>${escapeHtml([last.municipio, last.uf].filter(Boolean).join(" - ") || (lastCreditAnalysis ? formatDocument(lastCreditAnalysis.document) : "Aguardando consulta cadastral."))}</p>
    </article>
    <article>
      <span>Risco consolidado</span>
      <strong>${escapeHtml(creditLabel)}</strong>
      <p>Limite sugerido: ${escapeHtml(creditLimit)}.</p>
    </article>
    <article class="dashboard-chart-card">
      <span>Buscas por tipo</span>
      ${renderSearchChart(history.length, cnpjCreditCount, cpfCreditCount)}
    </article>
    <article>
      <span>Faixas de risco</span>
      <strong>${totalCredit || 0}</strong>
      <p>${riskStats.summary}</p>
    </article>
    <article>
      <span>Aprovação sugerida</span>
      <strong>${approvalStats.approvarPercent}%</strong>
      <p>${approvalStats.summary}</p>
    </article>
  `;

  if (dashboardStrip) {
    dashboardStrip.innerHTML = `
      <article class="dashboard-strip-card">
        <span>Cenário da banca</span>
        <strong>${totalCredit ? `${riskStats.baixoPercent}% baixo risco` : "Sem carteira analisada"}</strong>
        <p>${totalCredit ? `A carteira atual concentra ${riskStats.altoCriticoPercent}% em risco alto/crítico e ${approvalStats.revisaoPercent}% em revisão ou garantia.` : "Execute análises de crédito para formar a visão consolidada da mesa."}</p>
      </article>
      <article class="dashboard-strip-card">
        <span>Distribuição de risco</span>
        ${renderDashboardRiskBars(riskStats)}
      </article>
      <article class="dashboard-strip-card">
        <span>Leitura de aprovação</span>
        ${renderDashboardApprovalBars(approvalStats)}
      </article>
    `;
  }

  if (dashboardRecent) {
    dashboardRecent.innerHTML = `
      <div class="dashboard-recent-header">
        <h3>Últimos clientes e documentos analisados</h3>
        <p>Leitura rápida para retomada das análises e acompanhamento da carteira.</p>
      </div>
      <div class="dashboard-recent-list">
        ${recentItems.length ? recentItems.map((item) => `
          <article class="recent-dashboard-card">
            <div>
              <span>${escapeHtml(item.kind)}</span>
              <strong>${escapeHtml(item.title)}</strong>
              <p>${escapeHtml(item.subtitle)}</p>
            </div>
            <div class="recent-dashboard-meta">
              <small>${escapeHtml(item.status)}</small>
              <small>${escapeHtml(item.time)}</small>
            </div>
          </article>
        `).join("") : `
          <article class="recent-dashboard-card muted-card">
            <div>
              <span>Sem movimentação</span>
              <strong>Nenhuma análise recente</strong>
              <p>As últimas consultas de CNPJ e CPF aparecerão aqui com o resumo operacional.</p>
            </div>
          </article>
        `}
      </div>
    `;
  }
}

function buildRiskStats(items) {
  const stats = { baixo: 0, medio: 0, alto: 0, critico: 0, total: items.length };
  items.forEach((item) => {
    const key = item?.data?.risk_level || "";
    if (key in stats) {
      stats[key] += 1;
    }
  });
  const total = Math.max(1, stats.total);
  stats.baixoPercent = Math.round((stats.baixo / total) * 100);
  stats.medioPercent = Math.round((stats.medio / total) * 100);
  stats.altoPercent = Math.round((stats.alto / total) * 100);
  stats.criticoPercent = Math.round((stats.critico / total) * 100);
  stats.altoCriticoPercent = Math.round(((stats.alto + stats.critico) / total) * 100);
  stats.summary = stats.total
    ? `${stats.baixo} baixo · ${stats.medio} médio · ${stats.alto} alto · ${stats.critico} crítico`
    : "Sem análises de crédito registradas";
  return stats;
}

function buildApprovalStats(items) {
  const stats = {
    aprovar: 0,
    garantia: 0,
    revisar: 0,
    negar: 0,
    total: items.length,
  };
  items.forEach((item) => {
    const decision = normalizeText(item?.data?.decision || "");
    if (decision.includes("garantia")) {
      stats.garantia += 1;
    } else if (decision.includes("negar")) {
      stats.negar += 1;
    } else if (decision.includes("revis")) {
      stats.revisar += 1;
    } else if (decision.includes("aprovar")) {
      stats.aprovar += 1;
    }
  });
  const total = Math.max(1, stats.total);
  stats.aprovarPercent = Math.round((stats.aprovar / total) * 100);
  stats.garantiaPercent = Math.round((stats.garantia / total) * 100);
  stats.revisaoPercent = Math.round(((stats.garantia + stats.revisar) / total) * 100);
  stats.negarPercent = Math.round((stats.negar / total) * 100);
  stats.summary = stats.total
    ? `${stats.aprovar} aprovar · ${stats.garantia} com garantia · ${stats.revisar} revisar · ${stats.negar} negar`
    : "Sem decisões assistidas registradas";
  return stats;
}

function buildRecentDashboardItems() {
  const recentCnpj = history.map((item) => ({
    kind: "CNPJ cadastral",
    title: item.razaoSocial || item.nomeFantasia || item.cnpj,
    subtitle: [item.cnpj, item.cidade].filter(Boolean).join(" · "),
    status: item.fonte || "Cadastro público",
    time: formatDateTime(item.savedAt || item.timestamp || item.createdAt || ""),
    order: new Date(item.savedAt || item.timestamp || item.createdAt || 0).getTime(),
  }));

  const recentCredit = creditHistory.map((item) => ({
    kind: item.documentType === "CPF" ? "CPF crédito" : "CNPJ crédito",
    title: item.name || formatDocument(item.document),
    subtitle: [formatDocument(item.document), item.data?.risk_label, formatMoney(item.data?.recommended_limit)].filter(Boolean).join(" · "),
    status: item.data?.decision || item.data?.provider || "Crédito",
    time: formatDateTime(item.createdAt || ""),
    order: new Date(item.createdAt || 0).getTime(),
  }));

  return [...recentCredit, ...recentCnpj]
    .sort((a, b) => b.order - a.order)
    .slice(0, 6);
}

function renderDashboardRiskBars(stats) {
  const bars = [
    ["Baixo", stats.baixoPercent, "#11795f"],
    ["Médio", stats.medioPercent, "#d39400"],
    ["Alto", stats.altoPercent, "#e67e22"],
    ["Crítico", stats.criticoPercent, "#b42318"],
  ];
  return `
    <div class="mini-chart">
      ${bars.map(([label, value, color]) => `
        <div class="mini-chart-row">
          <small>${escapeHtml(label)}</small>
          <div><span style="width:${Math.max(value, value ? 8 : 0)}%; background:${color}"></span></div>
          <strong>${value}%</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function renderDashboardApprovalBars(stats) {
  const bars = [
    ["Aprovar", stats.aprovarPercent, "#11795f"],
    ["Garantia", stats.garantiaPercent, "#0b84ff"],
    ["Revisar", Math.max(0, stats.revisaoPercent - stats.garantiaPercent), "#d39400"],
    ["Negar", stats.negarPercent, "#b42318"],
  ];
  return `
    <div class="mini-chart">
      ${bars.map(([label, value, color]) => `
        <div class="mini-chart-row">
          <small>${escapeHtml(label)}</small>
          <div><span style="width:${Math.max(value, value ? 8 : 0)}%; background:${color}"></span></div>
          <strong>${value}%</strong>
        </div>
      `).join("")}
    </div>
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
    <article class="credit-hero-card decision-card-soft">
      <span>Crédito forte</span>
      <h3>Nenhum documento preparado</h3>
      <p>Consulte um CNPJ ou informe um CPF para abrir a análise de bureau. O módulo usa backend protegido e pode operar em mock, Serasa, Boa Vista ou Quod.</p>
      <strong>Fluxo sugerido: Consulta CPF/CNPJ → Resultado → Crédito Serasa → Resumo A4</strong>
    </article>
  `;
  renderCreditWorkbench();
}

function renderSerasaPremiumEmpty() {
  lastSerasaPremiumAnalysis = null;
  if (serasaPremiumDocument) serasaPremiumDocument.value = "";
  if (serasaPremiumPassword) serasaPremiumPassword.value = "";
  if (serasaPremiumPrint) serasaPremiumPrint.disabled = true;
  if (serasaPremiumStatus) {
    serasaPremiumStatus.textContent = "Protegido";
    serasaPremiumStatus.dataset.level = "watch";
  }
  if (serasaPremiumBoard) {
    serasaPremiumBoard.innerHTML = `
      <article class="credit-hero-card decision-card-soft">
        <span>Serasa Premium</span>
        <h3>Serviços pagos com validação</h3>
        <p>Use esta área para SCC Check e outros produtos pagos, com usuário autorizado e senha de validação antes de consultar.</p>
        <strong>Fluxo sugerido: Admin → credenciais Serasa → permissão do usuário → senha de validação → consulta premium</strong>
      </article>
    `;
  }
  setSerasaPremiumReadyState();
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
  const cityUf = [dados.municipio, dados.uf].filter(Boolean).join(" - ") || "Cidade/UF não informadas";
  const porte = dados.porte || "Porte não informado";
  const status = (dados.descricao_situacao_cadastral || dados.situacao_cadastral || "Situação não informada").toUpperCase();
  const abertura = formatDate(dados.data_inicio_atividade || dados.data_situacao_cadastral || "");
  const capital = formatMoney(dados.capital_social || 0);
  const qsaTotal = Array.isArray(dados.qsa) ? dados.qsa.length : 0;
  const cnae = [dados.cnae_fiscal, dados.cnae_fiscal_descricao].filter(Boolean).join(" - ") || "CNAE principal não informado";
  const internalFlag = lastInternalHistory?.cliente_cadastrado ? "Cliente com histórico GEST disponível" : "Sem histórico interno carregado";
  serasaStatus.textContent = "Pronto";
  serasaStatus.dataset.level = "good";
  serasaPrint.disabled = false;
  serasaBoard.innerHTML = `
    <article class="credit-hero-card credit-ready-card">
      <span>Documento carregado</span>
      <h3>${escapeHtml(dados.razao_social || "Empresa selecionada")}</h3>
      <strong>${escapeHtml(payload.cnpj_formatado || formatCnpj(dados.cnpj || ""))}</strong>
      <p>O cadastro já está pronto para impressão A4. Execute a análise forte quando quiser somar bureau, restrições, score e decisão assistida.</p>
    </article>
    <article class="credit-score-card">
      <span>Status cadastral</span>
      <strong>${escapeHtml(status)}</strong>
      <small>${escapeHtml(cityUf)}</small>
    </article>
    <article class="credit-score-card">
      <span>Abertura</span>
      <strong>${escapeHtml(abertura || "Não informada")}</strong>
      <small>${escapeHtml(porte)}</small>
    </article>
    <article class="credit-score-card">
      <span>Capital social</span>
      <strong>${escapeHtml(capital)}</strong>
      <small>${escapeHtml(internalFlag)}</small>
    </article>
    <dl class="serasa-details">
      ${row("CNPJ", payload.cnpj_formatado || formatCnpj(dados.cnpj || ""))}
      ${row("Razão social", dados.razao_social || "-")}
      ${row("Cidade / UF", cityUf)}
      ${row("Porte", porte)}
      ${row("Capital social", capital)}
      ${row("CNAE principal", cnae)}
      ${row("Sócios / QSA", qsaTotal || 0)}
      ${row("Resumo A4", "Disponível agora")}
      ${row("Crédito forte", "Execute a análise para bureau e decisão")}
    </dl>
    <article class="decision-card decision-card-soft">
      <h3>Próximo passo sugerido</h3>
      <ul>
        <li>Use "Imprimir resumo A4" para anexar a ficha cadastral imediatamente.</li>
        <li>Use "Executar análise" quando precisar score, protestos, dívidas e limite sugerido.</li>
        <li>Se houver histórico no GEST, o resumo já combinará os dados internos na impressão.</li>
      </ul>
    </article>
  `;
}

function renderSerasaResult(data, isMock) {
  serasaStatus.textContent = isMock ? "Mock/Sandbox" : "Serasa";
  serasaStatus.dataset.level = data.risk_level === "baixo" ? "good" : data.risk_level === "medio" ? "watch" : "risk";
  const isCpf = data.document_type === "CPF";
  const companyName = lastPayload?.dados?.razao_social || lastPayload?.dados?.nome_fantasia || "";
  const headline = isCpf
    ? (lastCreditSubjectName && lastCreditSubjectName !== "Titular do CPF" ? lastCreditSubjectName : "CPF analisado")
    : companyName || formatDocument(data.document);
  serasaBoard.innerHTML = `
    <article class="credit-hero-card ${isMock ? "mock-warning-card" : ""}">
      <span>${escapeHtml(data.document_type || "Documento")} analisado</span>
      <h3>${escapeHtml(headline)}</h3>
      <strong>${escapeHtml(formatDocument(data.document))}</strong>
      ${!isCpf && companyName ? `<small>${escapeHtml([lastPayload?.dados?.municipio, lastPayload?.dados?.uf].filter(Boolean).join(" - ") || "Cadastro público carregado")}</small>` : ""}
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
      ${isCpf ? row("Nome informado", lastCreditSubjectName || "-") : ""}
      ${row("Provider", data.provider)}
    </dl>
    <article class="decision-card">
      <h3>Motivos da decisão</h3>
      <ul>
        ${(data.reasons || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </article>
  `;
  renderCreditWorkbench();
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
  renderCreditWorkbench();
}

function renderSerasaPremiumResult(data, isMock, product) {
  serasaPremiumStatus.textContent = isMock ? "Mock/Sandbox" : "Premium";
  serasaPremiumStatus.dataset.level = data.risk_level === "baixo" ? "good" : data.risk_level === "medio" ? "watch" : "risk";
  const subjectName = lastCreditSubjectName || serasaPremiumSubjectName?.value?.trim() || formatDocument(data.document || "");
  serasaPremiumBoard.innerHTML = `
      <article class="credit-result-board premium-result-board">
        <div class="credit-result-header">
          <div>
            <strong>${escapeHtml(product || "Serviço premium")}</strong>
            <h3>${escapeHtml(subjectName)}</h3>
            <small>${escapeHtml(formatDocument(data.document || ""))}</small>
            <p>${isMock ? "Modo sandbox/mock ativo. Para produção, mantenha o layout do produto contratado configurado no backend." : "Consulta retornada pelo serviço pago configurado no backend."}</p>
          </div>
          <div class="credit-score-card">
            <span>Score premium</span>
            <strong>${escapeHtml(data.score_serasa)}</strong>
        </div>
      </div>
      <dl class="serasa-details">
        ${row("Produto", product || "SCC_CHECK")}
        ${row("Provider", data.provider)}
        ${row("Risco final", data.risk_label)}
        ${row("Decisão", data.decision)}
        ${row("Limite sugerido", formatMoney(data.recommended_limit || 0))}
        ${row("Restrições", data.restricoes_financeiras)}
        ${row("Protestos", data.protestos)}
        ${row("Dívidas", data.dividas_vencidas)}
        ${row("Pendências", data.pendencias_comerciais)}
        ${row("Ações judiciais", data.acoes_judiciais)}
      </dl>
      <div class="decision-box">
        <strong>Motivos da decisão</strong>
        <ul>${(data.reasons || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </div>
    </article>
  `;
  showStatus(
    isMock
      ? "Serviço premium executado em modo sandbox/mock. Nenhum crédito real da Serasa foi consumido."
      : "Serviço premium executado com retorno do provedor configurado.",
    "success",
  );
}

function renderSerasaPremiumError(message) {
  lastSerasaPremiumAnalysis = null;
  serasaPremiumStatus.textContent = "Protegido";
  serasaPremiumStatus.dataset.level = "risk";
  serasaPremiumBoard.innerHTML = `
    <article class="credit-error">
      <h3>Serviço pago indisponível</h3>
      <p>${escapeHtml(message)}</p>
      <strong>Confira permissão do usuário, senha de validação e o layout do produto SCC Check contratado.</strong>
    </article>
  `;
  showStatus(message, "error");
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

  const title = dados.razao_social || dados.nome_fantasia || lastCreditSubjectName || "Documento analisado";
  const documentLine = lastPayload?.cnpj_formatado || formatDocument(lastCreditAnalysis?.document || "");
  summaryPreviewBox.innerHTML = `
    <article class="print-preview-card">
      <header>
        <img src="/assets/logo-scriptt.png" alt="Scriptt">
        <div>
          <span>Relatório executivo</span>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(documentLine)}${cityUf ? ` · ${escapeHtml(cityUf)}` : ""}</p>
        </div>
      </header>
      <div class="preview-grid">
        ${previewCell("Situação", dados.descricao_situacao_cadastral || lastCreditAnalysis?.situacao_cadastral || "-")}
        ${previewCell("Tipo", lastPayload ? "CNPJ" : lastCreditAnalysis?.document_type || "-")}
        ${!lastPayload ? previewCell("Nome informado", lastCreditSubjectName || "-") : ""}
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
        ${row("Bureau ativo", (payload.feature_flags?.bureau_provider || "mock").toUpperCase())}
        ${row("Modo do bureau", payload.feature_flags?.bureau_mock ? "Mock/Sandbox" : "Produção")}
        ${row("Serasa Premium", payload.feature_flags?.serasa_premium_enabled ? "Habilitado" : "Desligado")}
        ${row("SCC Check", payload.feature_flags?.allow_scc_check ? "Habilitado" : "Desligado")}
        ${row("Senha de validação", payload.feature_flags?.has_validation_password ? "Configurada" : "Pendente")}
        ${row("Limite carteira", payload.feature_flags?.portfolio_limit || 0)}
        ${row("Armazenamento", storageModeLabel(adminSettings.storageMode))}
        ${row("Pasta padrão", adminSettings.storagePath || "Não configurada")}
        ${row("Nuvem", storageCloudLabel(adminSettings.storageCloud))}
      </dl>
    </article>
    <article>
      <h3>Checklist Serasa</h3>
      ${renderSerasaChecklist()}
    </article>
    <article>
      <h3>Usuários cadastrados</h3>
      ${renderAdminUsers()}
    </article>
  `;
}

function checklistItem(label, ok, detail) {
  return `
    <li class="${ok ? "ok" : "pending"}">
      <strong>${escapeHtml(label)}</strong>
      <span>${escapeHtml(detail)}</span>
    </li>
  `;
}

function renderSerasaChecklist() {
  const provider = bureauSettings.provider || "mock";
  const environment = bureauSettings.environment || "sandbox";
  const serasa = bureauSettings.providers?.serasa || {};
  const features = bureauSettings.features || {};
  const security = bureauSettings.security || {};
  const sandboxItems = [
    {
      label: "Área Serasa Premium",
      ok: Boolean(features.serasa_premium_enabled),
      detail: features.serasa_premium_enabled ? "Habilitada para uso no app." : "Ainda não habilitada no Admin.",
    },
    {
      label: "SCC Check",
      ok: Boolean(features.allow_scc_check),
      detail: features.allow_scc_check ? "Produto liberado para os usuários autorizados." : "Produto ainda desabilitado.",
    },
    {
      label: "Senha premium",
      ok: Boolean(security.has_validation_password),
      detail: security.has_validation_password ? "Senha de validação já cadastrada." : "Defina a senha de validação premium.",
    },
    {
      label: "Modo atual",
      ok: environment === "sandbox",
      detail: environment === "sandbox" ? "Seguro para testes sem consumo real." : "Hoje o ambiente está marcado como produção.",
    },
  ];
  const productionItems = [
    {
      label: "Provider ativo",
      ok: provider === "serasa",
      detail: provider === "serasa" ? "A aplicação está apontada para Serasa." : `Hoje o provider ativo é ${String(provider).toUpperCase()}.`,
    },
    {
      label: "Base URL",
      ok: Boolean((serasa.base_url || "").trim()),
      detail: (serasa.base_url || "").trim() ? serasa.base_url : "Informe a URL oficial de homologação/produção da Serasa.",
    },
    {
      label: "Autenticação",
      ok: Boolean((serasa.auth_mode || "").trim()),
      detail: (serasa.auth_mode || "").trim() ? `Modo definido: ${serasa.auth_mode}.` : "Escolha OAuth ou logon + senha.",
    },
    {
      label: "Credencial principal",
      ok: serasa.auth_mode === "oauth"
        ? Boolean((serasa.client_id || "").trim()) && Boolean(serasa.has_client_secret)
        : Boolean((serasa.username || "").trim()) && Boolean(serasa.has_password),
      detail: serasa.auth_mode === "oauth"
        ? (serasa.has_client_secret ? "Client ID e secret já cadastrados." : "Falta client ID e/ou client secret.")
        : (serasa.has_password ? "Usuário/logon e senha já cadastrados." : "Falta usuário/logon e/ou senha."),
    },
    {
      label: "Caminho de consulta",
      ok: Boolean((serasa.consult_path || "").trim()),
      detail: (serasa.consult_path || "").trim() ? serasa.consult_path : "Informe o caminho técnico do SCC Check/consulta.",
    },
    {
      label: "Produto padrão",
      ok: Boolean((serasa.product_code || "").trim()),
      detail: (serasa.product_code || "").trim() ? serasa.product_code : "Informe o código técnico do produto contratado.",
    },
  ];
  const productionReady = productionItems.every((item) => item.ok);
  return `
    <div class="serasa-checklist">
      <div class="checklist-summary ${productionReady ? "ready" : "pending"}">
        <strong>${productionReady ? "Pronto para produção" : "Pendente para produção"}</strong>
        <span>${productionReady ? "Os campos mínimos do backend Serasa estão preenchidos." : "Ainda faltam dados técnicos para virar consulta real."}</span>
      </div>
      <div class="checklist-columns">
        <section>
          <h4>Checklist de sandbox</h4>
          <ul>
            ${sandboxItems.map((item) => checklistItem(item.label, item.ok, item.detail)).join("")}
          </ul>
        </section>
        <section>
          <h4>Checklist de produção</h4>
          <ul>
            ${productionItems.map((item) => checklistItem(item.label, item.ok, item.detail)).join("")}
          </ul>
        </section>
      </div>
    </div>
  `;
}

function renderAdminUsers() {
  if (!adminUsers.length) {
    return `<p class="muted">Nenhum usuário local cadastrado.</p>`;
  }
  return `
    <table>
      <thead><tr><th>Nome</th><th>Login</th><th>Perfil</th><th>Permissões</th><th>Status</th></tr></thead>
      <tbody>
        ${adminUsers.map((user) => `
          <tr>
            <td>${escapeHtml(user.name)}</td>
            <td>${escapeHtml(user.email)}</td>
            <td>${escapeHtml(user.role)}</td>
            <td>${escapeHtml((user.permissions || defaultPermissionsForRole(user.role)).join(", "))}</td>
            <td>${escapeHtml(user.status)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

async function addAdminUser() {
  clearAdminUserFeedback();
  const user = {
    name: adminUserName.value.trim(),
    email: adminUserEmail.value.trim(),
    role: adminUserRole.value,
    permissions: selectedPermissions(),
    status: adminUserStatus.value,
    password: adminUserPassword?.value || "",
  };
  const passwordConfirm = adminUserPasswordConfirm?.value || "";
  const existingUser = adminUsers.find((item) => String(item.email || "").trim().toLowerCase() === user.email.toLowerCase());
  if (!user.name) {
    setAdminUserFeedback("Informe o nome do usuário para cadastrar.", "error", "Campo obrigatório");
    adminUserName?.focus();
    return;
  }
  if (!user.email) {
    setAdminUserFeedback("Informe o e-mail/login do usuário.", "error", "Campo obrigatório");
    adminUserEmail?.focus();
    return;
  }
  if (!existingUser && !user.password) {
    setAdminUserFeedback("Informe uma senha inicial para o novo usuário.", "error", "Senha obrigatória");
    adminUserPassword?.focus();
    return;
  }
  if (user.password && user.password.length < 8) {
    setAdminUserFeedback("A senha precisa ter pelo menos 8 caracteres.", "error", "Senha inválida");
    adminUserPassword?.focus();
    return;
  }
  if (user.password && !passwordConfirm) {
    setAdminUserFeedback("Confirme a senha digitada para continuar.", "error", "Confirmação obrigatória");
    adminUserPasswordConfirm?.focus();
    return;
  }
  if (user.password && user.password !== passwordConfirm) {
    setAdminUserFeedback("A confirmação da senha não confere.", "error", "Senhas diferentes");
    adminUserPasswordConfirm?.focus();
    return;
  }
  try {
    const response = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const payload = await response.json();
    if (!response.ok || !payload.ok) {
      setAdminUserFeedback(payload.erro || "Não foi possível salvar o usuário.", "error", "Cadastro não realizado");
      return;
    }
    adminUsers = payload.users || [];
    adminForm.reset();
    setPermissionInputs(adminUserRole.value || "Analista");
    loadAdminPanel();
    renderDashboard();
    setAdminUserFeedback("Usuário salvo com sucesso. No primeiro acesso ele deverá trocar a senha com confirmação.", "success", "Cadastro concluído");
    showStatus("Usuário salvo com sucesso.", "success");
  } catch {
    setAdminUserFeedback("Falha ao salvar o usuário no backend.", "error", "Erro de comunicação");
  }
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
      <span>Informe um CNPJ ou CPF valido para iniciar a analise.</span>
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
    lastCreditSubjectName ? `Nome informado: ${lastCreditSubjectName}` : "",
    `Documento: ${formatDocument(credit.document)}`,
    `Tipo: ${credit.document_type || "Documento"}`,
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
  const company = dados.razao_social || dados.nome_fantasia || lastCreditSubjectName || "Documento analisado";
  const documentLabel = formatDocument(credit.document || serasaDocument.value);
  const approval = approvalLevel(credit);
  const internal = lastInternalHistory?.cliente_cadastrado ? lastInternalHistory : null;
  const guidance = buildDecisionGuidance(credit, internal);
  const checklist = buildValidationChecklist({ dados }, credit, internal, []);
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
          @page { size: A4 portrait; margin: 7mm; }
          * { box-sizing: border-box; }
          html, body { height: 100%; }
          body { color: #15202b; font-family: Arial, sans-serif; font-size: 9px; line-height: 1.24; margin: 0; }
          main { min-height: 281mm; display: grid; grid-template-rows: auto auto auto 1fr auto; gap: 5px; }
          header { align-items: center; border-bottom: 2px solid #0b84ff; display: flex; gap: 10px; padding-bottom: 7px; }
          img { background: #10253b; border-radius: 8px; height: 42px; object-fit: contain; padding: 5px; width: 94px; }
          h1 { font-size: 16px; margin: 0; }
          h2 { color: #075fb9; font-size: 9px; margin: 5px 0 4px; text-transform: uppercase; }
          p { margin: 0; }
          .hero { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 5px; }
          .kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; }
          .card, .panel { border: 1px solid #d7e0e8; border-radius: 7px; padding: 6px; background: #fff; }
          .card span, .panel span, dt { color: #617181; display: block; font-size: 6.8px; font-weight: 800; text-transform: uppercase; }
          .card strong { display: block; font-size: 16px; margin-top: 2px; }
          .hero-title { display: grid; gap: 3px; }
          .hero-title strong { font-size: 19px; line-height: 1.05; }
          .pill { display: inline-flex; align-self: start; width: fit-content; border-radius: 999px; padding: 4px 8px; font-size: 8px; font-weight: 800; background: ${credit.risk_level === "baixo" ? "#e9f8f1" : credit.risk_level === "medio" ? "#fff6df" : "#fff0ee"}; color: ${credit.risk_level === "baixo" ? "#11795f" : credit.risk_level === "medio" ? "#b77900" : "#c43d2f"}; }
          .hero-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px; }
          dl { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; margin: 0; }
          dl div { border: 1px solid #d7e0e8; border-radius: 7px; padding: 5px; min-height: 41px; }
          dd { margin: 2px 0 0; overflow-wrap: anywhere; }
          ul { margin: 0; padding-left: 14px; }
          li { margin-bottom: 2px; }
          .meter { height: 9px; border-radius: 999px; background: #e8edf2; overflow: hidden; }
          .meter span { display: block; height: 100%; background: linear-gradient(90deg, #dc2626, #f59e0b, #11795f); width: ${Math.min(100, Math.max(0, Number(credit.score_final || 0) / 10))}%; }
          .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; }
          .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; }
          .mini { color: #617181; font-size: 7.4px; }
          .section-fill { display: grid; gap: 5px; align-content: start; }
          footer { border-top: 1px solid #d7e0e8; color: #617181; font-size: 7.4px; padding-top: 4px; }
        </style>
      </head>
      <body>
        <main>
          <header>
            <img src="${location.origin}/assets/logo-scriptt.png" alt="Scriptt">
            <div>
              <h1>Relatório robusto de CPF/CNPJ e crédito</h1>
              <p>${escapeHtml(company)} · ${escapeHtml(documentLabel)} · Desenvolvido por Scriptt</p>
            </div>
          </header>
          <section class="hero">
            <article class="panel hero-title">
              <span>Documento analisado</span>
              <strong>${escapeHtml(company)}</strong>
              <p>${escapeHtml(documentLabel)} · ${escapeHtml(credit.document_type || "Documento")} · Provider ${escapeHtml(credit.provider)}</p>
              <div class="pill">${escapeHtml(credit.risk_label)} · ${escapeHtml(credit.decision)}</div>
              <p class="mini">${escapeHtml(credit.recommendation)}</p>
            </article>
            <article class="panel section-fill">
              <span>Nível de aprovação</span>
              <strong style="font-size:18px">${escapeHtml(approval.label)}</strong>
              <div class="meter"><span></span></div>
              <div class="hero-grid">
                <div class="card"><span>Score bureau</span><strong>${escapeHtml(credit.score_serasa)}</strong></div>
                <div class="card"><span>Score final</span><strong>${escapeHtml(credit.score_final)}</strong></div>
                <div class="card"><span>Limite</span><strong>${formatMoney(credit.recommended_limit)}</strong></div>
                <div class="card"><span>Inadimplência</span><strong>${escapeHtml(`${credit.probabilidade_inadimplencia}%`)}</strong></div>
              </div>
            </article>
          </section>
          <section class="grid-2">
            <article class="panel section-fill">
              <h2>Painel de risco</h2>
              <dl>
                ${reportRow("Restrições", credit.restricoes_financeiras)}
                ${reportRow("Protestos", credit.protestos)}
                ${reportRow("Dívidas vencidas", credit.dividas_vencidas)}
                ${reportRow("Pendências", credit.pendencias_comerciais)}
                ${reportRow("Ações judiciais", credit.acoes_judiciais)}
                ${reportRow("Situação cadastral", credit.situacao_cadastral)}
                ${reportRow("Ambiente", credit.environment || "sandbox")}
                ${reportRow("Documento", documentLabel)}
              </dl>
            </article>
            <article class="panel section-fill">
              <h2>Orientação executiva</h2>
              <ul>${guidance.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </article>
          </section>
          <section class="grid-2">
            <article class="panel section-fill">
              <h2>Motivos da decisão</h2>
              <ul>${(credit.reasons || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </article>
            <article class="panel section-fill">
              <h2>Checklist de validação</h2>
              <ul>${checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </article>
          </section>
          ${internal ? `
            <section class="panel section-fill">
              <h2>Histórico interno complementar</h2>
              <div class="grid-3">
                <div class="card"><span>Compras</span><strong>${escapeHtml(String(internal.compras?.documentos_total || 0))}</strong><p class="mini">${escapeHtml(formatMoney(internal.compras?.valor_total))}</p></div>
                <div class="card"><span>Atraso médio</span><strong>${escapeHtml(String(internal.indicadores?.atraso_medio_dias || 0))}d</strong><p class="mini">Pontualidade ${escapeHtml(String(internal.indicadores?.pontualidade_percentual || 0))}%</p></div>
                <div class="card"><span>Score interno</span><strong>${escapeHtml(String(internal.indicadores?.score_interno ?? "-"))}</strong><p class="mini">${escapeHtml(internal.parecer?.titulo || "Histórico GEST")}</p></div>
              </div>
            </section>
          ` : ""}
          <footer>Documento A4 robusto para apoio à validação cadastral, análise de crédito e definição de limite. Dados de bureau, cadastro e histórico interno devem ser confirmados conforme a política comercial vigente.</footer>
          <script>window.print();</script>
        </main>
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
  const guidance = buildDecisionGuidance(credit, internal);
  const checklist = buildValidationChecklist(payload, credit, internal, refs);
  const riskSnapshot = buildRiskSnapshot(credit, internal, analysis);
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
          body { color: #17202a; font-family: Arial, sans-serif; font-size: 8.6px; line-height: 1.18; margin: 0; }
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
          .page { min-height: 285mm; width: 198mm; display: grid; align-content: start; gap: 4px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
          .hero { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 4px; }
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
          .risk-cross .card { margin-top: 0; }
          .internal-box { border: 1px solid #d7dee5; border-radius: 5px; margin-top: 4px; padding: 4px; }
          .internal-box strong { display: block; font-size: 8px; margin-bottom: 2px; }
          .activity-list { display: grid; grid-template-columns: 1fr 1fr; gap: 2px 4px; margin: 0; padding: 0; list-style: none; }
          .activity-list li { border: 1px solid #d7dee5; border-radius: 4px; padding: 2px 3px; }
          .avoid-break { break-inside: avoid; page-break-inside: avoid; }
          .hero .card { margin-top: 0; }
          .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; }
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
          <section class="hero avoid-break">
            <div class="card">
              <span>Visão executiva</span>
              <strong>${escapeHtml(dados.razao_social || dados.nome_fantasia || "Empresa não informada")}</strong>
              <p>${escapeHtml(payload.cnpj_formatado || formatCnpj(dados.cnpj))} · ${escapeHtml(cityUf || "Cidade/UF não informadas")} · ${escapeHtml(dados.descricao_situacao_cadastral || "-")}</p>
              <p class="minor">Natureza: ${escapeHtml(dados.natureza_juridica || "-")} · Porte: ${escapeHtml(dados.porte || "-")} · Abertura: ${escapeHtml(formatDate(dados.data_inicio_atividade) || "-")}</p>
              <p class="minor">Capital social: ${escapeHtml(formatMoney(dados.capital_social))} · CNAE principal: ${escapeHtml(formatCnae(dados))}</p>
            </div>
            <div class="card">
              <span>Semáforo de aprovação</span>
              <strong>${escapeHtml(credit?.risk_label || analysis.label)}</strong>
              <div class="risk-chart" style="margin:3px 0 0">
                <strong>${escapeHtml(approval.label)}</strong>
                <div class="meter"><span></span></div>
                <p class="minor">${escapeHtml(credit?.recommendation || "Concluir validação cadastral, histórico interno e referências antes da liberação.")}</p>
              </div>
            </div>
          </section>
          <section class="kpi-grid avoid-break">
            ${riskSnapshot.map((item) => `<div class="card"><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.value)}</strong><p class="minor">${escapeHtml(item.note)}</p></div>`).join("")}
          </section>
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
                ${analysis.items.slice(0, 5).map((item) => `
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
              ${reportRow("Dívidas vencidas", credit.dividas_vencidas)}
              ${reportRow("Pendências", credit.pendencias_comerciais)}
              ${reportRow("Ações judiciais", credit.acoes_judiciais)}
              ${reportRow("Provider", credit.provider)}
            </dl>
          ` : ""}
          <div class="grid avoid-break">
            <section class="card">
              <span>Checklist de validação</span>
              <ul>${checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </section>
            <section class="card">
              <span>Orientações de decisão</span>
              <ul>${guidance.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </section>
          </div>
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

function buildRiskSnapshot(credit, internal, analysis) {
  return [
    {
      label: "Status",
      value: credit?.risk_label || analysis?.label || "Em validação",
      note: credit?.decision || "Validar dados cadastrais e sinais internos",
    },
    {
      label: "Limite sugerido",
      value: credit ? formatMoney(credit.recommended_limit) : "Em análise",
      note: credit ? `Score ${credit.score_final}` : "Executar bureau para calcular",
    },
    {
      label: "Referências",
      value: String((references[onlyDigits(lastPayload?.cnpj_formatado || lastPayload?.dados?.cnpj || "")] || []).length),
      note: "Comerciais anexadas à ficha",
    },
    {
      label: "Histórico interno",
      value: internal ? String(internal.indicadores?.score_interno ?? "-") : "Sem base",
      note: internal ? `Pontualidade ${internal.indicadores?.pontualidade_percentual || 0}%` : "Cliente fora do CADCLI",
    },
  ];
}

function buildDecisionGuidance(credit, internal) {
  const guidance = [];
  if (!credit) {
    guidance.push("Cadastro pronto para validação documental e impressão.");
    guidance.push("Executar bureau antes de liberar limite em venda a prazo.");
  } else if (credit.risk_level === "baixo") {
    guidance.push("Aprovação favorecida, mantendo monitoramento periódico.");
    guidance.push("Usar o limite sugerido como teto inicial, não como automático definitivo.");
  } else if (credit.risk_level === "medio") {
    guidance.push("Trabalhar com limite reduzido e revisão gerencial em pedidos maiores.");
    guidance.push("Pedir referências, confirmar dados cadastrais e reavaliar recorrência.");
  } else {
    guidance.push("Bloquear aprovação automática e exigir validação humana.");
    guidance.push("Solicitar garantias, entrada ou redução de prazo antes de vender.");
  }
  if (internal?.cliente_cadastrado) {
    guidance.push(`Histórico interno: ${internal.parecer?.opiniao || "usar dados de compras e pagamentos como contrapeso da decisão."}`);
  }
  return guidance.slice(0, 5);
}

function buildValidationChecklist(payload, credit, internal, refs) {
  const dados = payload?.dados || {};
  return [
    dados.razao_social ? "Razão social conferida." : "Confirmar razão social e documento fiscal.",
    dados.logradouro ? "Endereço cadastral disponível." : "Confirmar endereço completo e CEP.",
    Array.isArray(dados.qsa) && dados.qsa.length ? `QSA carregado com ${dados.qsa.length} integrante(s).` : "Validar quadro societário e responsáveis legais.",
    refs.length ? `${refs.length} referência(s) comercial(is) adicionada(s).` : "Adicionar referências comerciais antes da liberação.",
    credit ? `Bureau consultado em ${credit.provider}.` : "Executar bureau para completar score e restrições.",
    internal?.cliente_cadastrado ? "Histórico interno do GEST disponível." : "Sem histórico interno: considerar política mais conservadora.",
  ].slice(0, 6);
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
    credit_subject_name: lastCreditSubjectName,
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
renderSerasaPremiumEmpty();
renderCreditWorkbench();
renderHistory();
renderDashboard();
setPermissionInputs(adminUserRole?.value || "Admin");
setActiveView("dashboard");
showLogin();
bootstrapAuth();
