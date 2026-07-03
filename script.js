const groups = {
  favorites: [
    app('Google','https://www.google.com/','google.com'),
    app('YouTube','https://www.youtube.com/','youtube.com'),
    app('Gmail','https://mail.google.com/','gmail.com', false, '', 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico'),
    app('Hotmail','https://outlook.live.com/mail/','outlook.live.com'),
    app('WhatsApp Web','https://web.whatsapp.com/','whatsapp.com'),
    app('Instagram','https://www.instagram.com/','instagram.com'),
    app('TikTok','https://www.tiktok.com/','tiktok.com', true),
    app('Facebook','https://www.facebook.com/','facebook.com'),
    app('Maps','https://www.google.com/maps','maps.google.com'),
    app('Traductor','https://translate.google.com/','translate.google.com'),
    app('Clima','https://www.google.com/search?q=clima+buenos+aires','weather.com'),
    app('X.com','https://x.com/','x.com', true),
    app('Calendario','https://calendar.google.com/','calendar.google.com', false, '', 'https://ssl.gstatic.com/calendar/images/favicon_v2014_32.ico'),
    app('Calculadora','https://www.google.com/search?q=calculadora','calculator.net', true)
  ],
  content: [
    app('Mercado Libre','https://www.mercadolibre.com.ar/','mercadolibre.com.ar'),
    app('Mercado Pago','https://www.mercadopago.com.ar/','mercadopago.com.ar'),
    app('Amazon','https://www.amazon.com/','amazon.com', true),
    app('Wikipedia','https://es.wikipedia.org/','wikipedia.org'),
    app('Netflix','https://www.netflix.com/','netflix.com', true),
    app('Spotify','https://open.spotify.com/','spotify.com', true),
    app('Flow','https://www.flow.com.ar/','flow.com.ar', true),
    app('Bloc de notas','#notes','', true, '▤')
  ],
  fotos: [
    app('Google Fotos','https://photos.google.com/','photos.google.com'),
    app('Cámara / Fotos','https://photos.google.com/','photos.google.com', true, '📷'),
    app('Canva','https://www.canva.com/','canva.com'),
    app('Photopea','https://www.photopea.com/','photopea.com'),
    app('Remove.bg','https://www.remove.bg/','remove.bg'),
    app('CapCut','https://www.capcut.com/','capcut.com'),
    app('Adobe Express','https://www.adobe.com/express/','adobe.com'),
    app('Pinterest','https://www.pinterest.com/','pinterest.com')
  ],
  juegos: [
    app('Steam','https://store.steampowered.com/','steampowered.com'),
    app('Minijuegos','https://www.minijuegos.com/','minijuegos.com'),
    app('Poki','https://poki.com/es','poki.com'),
    app('CrazyGames','https://www.crazygames.com/','crazygames.com')
  ],
  ai: [
    app('Gemini','https://gemini.google.com/','gemini.google.com'),
    app('ChatGPT','https://chatgpt.com/','chatgpt.com'),
    app('Claude','https://claude.ai/','claude.ai'),
    app('Microsoft 365','https://www.office.com/','office.com'),
    app('Drive','https://drive.google.com/','drive.google.com'),
    app('Aerolíneas Argentinas','https://www.aerolineas.com.ar/','aerolineas.com.ar'),
    app('Ualá','https://www.uala.com.ar/','uala.com.ar'),
    app('Despegar','https://www.despegar.com.ar/','despegar.com.ar')
  ],
  tramites: [
    app('ARCA','https://www.arca.gob.ar/','arca.gob.ar', true, 'ARCA'),
    app('Mi Argentina','https://www.argentina.gob.ar/miargentina','argentina.gob.ar'),
    app('ANSES','https://www.anses.gob.ar/','anses.gob.ar', true, 'ANSES'),
    app('Monotributo','https://monotributo.afip.gob.ar/','afip.gob.ar', false, 'M')
  ],
  noticias: [
    app('Clarín','https://www.clarin.com/','clarin.com'),
    app('Infobae','https://www.infobae.com/','infobae.com'),
    app('La Nación','https://www.lanacion.com.ar/','lanacion.com.ar'),
    app('Telefé','https://mitelefe.com/','telefe.com'),
    app('El Cronista','https://www.cronista.com/','cronista.com'),
    app('TyC Sports','https://www.tycsports.com/','tycsports.com')
  ],
  bancos: [
    app('Nación','https://www.bna.com.ar/','bna.com.ar'),
    app('Provincia','https://www.bancoprovincia.com.ar/','bancoprovincia.com.ar'),
    app('Macro','https://www.macro.com.ar/','macro.com.ar'),
    app('Santander','https://www.santander.com.ar/','santander.com.ar'),
    app('Banco Ciudad','https://www.bancociudad.com.ar/','bancociudad.com.ar'),
    app('BBVA','https://www.bbva.com.ar/','bbva.com.ar'),
    app('Brubank','https://www.brubank.com/','brubank.com'),
    app('Ualá','https://www.uala.com.ar/','uala.com.ar')
  ],
  negocio: [
    app('Muebles','https://www.google.com/search?q=muebles+mayorista+argentina','google.com', true, '▰'),
    app('Papelera','https://www.google.com/search?q=papelera+mayorista+argentina','google.com', true, '⌘'),
    app('Contadoras de Billetes','https://www.google.com/search?q=contadoras+de+billetes','google.com', true, '▣'),
    app('Tecnología','https://www.puntosmart.com.ar/','puntosmart.com.ar', true, '▦')
  ]
};

const folderNames = {
  fotos:'Fotos y Cámara', juegos:'Juegos y Ocio', tramites:'Trámites', noticias:'Noticias y Deportes', bancos:'Bancos', negocio:'Negocio / Proveedores'
};
let editMode = false;
let currentCustomIndex = null;
let currentAddGroup = null;
let dragState = null;
const LS_GROUPS_STATE = 'ps_groups_state';

function cleanGroupItem(item){
  return {
    id: item.id || slug(item.name || 'acceso'),
    name: item.name || 'Acceso',
    url: item.url || '#',
    domain: item.domain || '',
    dark: !!item.dark,
    fallback: item.fallback || '',
    icon: item.icon || ''
  };
}
function saveGroupsState(){
  try{
    const out = {};
    Object.keys(groups).forEach(k => out[k] = (groups[k] || []).map(cleanGroupItem));
    localStorage.setItem(LS_GROUPS_STATE, JSON.stringify(out));
    window.dispatchEvent(new CustomEvent('ps:groupsChanged'));
  }catch(e){}
}
function restoreGroupsState(){
  try{
    const saved = JSON.parse(localStorage.getItem(LS_GROUPS_STATE) || 'null');
    if(!saved) return;
    Object.keys(saved).forEach(k => {
      if(Array.isArray(saved[k]) && Array.isArray(groups[k])){
        groups[k].length = 0;
        saved[k].forEach(item => groups[k].push(cleanGroupItem(item)));
      }
    });
  }catch(e){}
}


function app(name,url,domain,dark=false,fallback='',icon=''){
  return { id: slug(name), name, url, domain, dark, fallback, icon };
}
function slug(s){ return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); }
function favicon(domain){ return domain ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128` : ''; }
function normalizeUrl(url){
  if(!url) return '#';
  if(url.startsWith('#')) return url;
  if(!/^https?:\/\//i.test(url)) return 'https://' + url;
  return url;
}
function openSmartUrl(url){
  const finalUrl = normalizeUrl(url);
  if(!finalUrl || finalUrl === '#') return false;
  try{
    const a = document.createElement('a');
    a.href = finalUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }catch(e){
    // En web normal no navegamos la página principal: evita apertura duplicada.
    console.warn('No se pudo abrir en nueva pestaña', e);
  }
  return false;
}
function cleanText(str){
  return (str || '').toString().trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
}

const dailyPhrases = [
  'Disfrutá lo fugaz.',
  'El éxito es levantarse cada vez que te caés.',
  'Hoy será un gran día.',
  '¿Sonreíste hoy?',
  'Somos instantes.',
  '¿Qué estás esperando para amar?',
  'Lo imposible solo tarda un poco más.',
  'Duermo poco, sueño mucho.',
  'Con los ojos cerrados y los sueños despiertos.',
  'Vivir intensamente es mi insomnio permanente.',
  'Que nada te detenga.',
  'Persigue tus sueños.',
  'Más amor, por favor.',
  'Lo esencial es invisible a los ojos.',
  '¿Quién te dijo que todo está perdido?',
  '¿Es hermoso saber que estás?',
  'El tiempo es infinito a tu lado.',
  'No pierdas el foco.',
  '¿Cuánto perdemos por miedo a perder?',
  'Más acción y menos reacción.',
  'Qué placer verte sonreír.',
  'Ordenás mi caos.'
];

function initDailyPhrase(){
  const el = document.getElementById('dailyPhrase');
  if(!el || !dailyPhrases.length) return;
  const today = new Date();
  const start = new Date(2026,5,19); // 19/06/2026: primera frase de la lista.
  const d0 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const day = Math.max(0, Math.floor((d0 - start) / 86400000));
  el.textContent = '“' + dailyPhrases[day % dailyPhrases.length] + '”';
}


function tileHTML(item, opts={}){
  const img = item.icon || favicon(item.domain);
  const fallback = item.fallback || (item.name || '?').slice(0,2).toUpperCase();
  const dark = item.dark ? ' dark' : '';
  const draggable = opts.draggable && editMode ? 'draggable="true"' : '';
  const groupAttr = opts.group ? `data-group="${opts.group}" data-index="${opts.index || 0}"` : '';
  return `<button type="button" class="tile ${editMode ? 'editing' : ''}" data-id="${item.id}" data-url="${item.url}" ${groupAttr} ${draggable} title="${item.name}">
    ${editMode && opts.group ? `<span class="tile-delete" data-delete-group="${opts.group}" data-delete-index="${opts.index || 0}" title="Borrar acceso">×</span>` : ''}
    <span class="tile-icon${dark}">${img ? `<img src="${img}" alt="" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'letter',textContent:'${fallback.replace(/'/g,'')}'}))">` : `<span class="letter">${fallback}</span>`}</span>
    <span class="tile-name">${item.name}</span>
  </button>`;
}

function renderGroup(key, elId, mini=false){
  const el = document.getElementById(elId);
  if(!el) return;
  const items = groups[key];
  el.dataset.group = key;
  const addTile = editMode ? `<button type="button" class="tile add-section-tile" data-add-group="${key}" title="Agregar acceso">
    <span class="tile-icon add-icon">+</span>
    <span class="tile-name">Agregar acceso</span>
  </button>` : '';
  el.innerHTML = items.map((i,idx) => tileHTML(i,{draggable: true, group:key, index:idx})).join('') + addTile;
}

function renderAll(){
  renderGroup('favorites','favoritesGrid');
  renderGroup('content','contentGrid');
  renderGroup('fotos','fotosGrid');
  renderGroup('juegos','juegosGrid');
  renderGroup('ai','aiGrid');
  renderGroup('tramites','tramitesGrid');
  renderGroup('noticias','noticiasGrid');
  renderGroup('bancos','bancosGrid');
  renderGroup('negocio','negocioGrid');
  renderCustom();
  bindTiles();
  bindDrag();
  document.body.classList.toggle('editing-mode', editMode);
  document.getElementById('editBtn').textContent = editMode ? '✓ Listo' : '✎ Editar';
}

function getCustom(){
  try{return JSON.parse(localStorage.getItem('ps_custom_tiles')||'[]')}catch(e){return []}
}
function setCustom(arr){localStorage.setItem('ps_custom_tiles',JSON.stringify(arr));}
function renderCustom(){
  const data = getCustom();
  const grid = document.getElementById('customGrid');
  grid.innerHTML = '';
  for(let i=0;i<5;i++){
    const item = data[i];
    const btn = document.createElement('button');
    btn.className = 'custom-tile' + (item ? ' filled' : '');
    btn.dataset.index = i;
    if(item){
      const img = item.icon || favicon(domainFromUrl(item.url));
      const letter = (item.name || '?').slice(0,2).toUpperCase();
      btn.innerHTML = `<span class="tile-icon"><img src="${img}" alt="" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'letter',textContent:'${letter}'}))"></span><span>${item.name}</span>`;
    }else{
      btn.innerHTML = `<span class="plus">+</span><span>Agregar<br>acceso</span>`;
    }
    grid.appendChild(btn);
  }
}
function domainFromUrl(url){
  try{return new URL(normalizeUrl(url)).hostname.replace(/^www\./,'')}catch(e){return ''}
}

