(function(){
  const buttons = [...document.querySelectorAll('[data-install-app]')];
  if(!buttons.length) return;

  const lang = (document.documentElement.lang || navigator.language || 'es').toLowerCase();
  const copy = lang.startsWith('en') ? {
    button:'Install app', title:'Install Punto Smart OS',
    ready:'Punto Smart OS can be installed as an app on this device.',
    ios:'On iPhone or iPad, open the Share menu and choose “Add to Home Screen”.',
    fallback:'Open your browser menu and choose “Install app” or “Add to Home screen”.',
    action:'Install now', close:'Close', installed:'App installed'
  } : lang.startsWith('pt') ? {
    button:'Instalar app', title:'Instalar Punto Smart OS',
    ready:'Punto Smart OS pode ser instalado como aplicativo neste dispositivo.',
    ios:'No iPhone ou iPad, abra Compartilhar e escolha “Adicionar à Tela de Início”.',
    fallback:'Abra o menu do navegador e escolha “Instalar app” ou “Adicionar à tela inicial”.',
    action:'Instalar agora', close:'Fechar', installed:'App instalada'
  } : lang.startsWith('fr') ? {
    button:'Installer l’app', title:'Installer Punto Smart OS',
    ready:'Punto Smart OS peut être installé comme une application sur cet appareil.',
    ios:'Sur iPhone ou iPad, ouvrez Partager puis choisissez « Sur l’écran d’accueil ».',
    fallback:'Ouvrez le menu du navigateur puis choisissez « Installer l’application » ou « Ajouter à l’écran d’accueil ».',
    action:'Installer', close:'Fermer', installed:'Application installée'
  } : {
    button:'Instalar app', title:'Instalar Punto Smart OS',
    ready:'Podés instalar Punto Smart OS como una aplicación en este dispositivo.',
    ios:'En iPhone o iPad, abrí Compartir y elegí “Agregar a inicio”.',
    fallback:'Abrí el menú del navegador y elegí “Instalar aplicación” o “Agregar a pantalla principal”.',
    action:'Instalar ahora', close:'Cerrar', installed:'Aplicación instalada'
  };

  buttons.forEach(button => {
    button.textContent = copy.button;
    button.hidden = false;
    button.setAttribute('aria-label', copy.title);
  });

  const dialog = document.createElement('dialog');
  dialog.className = 'modal install-dialog';
  dialog.innerHTML = `<div class="info-content install-content">
    <button class="modal-close" type="button" aria-label="${copy.close}">×</button>
    <span class="install-mark" aria-hidden="true">⬇</span>
    <h3>${copy.title}</h3>
    <p data-install-message>${copy.ready}</p>
    <div class="modal-actions install-actions">
      <button type="button" data-install-close>${copy.close}</button>
      <button type="button" class="primary" data-install-confirm>${copy.action}</button>
    </div>
  </div>`;
  document.body.appendChild(dialog);

  let deferredPrompt = null;
  const message = dialog.querySelector('[data-install-message]');
  const confirm = dialog.querySelector('[data-install-confirm]');
  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent || '');
  const openInstructions = () => {
    message.textContent = deferredPrompt ? copy.ready : (isIos ? copy.ios : copy.fallback);
    confirm.hidden = !deferredPrompt;
    dialog.showModal();
  };

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredPrompt = event;
  });
  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    buttons.forEach(button => { button.textContent = copy.installed; button.disabled = true; });
    if(dialog.open) dialog.close();
  });

  buttons.forEach(button => button.addEventListener('click', openInstructions));
  dialog.querySelector('.modal-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-install-close]').addEventListener('click', () => dialog.close());
  confirm.addEventListener('click', async () => {
    if(!deferredPrompt) return;
    const prompt = deferredPrompt;
    deferredPrompt = null;
    await prompt.prompt();
    await prompt.userChoice.catch(() => null);
    dialog.close();
  });

  if('serviceWorker' in navigator){
    const ownScript = document.currentScript?.src;
    if(ownScript){
      const workerUrl = new URL('service-worker.js', ownScript);
      window.addEventListener('load', () => navigator.serviceWorker.register(workerUrl).catch(() => {}));
    }
  }
})();
