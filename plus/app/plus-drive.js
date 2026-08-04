/* Punto Smart OS Plus - Google Drive sync
   Guarda SOLO configuración: accesos, orden, categorías, iconos y preferencias.
   No guarda claves, documentos ni datos bancarios. */
(function(){
  const cfg = window.PS_PLUS_CONFIG || {};
  const CLIENT_ID = cfg.GOOGLE_CLIENT_ID || "";
  const COUNTRY = (window.PS_GLOBAL_COUNTRY || "AR").toUpperCase();
  const keys = window.PS_STORAGE_KEYS || {};
  const FILE_NAME = cfg.DRIVE_FILE_NAME || `puntosmart-config-${COUNTRY.toLowerCase()}-v2.json`;
  const SCOPE = cfg.DRIVE_SCOPE || "https://www.googleapis.com/auth/drive.appdata";
  const LS_FILE_ID = keys.fileId || "ps_plus_drive_file_id";
  const LS_LAST_SYNC = keys.lastSync || "ps_plus_last_sync";
  const LS_GROUPS = keys.groups || "ps_groups_state";
  const LS_CONNECTED = keys.connected || "ps_plus_connected";
  const LS_CUSTOM_TILES = keys.custom || "ps_custom_tiles";
  const LS_ACCOUNT = keys.account || "ps_plus_account";
  const DRIVE_WEB_URL = "https://drive.google.com/drive/my-drive";

  let tokenClient = null;
  let accessToken = null;
  let driveFileId = localStorage.getItem(LS_FILE_ID) || "";
  let saveTimer = null;
  let busy = false;
  let accountInfo = readStoredAccount();

  function ready(fn){
    if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  ready(initPlus);

  function initPlus(){
    const wasConnected = !!localStorage.getItem(LS_CONNECTED);
    injectUI();
    patchCoreSaves();
    refreshPlusUI(wasConnected ? "Restaurando conexión con Drive…" : "Plus sin conectar.", wasConnected ? "warn" : "");
    if(wasConnected && isClientConfigured()) restoreDriveSession();
  }

  function injectUI(){
    const status = document.querySelector(".status-zone");
    if(status && !document.getElementById("plusBtn")){
      const btn = document.createElement("button");
      btn.id = "plusBtn";
      btn.className = "status-pill plus-pill";
      btn.innerHTML = `<span class="plus-cloud" aria-hidden="true">☁</span><span><b>Plus</b><small id="plusSmall">Drive</small></span><span id="plusDot" class="plus-dot"></span>`;
      btn.onclick = () => document.getElementById("plusDialog").showModal();
      status.insertBefore(btn, status.lastElementChild || null);
    }

    if(!document.getElementById("plusDialog")){
      const dialog = document.createElement("dialog");
      dialog.id = "plusDialog";
      dialog.className = "modal";
      dialog.innerHTML = `
        <div class="plus-panel">
          <button class="modal-close" id="closePlusBtn">×</button>
          <div class="plus-hero">
            <span class="plus-hero-icon">☁</span>
            <div>
              <h3>Punto Smart OS Plus</h3>
              <p>Tu escritorio guardado en tu propio Google Drive.</p>
            </div>
          </div>
          <div class="plus-account" id="plusAccount" hidden>
            <img id="plusAccountPhoto" alt="" referrerpolicy="no-referrer">
            <div><b id="plusAccountName">Cuenta de Google</b><small id="plusAccountEmail"></small></div>
          </div>
          <div class="plus-status" id="plusStatus">Plus sin conectar.</div>
          <div class="plus-sync-meta"><span id="plusSyncState">Sin conexión</span><span id="plusLastSync">Sin sincronizaciones</span></div>
          <button class="wide-btn primary" id="connectDriveBtn">Entrar con Google Drive</button>
          <div class="plus-actions">
            <button id="saveDriveBtn">Sincronizar ahora</button>
            <button id="loadDriveBtn">Recuperar desde Drive</button>
            <button id="exportConfigBtn">Exportar respaldo</button>
            <button id="importConfigBtn">Importar respaldo</button>
            <button id="openDriveBtn">Abrir mi Google Drive</button>
            <button class="danger" id="disconnectDriveBtn">Desconectar</button>
          </div>
          <input id="plusImportInput" type="file" accept="application/json,.json" hidden>
          <small>Se guarda configuración: accesos, orden, categorías, iconos y preferencias. No se guardan claves ni datos bancarios.</small>
        </div>`;
      document.body.appendChild(dialog);

      closePlusBtn.onclick = () => plusDialog.close();
      connectDriveBtn.onclick = connectDrive;
      saveDriveBtn.onclick = () => requireToken().then(saveNow).catch(showError);
      loadDriveBtn.onclick = () => requireToken().then(loadFromDrive).catch(showError);
      exportConfigBtn.onclick = exportJson;
      importConfigBtn.onclick = () => plusImportInput.click();
      plusImportInput.onchange = importJson;
      openDriveBtn.onclick = () => window.open(DRIVE_WEB_URL,"_blank","noopener");
      disconnectDriveBtn.onclick = disconnectDrive;
    }
  }

  function patchCoreSaves(){
    if(window.__psPlusPatched) return;
    window.__psPlusPatched = true;

    if(typeof window.setCustom === "function"){
      const originalSetCustom = window.setCustom;
      window.setCustom = function(arr){
        originalSetCustom(arr);
        saveGroupsLocal();
        queueCloudSave();
      };
    }

    if(typeof window.swapItems === "function"){
      const originalSwapItems = window.swapItems;
      window.swapItems = function(fromId,toId){
        originalSwapItems(fromId,toId);
        saveGroupsLocal();
        queueCloudSave();
      };
    }

    if(typeof window.moveItemToGroup === "function"){
      const originalMoveItemToGroup = window.moveItemToGroup;
      window.moveItemToGroup = function(fromId,targetGroup,targetId){
        originalMoveItemToGroup(fromId,targetGroup,targetId);
        saveGroupsLocal();
        queueCloudSave();
      };
    }

    window.addEventListener("ps:groupsChanged", function(){
      saveGroupsLocal();
      queueCloudSave();
    });

  }

  function cleanItem(item){
    const name = String(item?.name || "Acceso").trim().slice(0,80) || "Acceso";
    return {
      id: String(item?.id || slugSafe(name)).replace(/[^a-z0-9:_-]/gi,"").slice(0,120),
      name,
      url: typeof normalizeUrl === "function" ? normalizeUrl(item?.url || "#") : "#",
      domain: String(item?.domain || "").replace(/[^a-z0-9.-]/gi,"").slice(0,120),
      dark: !!item.dark,
      fallback: String(item?.fallback || "").slice(0,12),
      icon: typeof safeIconUrl === "function" ? safeIconUrl(item?.icon || "") : ""
    };
  }

  function desktopConfig(){
    const outGroups = {};
    if(typeof groups === "object"){
      Object.keys(groups).forEach(k => outGroups[k] = (groups[k] || []).map(cleanItem));
    }
    let custom = [];
    try{ custom = JSON.parse(localStorage.getItem(LS_CUSTOM_TILES) || "[]"); }catch(e){}
    return {
      product: "Punto Smart OS Plus",
      version: 2,
      country: COUNTRY,
      updatedAt: new Date().toISOString(),
      groups: outGroups,
      custom: Array.isArray(custom) ? custom : []
    };
  }

  function applyConfig(data){
    validateConfig(data);

    if(data.groups && typeof groups === "object"){
      Object.keys(groups).forEach(k => {
        if(Array.isArray(data.groups[k]) && Array.isArray(groups[k])){
          groups[k].length = 0;
          data.groups[k].slice(0,100).forEach(item => groups[k].push(cleanItem(item)));
        }
      });
      saveGroupsLocal();
    }

    if(Array.isArray(data.custom)){
      const custom = data.custom.slice(0,5).map(item => ({
        name:String(item?.name || "Acceso").slice(0,80),
        url:typeof normalizeUrl === "function" ? normalizeUrl(item?.url || "#") : "#",
        icon:typeof safeIconUrl === "function" ? safeIconUrl(item?.icon || "") : ""
      }));
      localStorage.setItem(LS_CUSTOM_TILES, JSON.stringify(custom));
    }

    if(typeof renderAll === "function") renderAll();
    refreshPlusUI("Configuración cargada.");
  }

  function saveGroupsLocal(){
    try{
      if(typeof groups === "object"){
        const obj = {};
        Object.keys(groups).forEach(k => obj[k] = (groups[k] || []).map(cleanItem));
        localStorage.setItem(LS_GROUPS, JSON.stringify({schemaVersion:2,groups:obj}));
      }
    }catch(e){}
  }

  function queueCloudSave(){
    if(!accessToken || !localStorage.getItem(LS_CONNECTED)) return;
    clearTimeout(saveTimer);
    refreshPlusUI("Cambios pendientes de sincronización…","warn");
    saveTimer = setTimeout(() => saveNow().catch(showError), 700);
  }


  function readStoredAccount(){
    try{
      const value = JSON.parse(localStorage.getItem(LS_ACCOUNT) || "null");
      return value && typeof value === "object" ? value : null;
    }catch(e){ return null; }
  }

  async function restoreDriveSession(){
    try{
      await requireToken("");
      localStorage.setItem(LS_CONNECTED,"1");
      await loadAccountInfo();
      refreshPlusUI("Drive conectado.","ok");
    }catch(error){
      accessToken = null;
      refreshPlusUI("La sesión de Google necesita reconexión.","warn");
    }
  }

  async function loadAccountInfo(){
    try{
      const fields = encodeURIComponent("user(displayName,emailAddress,photoLink)");
      const response = await driveFetch(`https://www.googleapis.com/drive/v3/about?fields=${fields}`);
      const data = await response.json();
      if(data && data.user){
        accountInfo = {
          name:String(data.user.displayName || "Cuenta de Google").slice(0,120),
          email:String(data.user.emailAddress || "").slice(0,180),
          photo:String(data.user.photoLink || "").slice(0,500)
        };
        localStorage.setItem(LS_ACCOUNT,JSON.stringify(accountInfo));
      }
    }catch(error){
      console.warn("No se pudo leer la cuenta de Drive.",error);
    }
    refreshPlusUI();
  }

  async function connectDrive(){
    if(!isClientConfigured()){
      refreshPlusUI("Falta configurar GOOGLE_CLIENT_ID en plus-config.js.", "warn");
      return;
    }
    const changingAccount = !!accessToken && !!localStorage.getItem(LS_CONNECTED);
    if(changingAccount){
      accessToken = null;
      tokenClient = null;
      driveFileId = "";
      accountInfo = null;
      localStorage.removeItem(LS_FILE_ID);
      localStorage.removeItem(LS_ACCOUNT);
    }
    await requireToken(changingAccount ? "select_account" : "consent");
    localStorage.setItem(LS_CONNECTED, "1");
    await loadAccountInfo();
    await loadFromDrive();
    refreshPlusUI("Conectado a Drive.", "ok");
  }

  function isClientConfigured(){
    return CLIENT_ID && !CLIENT_ID.includes("PEGAR_CLIENT_ID");
  }

  async function requireToken(promptMode){
    if(accessToken) return accessToken;
    if(!isClientConfigured()) throw new Error("Falta GOOGLE_CLIENT_ID en plus-config.js.");
    await waitForGoogle();
    return new Promise((resolve,reject) => {
      tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPE,
        callback: resp => {
          if(resp && resp.access_token){
            accessToken = resp.access_token;
            resolve(accessToken);
          }else{
            reject(new Error("Google no devolvió token."));
          }
        },
        error_callback: err => reject(new Error((err && err.message) || "No se pudo iniciar sesión con Google."))
      });
      const prompt = typeof promptMode === "string" ? promptMode : (localStorage.getItem(LS_CONNECTED) ? "" : "consent");
      tokenClient.requestAccessToken({prompt});
    });
  }

  function waitForGoogle(){
    return new Promise((resolve,reject) => {
      let tries = 0;
      const t = setInterval(() => {
        tries++;
        if(window.google && google.accounts && google.accounts.oauth2){ clearInterval(t); resolve(); }
        if(tries > 80){ clearInterval(t); reject(new Error("No cargó Google Identity Services.")); }
      },100);
    });
  }

  async function driveFetch(url, options={}){
    const retry = !!options.__retry;
    const requestOptions = {...options};
    delete requestOptions.__retry;
    if(!accessToken) await requireToken();
    const res = await fetch(url, {
      ...requestOptions,
      headers: {
        ...(requestOptions.headers || {}),
        Authorization: `Bearer ${accessToken}`
      }
    });
    if(res.status === 401 && !retry){
      accessToken = null;
      localStorage.removeItem(LS_CONNECTED);
      await requireToken("");
      return driveFetch(url,{...requestOptions,__retry:true});
    }
    if(!res.ok){
      const text = await res.text().catch(()=>"");
      throw new Error(`Drive error ${res.status}: ${text || res.statusText}`);
    }
    return res;
  }

  async function findConfigFile(){
    if(driveFileId) return driveFileId;
    const q = encodeURIComponent(`name='${FILE_NAME}' and trashed=false`);
    const fields = encodeURIComponent("files(id,name,modifiedTime)");
    const url = `https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${q}&fields=${fields}`;
    const data = await (await driveFetch(url)).json();
    const file = data.files && data.files[0];
    if(file && file.id){
      driveFileId = file.id;
      localStorage.setItem(LS_FILE_ID, driveFileId);
      return driveFileId;
    }
    return "";
  }

  async function createConfigFile(config){
    const boundary = "psos_plus_" + Math.random().toString(36).slice(2);
    const metadata = {name: FILE_NAME, parents:["appDataFolder"], mimeType:"application/json"};
    const body = `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(config,null,2)}\r\n--${boundary}--`;
    const res = await driveFetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id", {
      method:"POST",
      headers:{"Content-Type":`multipart/related; boundary=${boundary}`},
      body
    });
    const data = await res.json();
    driveFileId = data.id;
    localStorage.setItem(LS_FILE_ID, driveFileId);
    return driveFileId;
  }

  async function saveNow(){
    if(busy) return;
    busy = true;
    refreshPlusUI("Guardando en Drive...", "warn");
    try{
      const config = desktopConfig();
      const id = await findConfigFile();
      if(!id){
        await createConfigFile(config);
      }else{
        await driveFetch(`https://www.googleapis.com/upload/drive/v3/files/${id}?uploadType=media`, {
          method:"PATCH",
          headers:{"Content-Type":"application/json; charset=UTF-8"},
          body: JSON.stringify(config,null,2)
        });
      }
      localStorage.setItem(LS_LAST_SYNC, new Date().toISOString());
      localStorage.setItem(LS_CONNECTED, "1");
      refreshPlusUI("Guardado en Drive.", "ok");
    }finally{ busy = false; }
  }

  async function loadFromDrive(){
    refreshPlusUI("Cargando desde Drive...", "warn");
    const id = await findConfigFile();
    if(!id){
      await saveNow();
      return;
    }
    const response = await driveFetch(`https://www.googleapis.com/drive/v3/files/${id}?alt=media`);
    const text = await response.text();
    if(text.length > 1000000) throw new Error("El respaldo supera el límite de 1 MB.");
    const data = JSON.parse(text);
    applyConfig(data);
    localStorage.setItem(LS_CONNECTED, "1");
    localStorage.setItem(LS_LAST_SYNC, new Date().toISOString());
    refreshPlusUI("Cargado desde Drive.", "ok");
  }

  function disconnectDrive(){
    if(accessToken && window.google?.accounts?.oauth2?.revoke){
      google.accounts.oauth2.revoke(accessToken, () => {});
    }
    accessToken = null;
    driveFileId = "";
    localStorage.removeItem(LS_CONNECTED);
    localStorage.removeItem(LS_FILE_ID);
    localStorage.removeItem(LS_ACCOUNT);
    accountInfo = null;
    refreshPlusUI("Desconectado. La configuración local queda en este dispositivo.", "warn");
  }

  function exportJson(){
    const blob = new Blob([JSON.stringify(desktopConfig(),null,2)], {type:"application/json"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = FILE_NAME;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function importJson(){
    const file = plusImportInput.files && plusImportInput.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try{
        if(String(reader.result || "").length > 1000000) throw new Error("El respaldo supera el límite de 1 MB.");
        const data = JSON.parse(reader.result);
        applyConfig(data);
        queueCloudSave();
      }catch(e){ showError(e); }
      plusImportInput.value = "";
    };
    reader.readAsText(file);
  }

  function refreshPlusUI(msg="", mode=""){
    const remembered = !!localStorage.getItem(LS_CONNECTED);
    const connected = !!accessToken && remembered;
    const dot = document.getElementById("plusDot");
    const small = document.getElementById("plusSmall");
    const status = document.getElementById("plusStatus");
    const connect = document.getElementById("connectDriveBtn");
    const account = document.getElementById("plusAccount");
    const accountName = document.getElementById("plusAccountName");
    const accountEmail = document.getElementById("plusAccountEmail");
    const accountPhoto = document.getElementById("plusAccountPhoto");
    const syncState = document.getElementById("plusSyncState");
    const lastSyncLabel = document.getElementById("plusLastSync");
    const last = localStorage.getItem(LS_LAST_SYNC);
    if(dot){ dot.className = "plus-dot " + (mode || (connected ? "ok" : remembered ? "warn" : "")); }
    if(small){ small.textContent = connected ? "Sincronizado" : remembered ? "Reconectar" : "Drive"; }
    if(connect){ connect.textContent = connected ? "Cambiar cuenta" : remembered ? "Reconectar Google Drive" : "Entrar con Google Drive"; }
    if(status){ status.textContent = msg || (connected ? "Google Drive conectado." : remembered ? "La sesión necesita reconexión." : "Plus sin conectar."); }
    if(syncState){
      syncState.textContent = msg && /Guardando|pendientes|Restaurando|Cargando/i.test(msg) ? msg : connected ? "Sincronización automática activa" : "Sin sincronización";
      syncState.className = connected ? "is-ok" : remembered ? "is-warn" : "";
    }
    if(lastSyncLabel){ lastSyncLabel.textContent = last ? `Última sincronización: ${new Date(last).toLocaleString("es-AR")}` : "Sin sincronizaciones"; }
    if(account){ account.hidden = !accountInfo; }
    if(accountInfo){
      if(accountName) accountName.textContent = accountInfo.name || "Cuenta de Google";
      if(accountEmail) accountEmail.textContent = accountInfo.email || "";
      if(accountPhoto){
        if(accountInfo.photo){ accountPhoto.src = accountInfo.photo; accountPhoto.hidden = false; }
        else accountPhoto.hidden = true;
      }
    }
  }

  function showError(err){
    console.error(err);
    refreshPlusUI((err && err.message) ? err.message : "Error en Plus.", "warn");
  }

  function validateConfig(data){
    if(!data || typeof data !== "object" || Array.isArray(data)) throw new Error("El respaldo no es válido.");
    if(data.country && String(data.country).toUpperCase() !== COUNTRY) throw new Error(`El respaldo pertenece a ${data.country}, no a ${COUNTRY}.`);
    if(!data.groups || typeof data.groups !== "object" || Array.isArray(data.groups)) throw new Error("El respaldo no contiene grupos válidos.");
    const allowed = typeof groups === "object" ? Object.keys(groups) : [];
    for(const [key,items] of Object.entries(data.groups)){
      if(!allowed.includes(key) || !Array.isArray(items) || items.length > 100) throw new Error("El respaldo contiene grupos inválidos.");
    }
    if(data.custom && (!Array.isArray(data.custom) || data.custom.length > 5)) throw new Error("Los accesos personalizados no son válidos.");
  }

  function slugSafe(s){
    return String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"") || "acceso";
  }
})();