function bindTiles(){
  document.querySelectorAll('.tile-delete').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if(e.stopImmediatePropagation) e.stopImmediatePropagation();
      const group = btn.dataset.deleteGroup;
      const index = Number(btn.dataset.deleteIndex);
      if(!editMode || !group || !groups[group] || !Number.isFinite(index)) return false;
      if(!confirm('¿Borrar este acceso?')) return false;
      groups[group].splice(index,1);
      saveGroupsState();
      renderAll();
      return false;
    };
  });
  document.querySelectorAll('.section-add-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if(!editMode) return false;
      openGroupAdd(btn.dataset.addGroup);
      return false;
    };
  });
  document.querySelectorAll('.add-section-tile').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if(!editMode) return false;
      openGroupAdd(btn.dataset.addGroup);
      return false;
    };
  });
  document.querySelectorAll('.tile:not(.add-section-tile)').forEach(btn => {
    btn.onclick = (e) => {
      e?.preventDefault();
      e?.stopPropagation();
      if(e?.stopImmediatePropagation) e.stopImmediatePropagation();
      if(editMode || dragState){
        return false;
      }
      const url = btn.dataset.url;
      if(url === '#notes') return openNotes();
      if(url === '#camera') return openCamera();
      openSmartUrl(url);
      return false;
    };
  });
  document.querySelectorAll('.custom-tile').forEach(btn => {
    btn.onclick = (e) => {
      e?.preventDefault();
      e?.stopPropagation();
      if(e?.stopImmediatePropagation) e.stopImmediatePropagation();
      if(dragState){
        return false;
      }
      const idx = Number(btn.dataset.index);
      const item = getCustom()[idx];
      if(item && !editMode){ openSmartUrl(item.url); return false; }
      openCustom(idx);
      return false;
    };
  });
}
function openNotes(){
  alert('Bloc de notas: en la próxima versión se puede agregar un bloc editable guardado en el navegador.');
}
function openCamera(){
  const input = document.getElementById('cameraInput');
  if(input){
    input.value = '';
    input.onchange = () => {
      const file = input.files && input.files[0];
      if(file) alert('Foto seleccionada: ' + file.name + '\nNo se guarda en Punto Smart OS. Queda en tu dispositivo.');
    };
    input.click();
  }else{
    openSmartUrl('https://photos.google.com/');
  }
  return false;
}

function openCustom(index){
  currentCustomIndex = index;
  currentAddGroup = null;
  customDialogTitle.textContent = 'Agregar página o aplicación';
  const arr = getCustom();
  const item = arr[index] || {};
  customName.value = item.name || '';
  customUrl.value = item.url || '';
  customIcon.value = item.icon || '';
  deleteCustomBtn.style.visibility = item.name ? 'visible':'hidden';
  customDialog.showModal();
}
function openGroupAdd(groupKey){
  currentCustomIndex = null;
  currentAddGroup = groupKey;
  const label = folderNames[groupKey] || ({favorites:'Favoritos y Esenciales', content:'Compras y Contenido', fotos:'Fotos y Cámara', juegos:'Juegos y Ocio', ai:'IA y Productividad'}[groupKey] || 'sección');
  customDialogTitle.textContent = 'Agregar acceso en ' + label;
  customName.value = '';
  customUrl.value = '';
  customIcon.value = '';
  deleteCustomBtn.style.visibility = 'hidden';
  customDialog.showModal();
}

customForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = customName.value.trim();
  const url = normalizeUrl(customUrl.value.trim());
  const icon = customIcon.value.trim();
  if(currentAddGroup && groups[currentAddGroup]){
    groups[currentAddGroup].push(app(name, url, domainFromUrl(url), false, '', icon));
    saveGroupsState();
  }else{
    const arr = getCustom();
    arr[currentCustomIndex] = { name, url, icon };
    setCustom(arr);
  }
  currentAddGroup = null;
  customDialog.close();
  renderAll();
});
cancelCustomBtn.onclick = () => { currentAddGroup = null; customDialog.close(); };
deleteCustomBtn.onclick = () => {
  const arr = getCustom();
  arr.splice(currentCustomIndex,1);
  setCustom(arr);
  currentAddGroup = null;
  customDialog.close();
  renderAll();
};

function bindDrag(){
  document.querySelectorAll('.tile[draggable="true"]').forEach(tile => {
    tile.addEventListener('dragstart', e => {
      dragState = { id: tile.dataset.id };
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', tile.dataset.id);
      tile.classList.add('dragging');
    });
    tile.addEventListener('dragend', () => {
      document.querySelectorAll('.drag-over,.dragging,.panel-drop').forEach(el => el.classList.remove('drag-over','dragging','panel-drop'));
      setTimeout(() => { dragState = null; }, 80);
    });
    tile.addEventListener('dragover', e => {
      if(!editMode) return;
      e.preventDefault();
      tile.classList.add('drag-over');
    });
    tile.addEventListener('dragleave', () => tile.classList.remove('drag-over'));
    tile.addEventListener('drop', e => {
      if(!editMode) return;
      e.preventDefault();
      e.stopPropagation();
      tile.classList.remove('drag-over');
      const fromId = e.dataTransfer.getData('text/plain');
      const toId = tile.dataset.id;
      if(fromId && toId && fromId !== toId) moveItemToGroup(fromId, tile.dataset.group, toId);
    });
  });

  document.querySelectorAll('.icon-grid,.mini-grid').forEach(grid => {
    const groupKey = grid.dataset.group;
    if(!groupKey) return;
    grid.addEventListener('dragover', e => {
      if(!editMode) return;
      e.preventDefault();
      grid.classList.add('panel-drop');
    });
    grid.addEventListener('dragleave', e => {
      if(!grid.contains(e.relatedTarget)) grid.classList.remove('panel-drop');
    });
    grid.addEventListener('drop', e => {
      if(!editMode) return;
      if(e.target.closest('.tile')) return;
      e.preventDefault();
      grid.classList.remove('panel-drop');
      const fromId = e.dataTransfer.getData('text/plain');
      if(fromId) moveItemToGroup(fromId, groupKey, null);
    });
  });
}
function findItemLocation(id){
  for(const [k,arr] of Object.entries(groups)){
    const idx = arr.findIndex(it => it.id === id);
    if(idx >= 0) return {group:k, index:idx};
  }
  return null;
}
function moveItemToGroup(fromId,targetGroup,targetId=null){
  const from = findItemLocation(fromId);
  if(!from || !targetGroup || !groups[targetGroup]) return;
  const item = groups[from.group].splice(from.index,1)[0];
  let insertIndex = groups[targetGroup].length;
  if(targetId){
    insertIndex = groups[targetGroup].findIndex(it => it.id === targetId);
    if(insertIndex < 0) insertIndex = groups[targetGroup].length;
  }
  if(from.group === targetGroup && from.index < insertIndex) insertIndex--;
  groups[targetGroup].splice(insertIndex,0,item);
  saveGroupsState();
  renderAll();
}
function swapItems(fromId,toId){
  const to = findItemLocation(toId);
  if(to) moveItemToGroup(fromId, to.group, toId);
}


editBtn.onclick = () => { editMode = !editMode; renderAll(); };
if(window.resetBtn){ resetBtn.onclick = () => {
  if(confirm('¿Restaurar accesos personalizados, orden de secciones y recargar la maqueta?')){ localStorage.removeItem('ps_custom_tiles'); localStorage.removeItem(LS_GROUPS_STATE); location.reload(); }
}; }
howBtn.onclick = () => infoDialog.showModal();
closeInfoBtn.onclick = () => infoDialog.close();
supportBtn.onclick = () => openSmartUrl('https://wa.me/5491148706501?text=Hola%2C%20necesito%20soporte%20con%20Punto%20Smart%20OS');
suggestBtn.onclick = () => openSmartUrl('https://wa.me/5491148706501?text=Hola%2C%20quiero%20sugerir%20un%20acceso%20para%20Punto%20Smart%20OS');

Object.keys(folderNames).forEach(key => {
  document.querySelector(`[data-folder="${key}"] .folder-open`)?.addEventListener('click', () => openFolder(key));
});
function openFolder(key){
  folderTitle.textContent = folderNames[key];
  folderModalGrid.innerHTML = groups[key].map(i => tileHTML(i)).join('');
  folderDialog.showModal();
  bindTiles();
}
closeFolderBtn.onclick = () => folderDialog.close();

let smartSearchEngine = 'google';
const smartSearchDefaults = {
  google:'https://www.google.com/',
  chatgpt:'https://chatgpt.com/',
  videos:'https://www.youtube.com/',
  comprar:'https://www.mercadolibre.com.ar/',
  comparar:'https://www.google.com/search?q=comparar+productos',
  futbol:'https://www.google.com/search?q=futbol+partidos+de+hoy',
  tramites:'https://www.argentina.gob.ar/',
  noticias:'https://news.google.com/topstories?hl=es-419&gl=AR&ceid=AR:es-419',
  lugares:'https://www.google.com/maps',
  proveedores:'https://www.google.com/search?q=proveedores+mayoristas+argentina',
  soporte:'https://www.google.com/search?q=soporte+tecnico',
  trabajo:'https://mail.google.com/',
  redes:'https://www.google.com/search?q=redes+sociales',
};
const smartSearchPlaceholders = {
  google:'Buscar en la web...',
  chatgpt:'Preguntarle a la IA...',
  videos:'Buscar videos, tutoriales o reviews...',
  comprar:'Buscar para comprar...',
  comparar:'Comparar modelos, precios o alternativas...',
  futbol:'Buscar fútbol, partidos, resultados o tabla...',
  tramites:'Buscar trámites argentinos...',
  noticias:'Buscar noticias...',
  lugares:'Buscar lugares, direcciones o comercios...',
  proveedores:'Buscar proveedores o mayoristas...',
  soporte:'Buscar solución técnica...',
  trabajo:'Buscar en herramientas de trabajo...',
  redes:'Buscar en redes sociales...'
};
function buildSmartSearchUrl(engine, query){
  const q = (query || '').trim();
  if(!q) return smartSearchDefaults[engine] || smartSearchDefaults.google;
  const e = encodeURIComponent(q);
  const dash = e.replace(/%20/g,'-');
  if(engine === 'videos') return `https://www.youtube.com/results?search_query=${e}`;
  if(engine === 'comprar') return `https://listado.mercadolibre.com.ar/${dash}`;
  if(engine === 'comparar') return `https://www.google.com/search?q=${encodeURIComponent('comparar ' + q + ' precio características opiniones')}`;
  if(engine === 'futbol') return `https://www.google.com/search?q=${encodeURIComponent(q + ' futbol partidos resultados fixture tabla')}`;
  if(engine === 'tramites') return `https://www.google.com/search?q=${encodeURIComponent(q + ' site:argentina.gob.ar OR site:arca.gob.ar OR site:anses.gob.ar OR site:buenosaires.gob.ar')}`;
  if(engine === 'noticias') return `https://news.google.com/search?q=${e}&hl=es-419&gl=AR&ceid=AR:es-419`;
  if(engine === 'lugares') return `https://www.google.com/maps/search/${encodeURIComponent(q + ' cerca de mi')}`;
  if(engine === 'proveedores') return `https://www.google.com/search?q=${encodeURIComponent('proveedor mayorista ' + q + ' argentina')}`;
  if(engine === 'soporte') return `https://www.google.com/search?q=${encodeURIComponent('solucion soporte error ' + q)}`;
  if(engine === 'trabajo') return `https://mail.google.com/mail/u/0/#search/${e}`;
  if(engine === 'redes') return `https://www.google.com/search?q=${encodeURIComponent(q + ' site:instagram.com OR site:tiktok.com OR site:facebook.com OR site:x.com OR site:linkedin.com')}`;
  if(engine === 'chatgpt') return `https://chatgpt.com/?q=${e}`;
  return `https://www.google.com/search?q=${e}`;
}
function filterTiles(query){
  const q = cleanText(query);
  document.querySelectorAll('.tile,.custom-tile').forEach(el => {
    const text = cleanText(el.textContent);
    el.classList.toggle('hidden-search', !!q && !text.includes(q));
  });
}
function setSmartSearchEngine(engine){
  smartSearchEngine = engine || 'google';
  document.querySelectorAll('.engine-pill').forEach(btn => btn.classList.toggle('active', btn.dataset.engine === smartSearchEngine));
  const box = document.querySelector('.smart-search');
  box?.classList.toggle('local-mode', smartSearchEngine === 'local');
  if(searchInput) searchInput.placeholder = smartSearchPlaceholders[smartSearchEngine] || '¿Qué querés buscar?';
}
searchInput.addEventListener('input', e => filterTiles(e.target.value));
document.querySelectorAll('.engine-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    setSmartSearchEngine(btn.dataset.engine);
    searchInput.focus();
    if(btn.dataset.engine === 'local') filterTiles(searchInput.value);
  });
});
smartSearchForm?.addEventListener('submit', e => {
  e.preventDefault();
  const q = searchInput.value.trim();
  if(smartSearchEngine === 'local'){ filterTiles(q); return; }
  openSmartUrl(buildSmartSearchUrl(smartSearchEngine, q));
});
setSmartSearchEngine('google');

function initPlusAbTest(){
  const btn = document.getElementById('plusSalesBtn');
  const dialog = document.getElementById('plusSalesDialog');
  const close = document.getElementById('closePlusSalesBtn');
  if(!btn || !dialog) return;
  const variants = {
    A: 'Guardá tu entorno y recuperalo desde cualquier dispositivo.',
    B: 'Tu escritorio online siempre listo, aunque cambies de equipo.'
  };
  let variant = localStorage.getItem('ps_plus_cta_variant');
  if(!variant || !variants[variant]){
    variant = Math.random() < 0.5 ? 'A' : 'B';
    localStorage.setItem('ps_plus_cta_variant', variant);
  }
  const visible = document.getElementById('plusCtaShort');
  const modal = document.getElementById('plusAbText');
  if(visible) visible.textContent = variants[variant];
  if(modal) modal.textContent = variants[variant];
  const wa = document.getElementById('plusWhatsappBtn');
  if(wa){
    wa.href = 'plus/';
    wa.textContent = 'Ver ventajas Plus';
  }
  btn.onclick = () => {
    try{
      const key = 'ps_plus_cta_click_' + variant;
      localStorage.setItem(key, String((Number(localStorage.getItem(key) || '0') + 1)));
    }catch(e){}
    dialog.showModal();
  };
  close && (close.onclick = () => dialog.close());
}

function tick(){
  const now = new Date();
  clock.textContent = now.toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit'});
  dateText.textContent = now.toLocaleDateString('es-AR',{weekday:'long',day:'numeric',month:'long'}).replace(/^./,c=>c.toUpperCase());
}
restoreGroupsState();
initDailyPhrase();
initPlusAbTest();
setInterval(tick,1000); tick(); renderAll();


function initLocalCountrySelector(){
  const sel = document.getElementById('localCountrySelect');
  if(!sel) return;
  sel.onchange = () => {
    if(sel.value) location.href = sel.value;
  };
}
initLocalCountrySelector();
