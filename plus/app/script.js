const groups = {
  favorites: [
    app('Google','https://www.google.com/','google.com'),
    app('YouTube','https://www.youtube.com/','youtube.com'),
    app('Gmail','https://mail.google.com/','gmail.com'),
    app('Hotmail','https://outlook.live.com/mail/','outlook.live.com'),
    app('WhatsApp Web','https://web.whatsapp.com/','whatsapp.com'),
    app('Instagram','https://www.instagram.com/','instagram.com'),
    app('TikTok','https://www.tiktok.com/','tiktok.com', true),
    app('Facebook','https://www.facebook.com/','facebook.com'),
    app('Maps','https://www.google.com/maps','maps.google.com'),
    app('Traductor','https://translate.google.com/','translate.google.com'),
    app('Clima','https://www.google.com/search?q=clima+buenos+aires','weather.com'),
    app('X.com','https://x.com/','x.com', true),
    app('Calendario','https://calendar.google.com/','calendar.google.com'),
    app('Calculadora','https://www.google.com/search?q=calculadora','calculator.net', true)
  ],
  content: [
    app('Mercado Libre','https://www.mercadolibre.com.ar/','mercadolibre.com.ar'),
    app('Mercado Pago','https://www.mercadopago.com.ar/','mercadopago.com.ar'),
    app('Amazon','https://www.amazon.com/','amazon.com', true),
    app('Wikipedia','https://es.wikipedia.org/','wikipedia.org'),
    app('Netflix','https://www.netflix.com/','netflix.com', true),
    app('Spotify','https://open.spotify.com/','spotify.com', true),
    app('Flow','https://www.flow.com.ar/','flow.com.ar', true, '', 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20128%20128%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20stop-color%3D%22%237b2cff%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2328b7ff%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22128%22%20height%3D%22128%22%20rx%3D%2228%22%20fill%3D%22%23080b18%22%2F%3E%3Ccircle%20cx%3D%2264%22%20cy%3D%2264%22%20r%3D%2245%22%20fill%3D%22url%28%23g%29%22%20opacity%3D%22.22%22%2F%3E%3Cpath%20d%3D%22M28%2043c0-8%207-15%2015-15h42c9%200%2015%207%2015%2015v8H55v12h37v20H55v17H28V43z%22%20fill%3D%22url%28%23g%29%22%2F%3E%3Ctext%20x%3D%2264%22%20y%3D%22116%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2Csans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22700%22%20fill%3D%22%23fff%22%3EFLOW%3C%2Ftext%3E%3C%2Fsvg%3E'),
    app('Bloc de notas','#notes','', true, '▤')
  ],
  fotos: [
    app('Google Fotos','https://photos.google.com/','photos.google.com'),
    app('Cámara / Fotos','#camera','', true, '📷'),
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
let moveSelection = null;
const LS_GROUPS_STATE = 'ps_groups_state';
const GROUPS_SCHEMA_VERSION = 3;

function assignStableGroupIds(){
  Object.entries(groups).forEach(([group,items]) => {
    const seen = new Map();
    items.forEach(item => {
      const base = slug(item.name || 'acceso');
      const occurrence = seen.get(base) || 0;
      seen.set(base, occurrence + 1);
      item.id = `${group}:${base}${occurrence ? `:${occurrence + 1}` : ''}`;
    });
  });
}
assignStableGroupIds();
const DEFAULT_GROUPS = JSON.parse(JSON.stringify(groups));

function cleanGroupItem(item, group='custom', index=0){
  const name = String(item?.name || 'Acceso').trim().slice(0,80) || 'Acceso';
  return {
    id: String(item?.id || `${group}:${slug(name)}:${index + 1}`).replace(/[^a-z0-9:_-]/gi,'').slice(0,120),
    name,
    url: normalizeUrl(item?.url || '#'),
    domain: String(item?.domain || '').replace(/[^a-z0-9.-]/gi,'').slice(0,120),
    dark: !!item.dark,
    fallback: String(item?.fallback || '').slice(0,12),
    icon: safeIconUrl(item?.icon || '')
  };
}
function saveGroupsState(){
  try{
    const out = {};
    Object.keys(groups).forEach(k => out[k] = (groups[k] || []).map((item,index) => cleanGroupItem(item,k,index)));
    localStorage.setItem(LS_GROUPS_STATE, JSON.stringify({schemaVersion:GROUPS_SCHEMA_VERSION,groups:out}));
    window.dispatchEvent(new CustomEvent('ps:groupsChanged'));
  }catch(e){}
}
function restoreGroupsState(){
  try{
    const raw = JSON.parse(localStorage.getItem(LS_GROUPS_STATE) || 'null');
    if(!raw) return;
    const isCurrent = raw.schemaVersion === GROUPS_SCHEMA_VERSION && raw.groups;
    const saved = isCurrent ? raw.groups : (raw.groups || raw);
    Object.keys(groups).forEach(k => {
      if(Array.isArray(saved[k])){
        let next = saved[k].map((item,index) => cleanGroupItem(item,k,index));
        if(!isCurrent){
          const defaults = DEFAULT_GROUPS[k] || [];
          const used = new Set();
          next = next.map((item,index) => {
            const match = defaults.findIndex((candidate,defaultIndex) => !used.has(defaultIndex) && slug(candidate.name) === slug(item.name));
            if(match < 0) return cleanGroupItem(item,k,index);
            used.add(match);
            return cleanGroupItem(defaults[match],k,match);
          });
          defaults.forEach((item,index) => { if(!used.has(index)) next.push(cleanGroupItem(item,k,index)); });
        }
        groups[k].length = 0;
        next.forEach(item => groups[k].push(item));
      }
    });
    if(!isCurrent) saveGroupsState();
  }catch(e){}
}


function app(name,url,domain,dark=false,fallback='',icon=''){
  return { id: slug(name), name, url, domain, dark, fallback, icon };
}
function slug(s){ return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); }
const PRESET_ICON_BASE = '../../assets/icons/';
function iconDomain(item){ return String(item?.domain || domainFromUrl(item?.url) || '').replace(/^www\./i,'').toLowerCase(); }
function iconFile(domain){ return String(domain || '').replace(/[^a-z0-9.-]+/g,'-').replace(/\.+/g,'-'); }
function presetIcon(item){
  if(item?.icon) return safeIconUrl(item.icon);
  const domain = iconDomain(item);
  return domain ? `${PRESET_ICON_BASE}${iconFile(domain)}.png` : safeIconUrl(item?.icon || '');
}
function remoteFavicon(domain){
  return domain ? `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(`https://${domain}`)}&sz=128` : '';
}
function normalizeUrl(url){
  const value = String(url || '').trim();
  if(value === '#notes' || value === '#camera') return value;
  if(!value || value === '#') return '#';
  try{
    const parsed = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return ['http:','https:'].includes(parsed.protocol) ? parsed.href : '#';
  }catch(e){ return '#'; }
}
function safeIconUrl(url){
  const value = String(url || '').trim();
  if(!value) return '';
  if(/^data:image\/(?:png|jpe?g|gif|webp|svg\+xml)[;,]/i.test(value)) return value;
  try{
    const parsed = new URL(value, location.href);
    return ['http:','https:'].includes(parsed.protocol) ? parsed.href : '';
  }catch(e){ return ''; }
}
function escapeHtml(value){
  return String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
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
  'Ordenás mi caos.',
  'Eres responsable de mi sonrisa.',
  'Sonríe, yo invito.',
  'Tus labios mienten, tus ojos no.',
  'Todo vale la pena si te hace reír.',
  'Nunca te arrepientas de lo que hiciste por amor.',
  'Me fui a ser feliz, no sé cuándo vuelvo.',
  'Dibujaré sonrisas en tu boca.',
  'Enseñame el camino a besos.',
  'Te espero toda la vida.',
  'Toda historia de amor comienza cuando uno menos lo espera.',
  'Soy lo que ves, espero que sea suficiente.',
  'Quiero vivir en tu sonrisa.',
  'Tu mirada es mi atajo favorito.',
  'El tiempo se frena si me abrazás.',
  'Menos dudas y más latidos.',
  'Somos el eco de lo que callamos.',
  'Desafiá tus miedos.',
  'Tu risa es pura melodía.',
  'Contá las ganas, no los miedos.',
  'No busques respuestas, creá momentos.',
  'Sos la magia que mi mente necesitaba.',
  'En el ruido de la calle, tu silencio.',
  'Si no hay riesgo, no hay historia.',
  'Somos un borrador a punto de ser arte.',
  'Sos la coincidencia más exacta.',
  'Despertemos juntos antes que el sol.',
  'Si el camino es largo, que sea con vos.',
  'Hoy es tu día.',
  '¡Sos crack!',
  'Que los miedos no te detengan.'
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
  const img = safeIconUrl(presetIcon(item));
  const fallback = item.fallback || (item.name || '?').slice(0,2).toUpperCase();
  const dark = item.dark ? ' dark' : '';
  const draggable = opts.draggable && editMode ? 'draggable="true"' : '';
  const groupAttr = opts.group ? `data-group="${escapeHtml(opts.group)}" data-index="${Number(opts.index) || 0}"` : '';
  return `<button type="button" class="tile ${editMode ? 'editing' : ''}" data-id="${escapeHtml(item.id)}" data-url="${escapeHtml(normalizeUrl(item.url))}" ${groupAttr} ${draggable} title="${escapeHtml(item.name)}">
    ${editMode && opts.group ? `<span class="tile-delete" data-delete-group="${escapeHtml(opts.group)}" data-delete-index="${Number(opts.index) || 0}" title="Borrar acceso">×</span>` : ''}
    <span class="tile-icon${dark}">${img ? `<img src="${escapeHtml(img)}" alt="" loading="lazy" data-fallback="${escapeHtml(fallback)}">` : `<span class="letter">${escapeHtml(fallback)}</span>`}</span>
    <span class="tile-name">${escapeHtml(item.name)}</span>
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
    btn.type = 'button';
    btn.className = 'custom-tile' + (item ? ' filled' : '');
    btn.dataset.index = i;
    if(item){
      const img = safeIconUrl(item.icon || remoteFavicon(domainFromUrl(item.url)));
      const letter = (item.name || '?').slice(0,2).toUpperCase();
      const icon = document.createElement('span');
      icon.className = 'tile-icon';
      if(img){
        const image = document.createElement('img');
        image.src = img;
        image.alt = '';
        image.addEventListener('error', () => replaceBrokenImage(image,letter), {once:true});
        icon.appendChild(image);
      }else{
        const fallback = document.createElement('span');
        fallback.className = 'letter';
        fallback.textContent = letter;
        icon.appendChild(fallback);
      }
      const label = document.createElement('span');
      label.textContent = String(item.name || 'Acceso').slice(0,80);
      btn.append(icon,label);
    }else{
      btn.innerHTML = `<span class="plus">+</span><span>Agregar<br>acceso</span>`;
    }
    grid.appendChild(btn);
  }
}
function replaceBrokenImage(image,fallback){
  if(!image?.parentNode) return;
  const letter = document.createElement('span');
  letter.className = 'letter';
  letter.textContent = String(fallback || '?').slice(0,12);
  image.replaceWith(letter);
}
function domainFromUrl(url){
  try{return new URL(normalizeUrl(url)).hostname.replace(/^www\./,'')}catch(e){return ''}
}

function bindTiles(){
  document.querySelectorAll('img[data-fallback]').forEach(image => {
    image.addEventListener('error', () => replaceBrokenImage(image,image.dataset.fallback), {once:true});
  });
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
      if(editMode){
        const target = {group:btn.dataset.group,index:Number(btn.dataset.index)};
        if(!target.group || !Number.isInteger(target.index)) return false;
        if(!moveSelection){
          moveSelection = target;
          btn.classList.add('move-selected');
          btn.setAttribute('aria-pressed','true');
          return false;
        }
        const from = moveSelection;
        moveSelection = null;
        if(from.group === target.group && from.index === target.index){ renderAll(); return false; }
        moveItemByTouch(from,target);
        return false;
      }
      if(dragState){
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
  const key = 'ps_notes';
  const current = localStorage.getItem(key) || '';
  const value = prompt('Bloc de notas — se guarda solamente en este dispositivo:', current);
  if(value !== null){
    localStorage.setItem(key, value.slice(0,10000));
  }
  return false;
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
  openDialog(customDialog);
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
  openDialog(customDialog);
}

customForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = customName.value.trim().slice(0,80);
  const url = normalizeUrl(customUrl.value.trim());
  const icon = safeIconUrl(customIcon.value.trim());
  if(!name || url === '#'){
    alert('Ingresá un nombre y una URL web válida (http o https).');
    return;
  }
  if(currentAddGroup && groups[currentAddGroup]){
    const item = cleanGroupItem({name,url,domain:domainFromUrl(url),icon},currentAddGroup,groups[currentAddGroup].length);
    groups[currentAddGroup].push(item);
    saveGroupsState();
  }else{
    const arr = getCustom();
    arr[currentCustomIndex] = { name, url, icon };
    setCustom(arr);
  }
  currentAddGroup = null;
  closeDialog(customDialog);
  renderAll();
});
cancelCustomBtn.onclick = () => { currentAddGroup = null; closeDialog(customDialog); };
deleteCustomBtn.onclick = () => {
  const arr = getCustom();
  arr.splice(currentCustomIndex,1);
  setCustom(arr);
  currentAddGroup = null;
  closeDialog(customDialog);
  renderAll();
};

function bindDrag(){
  document.querySelectorAll('.tile[draggable="true"]').forEach(tile => {
    tile.addEventListener('dragstart', e => {
      dragState = { group:tile.dataset.group, index:Number(tile.dataset.index) };
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('application/x-puntosmart-item', JSON.stringify(dragState));
      e.dataTransfer.setData('text/plain', tile.dataset.id || 'puntosmart-item');
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
      const from = readDragLocation(e.dataTransfer);
      const targetIndex = Number(tile.dataset.index);
      if(from && tile.dataset.group && Number.isInteger(targetIndex)) moveItemToGroup(from, tile.dataset.group, targetIndex);
    });
  });

  document.querySelectorAll('.icon-grid,.mini-grid').forEach(grid => {
    const groupKey = grid.dataset.group;
    if(!groupKey || grid.dataset.dragBound === 'true') return;
    grid.dataset.dragBound = 'true';
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
      const from = readDragLocation(e.dataTransfer);
      if(from) moveItemToGroup(from, groupKey, null);
    });
  });
}
function readDragLocation(dataTransfer){
  try{
    const value = JSON.parse(dataTransfer.getData('application/x-puntosmart-item') || 'null');
    if(value && groups[value.group] && Number.isInteger(Number(value.index))) return {group:value.group,index:Number(value.index)};
  }catch(e){}
  return dragState;
}
function findItemLocation(id){
  for(const [k,arr] of Object.entries(groups)){
    const idx = arr.findIndex(it => it.id === id);
    if(idx >= 0) return {group:k, index:idx};
  }
  return null;
}
function moveItemToGroup(fromLocator,targetGroup,targetIndex=null){
  const from = typeof fromLocator === 'object' ? fromLocator : findItemLocation(fromLocator);
  if(!from || !targetGroup || !groups[targetGroup]) return;
  if(!groups[from.group] || !groups[from.group][from.index]) return;
  const item = groups[from.group].splice(from.index,1)[0];
  let insertIndex = groups[targetGroup].length;
  if(Number.isInteger(Number(targetIndex))) insertIndex = Math.max(0,Math.min(Number(targetIndex),groups[targetGroup].length));
  if(from.group === targetGroup && from.index < insertIndex) insertIndex--;
  groups[targetGroup].splice(insertIndex,0,item);
  saveGroupsState();
  renderAll();
}
function moveItemByTouch(from,target){
  if(from.group === target.group){
    const items = groups[from.group];
    if(!items?.[from.index] || !items?.[target.index]) return;
    [items[from.index],items[target.index]] = [items[target.index],items[from.index]];
    saveGroupsState();
    renderAll();
    return;
  }
  moveItemToGroup(from,target.group,target.index);
}
function swapItems(fromId,toId){
  const to = findItemLocation(toId);
  if(to) moveItemToGroup(fromId, to.group, to.index);
}

function openDialog(dialog){
  if(!dialog) return;
  if(typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open','');
}
function closeDialog(dialog){
  if(!dialog) return;
  if(typeof dialog.close === 'function') dialog.close();
  else dialog.removeAttribute('open');
}

editBtn.onclick = () => { editMode = !editMode; moveSelection = null; renderAll(); };
if(window.resetBtn){ resetBtn.onclick = () => {
  if(confirm('¿Restaurar accesos personalizados, orden de secciones y recargar la maqueta?')){ localStorage.removeItem('ps_custom_tiles'); localStorage.removeItem(LS_GROUPS_STATE); location.reload(); }
}; }
howBtn.onclick = () => openDialog(infoDialog);
closeInfoBtn.onclick = () => closeDialog(infoDialog);
supportBtn.onclick = () => openSmartUrl('https://wa.me/5491148706501?text=Hola%2C%20necesito%20soporte%20con%20Punto%20Smart%20OS');
suggestBtn.onclick = () => openSmartUrl('https://wa.me/5491148706501?text=Hola%2C%20quiero%20sugerir%20un%20acceso%20para%20Punto%20Smart%20OS');

Object.keys(folderNames).forEach(key => {
  document.querySelector(`[data-folder="${key}"] .folder-open`)?.addEventListener('click', () => openFolder(key));
});
function openFolder(key){
  folderTitle.textContent = folderNames[key];
  folderModalGrid.innerHTML = groups[key].map(i => tileHTML(i)).join('');
  openDialog(folderDialog);
  bindTiles();
}
closeFolderBtn.onclick = () => closeDialog(folderDialog);

let smartSearchCategory = 'web';
const SMART_SEARCH_STORAGE = 'psos_search_providers_v2';
const SMART_SEARCH_CATEGORY_STORAGE = 'psos_search_category_v2';
const SMART_ICON_BASE = PRESET_ICON_BASE;
const smartRemoteIcon = domain => `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(`https://${domain}`)}&sz=128`;
const smartProviderIcon = (localFile, domain) => localFile ? `${SMART_ICON_BASE}${localFile}` : smartRemoteIcon(domain);
const smartSearchProviders = {
  web: [
    {id:'google',name:'Google',icon:smartProviderIcon('google-com.png','google.com'),home:'https://www.google.com/',search:q=>`https://www.google.com/search?q=${encodeURIComponent(q)}`,placeholder:'Buscar en Google...'},
    {id:'bing',name:'Bing',icon:smartProviderIcon('', 'bing.com'),home:'https://www.bing.com/',search:q=>`https://www.bing.com/search?q=${encodeURIComponent(q)}`,placeholder:'Buscar en Bing...'},
    {id:'yahoo',name:'Yahoo',icon:smartProviderIcon('', 'yahoo.com'),home:'https://search.yahoo.com/',search:q=>`https://search.yahoo.com/search?p=${encodeURIComponent(q)}`,placeholder:'Buscar en Yahoo...'}
  ],
  ai: [
    {id:'chatgpt',name:'ChatGPT',icon:smartProviderIcon('chatgpt-com.png','chatgpt.com'),home:'https://chatgpt.com/',search:q=>`https://chatgpt.com/?q=${encodeURIComponent(q)}`,placeholder:'Preguntarle a ChatGPT...'},
    {id:'claude',name:'Claude',icon:smartProviderIcon('claude-ai.png','claude.ai'),home:'https://claude.ai/new',search:q=>`https://claude.ai/new?q=${encodeURIComponent(q)}`,placeholder:'Preguntarle a Claude...'},
    {id:'gemini',name:'Gemini',icon:smartProviderIcon('gemini-google-com.png','gemini.google.com'),home:'https://gemini.google.com/app',search:q=>`https://gemini.google.com/app?prompt=${encodeURIComponent(q)}`,placeholder:'Preguntarle a Gemini...'},
    {id:'perplexity',name:'Perplexity',icon:smartProviderIcon('', 'perplexity.ai'),home:'https://www.perplexity.ai/',search:q=>`https://www.perplexity.ai/search/new?q=${encodeURIComponent(q)}`,placeholder:'Buscar con Perplexity...'},
    {id:'meta',name:'Meta AI',icon:smartProviderIcon('', 'meta.ai'),home:'https://www.meta.ai/',search:q=>`https://www.meta.ai/?prompt=${encodeURIComponent(q)}`,placeholder:'Preguntarle a Meta AI...'},
    {id:'copilot',name:'Copilot',icon:smartProviderIcon('', 'copilot.microsoft.com'),home:'https://copilot.microsoft.com/',search:q=>`https://copilot.microsoft.com/?q=${encodeURIComponent(q)}`,placeholder:'Preguntarle a Copilot...'}
  ],
  videos: [
    {id:'youtube',name:'YouTube',icon:smartProviderIcon('youtube-com.png','youtube.com'),home:'https://www.youtube.com/',search:q=>`https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`,placeholder:'Buscar videos en YouTube...'}
  ],
  buy: [
    {id:'google-shopping',name:'Google',icon:smartProviderIcon('google-com.png','google.com'),home:'https://www.google.com/',search:q=>`https://www.google.com/search?q=${encodeURIComponent(q)}`,placeholder:'Buscar productos en Google...'}
  ],
  news: [
    {id:'google-news',name:'Google Noticias',icon:smartProviderIcon('', 'news.google.com'),home:'https://news.google.com/topstories?hl=es-419&gl=AR&ceid=AR:es-419',search:q=>`https://news.google.com/search?q=${encodeURIComponent(q)}&hl=es-419&gl=AR&ceid=AR:es-419`,placeholder:'Buscar noticias en Google Noticias...'},
    {id:'infobae',name:'Infobae',icon:smartProviderIcon('infobae-com.png','infobae.com'),home:'https://www.infobae.com/',search:q=>`https://www.google.com/search?q=${encodeURIComponent(`site:infobae.com ${q}`)}`,placeholder:'Buscar noticias en Infobae...'},
    {id:'clarin',name:'Clarín',icon:smartProviderIcon('clarin-com.png','clarin.com'),home:'https://www.clarin.com/',search:q=>`https://www.google.com/search?q=${encodeURIComponent(`site:clarin.com ${q}`)}`,placeholder:'Buscar noticias en Clarín...'},
    {id:'pagina12',name:'Página/12',icon:smartProviderIcon('', 'pagina12.com.ar'),home:'https://www.pagina12.com.ar/',search:q=>`https://www.google.com/search?q=${encodeURIComponent(`site:pagina12.com.ar ${q}`)}`,placeholder:'Buscar noticias en Página/12...'},
    {id:'eldestape',name:'El Destape',icon:smartProviderIcon('', 'eldestapeweb.com'),home:'https://www.eldestapeweb.com/',search:q=>`https://www.google.com/search?q=${encodeURIComponent(`site:eldestapeweb.com ${q}`)}`,placeholder:'Buscar noticias en El Destape...'},
    {id:'lanacion',name:'La Nación',icon:smartProviderIcon('lanacion-com-ar.png','lanacion.com.ar'),home:'https://www.lanacion.com.ar/',search:q=>`https://www.google.com/search?q=${encodeURIComponent(`site:lanacion.com.ar ${q}`)}`,placeholder:'Buscar noticias en La Nación...'}
  ],
  maps: [
    {id:'google-maps',name:'Google Maps',icon:smartProviderIcon('maps-google-com.png','maps.google.com'),home:'https://www.google.com/maps',search:q=>`https://www.google.com/maps/search/${encodeURIComponent(q)}`,placeholder:'Buscar lugares en Google Maps...'}
  ]
};
const smartCategoryLabels = {web:'Web',ai:'IA',videos:'Videos',buy:'Comprar',news:'Noticias',maps:'Maps'};
let smartProviderSelections = {};
try{ smartProviderSelections = JSON.parse(localStorage.getItem(SMART_SEARCH_STORAGE) || '{}') || {}; }catch(e){ smartProviderSelections = {}; }
Object.entries(smartSearchProviders).forEach(([category,providers])=>{
  if(!providers.some(p=>p.id===smartProviderSelections[category])) smartProviderSelections[category]=providers[0].id;
});
try{
  const savedCategory = localStorage.getItem(SMART_SEARCH_CATEGORY_STORAGE);
  if(savedCategory && smartSearchProviders[savedCategory]) smartSearchCategory = savedCategory;
}catch(e){}
function smartProvider(category=smartSearchCategory){
  const providers = smartSearchProviders[category] || smartSearchProviders.web;
  return providers.find(p=>p.id===smartProviderSelections[category]) || providers[0];
}
function closeSmartProviderMenus(except=''){
  document.querySelectorAll('.search-provider-menu').forEach(menu=>{
    const shouldStay = except && menu.dataset.providerMenu===except;
    menu.classList.toggle('open',!!shouldStay);
  });
  document.querySelectorAll('.search-category').forEach(btn=>btn.setAttribute('aria-expanded',String(!!except && btn.dataset.category===except)));
}
function updateSmartSearchUI(){
  const provider = smartProvider();
  document.querySelectorAll('.search-category').forEach(btn=>{
    const active = btn.dataset.category===smartSearchCategory;
    btn.classList.toggle('active',active);
    const icon = btn.querySelector('.search-category-icon');
    const current = smartProvider(btn.dataset.category);
    if(icon){ icon.src=current.icon; icon.alt=''; }
  });
  if(searchInput) searchInput.placeholder = provider.placeholder;
  const activeIcon = document.getElementById('activeSearchIcon');
  const activeName = document.getElementById('activeSearchProvider');
  if(activeIcon){ activeIcon.src=provider.icon; activeIcon.alt=''; }
  if(activeName) activeName.textContent=provider.name;
  try{
    localStorage.setItem(SMART_SEARCH_STORAGE,JSON.stringify(smartProviderSelections));
    localStorage.setItem(SMART_SEARCH_CATEGORY_STORAGE,smartSearchCategory);
  }catch(e){}
}
function renderSmartProviderMenus(){
  document.querySelectorAll('[data-provider-menu]').forEach(menu=>{
    const category = menu.dataset.providerMenu;
    const selected = smartProviderSelections[category];
    menu.innerHTML = (smartSearchProviders[category] || []).map(provider=>`<button type="button" class="search-provider-option${provider.id===selected?' selected':''}" data-category="${category}" data-provider="${provider.id}" role="menuitem"><img src="${provider.icon}" alt="" aria-hidden="true"><span>${provider.name}</span></button>`).join('');
  });
  document.querySelectorAll('.search-provider-option').forEach(option=>option.addEventListener('click',event=>{
    event.stopPropagation();
    smartProviderSelections[option.dataset.category]=option.dataset.provider;
    smartSearchCategory=option.dataset.category;
    renderSmartProviderMenus();
    updateSmartSearchUI();
    closeSmartProviderMenus();
    searchInput?.focus();
  }));
}
function setSmartSearchCategory(category,openMenu=false){
  if(!smartSearchProviders[category]) return;
  smartSearchCategory=category;
  updateSmartSearchUI();
  if(openMenu){
    const menu=document.querySelector(`[data-provider-menu="${category}"]`);
    const open=!(menu?.classList.contains('open'));
    closeSmartProviderMenus(open?category:'');
  }else closeSmartProviderMenus();
  searchInput?.focus();
}
const smartQuickCommands = {
  gg:['web','google'],google:['web','google'],bing:['web','bing'],yahoo:['web','yahoo'],
  gpt:['ai','chatgpt'],chatgpt:['ai','chatgpt'],claude:['ai','claude'],gemini:['ai','gemini'],pplx:['ai','perplexity'],perplexity:['ai','perplexity'],meta:['ai','meta'],copilot:['ai','copilot'],
  yt:['videos','youtube'],youtube:['videos','youtube'],comprar:['buy','google-shopping'],shop:['buy','google-shopping'],
  news:['news','google-news'],noticias:['news','google-news'],infobae:['news','infobae'],clarin:['news','clarin'],pagina12:['news','pagina12'],eldestape:['news','eldestape'],lanacion:['news','lanacion'],
  maps:['maps','google-maps'],mapa:['maps','google-maps']
};
function parseSmartQuickCommand(value){
  const match=String(value||'').trim().match(/^([a-z0-9]+)(?:\s+|:\s*)(.*)$/i);
  if(!match) return null;
  const target=smartQuickCommands[match[1].toLowerCase()];
  return target?{category:target[0],provider:target[1],query:match[2].trim()}:null;
}
function buildSmartSearchUrl(category,providerId,query){
  const providers=smartSearchProviders[category]||smartSearchProviders.web;
  const provider=providers.find(p=>p.id===providerId)||providers[0];
  const q=String(query||'').trim();
  return q?provider.search(q):provider.home;
}
function filterTiles(query){
  const q=cleanText(query);
  document.querySelectorAll('.tile,.custom-tile').forEach(el=>{
    const text=cleanText(el.textContent);
    el.classList.toggle('hidden-search',!!q&&!text.includes(q));
  });
}
document.querySelectorAll('.search-category').forEach(btn=>btn.addEventListener('click',event=>{
  event.stopPropagation();
  setSmartSearchCategory(btn.dataset.category,true);
}));
document.addEventListener('click',()=>closeSmartProviderMenus());
document.addEventListener('keydown',event=>{ if(event.key==='Escape') closeSmartProviderMenus(); });
searchInput?.addEventListener('input',event=>filterTiles(event.target.value));
smartSearchForm?.addEventListener('submit',event=>{
  event.preventDefault();
  let q=searchInput.value.trim();
  const command=parseSmartQuickCommand(q);
  if(command){
    smartSearchCategory=command.category;
    smartProviderSelections[command.category]=command.provider;
    q=command.query;
    renderSmartProviderMenus();
    updateSmartSearchUI();
  }
  const provider=smartProvider();
  openSmartUrl(buildSmartSearchUrl(smartSearchCategory,provider.id,q));
});
renderSmartProviderMenus();
updateSmartSearchUI();

// Los motores reciben la imagen en sus propias interfaces. Sin backend no es seguro
// ni estable reenviar archivos locales a servicios externos desde Punto Smart OS.
const visualSearchDialog = document.getElementById('visualSearchDialog');
const visualSearchButton = document.getElementById('visualSearchBtn');
const closeVisualSearchButton = document.getElementById('closeVisualSearchBtn');
const visualSearchAllButton = document.getElementById('visualSearchAllBtn');
const visualSearchNote = document.getElementById('visualSearchNote');
const visualSearchServices = Object.freeze({
  google:{name:'Google Lens',url:'https://lens.google/'},
  bing:{name:'Bing Visual Search',url:'https://www.bing.com/images/'},
  tineye:{name:'TinEye',url:'https://tineye.com/'},
  yandex:{name:'Yandex Images',url:'https://yandex.com/images/'}
});
function launchVisualSearch(serviceId){
  const service = visualSearchServices[serviceId];
  if(!service) return;
  openSmartUrl(service.url);
  if(visualSearchNote) visualSearchNote.textContent = `Se abrió ${service.name}. Subí la imagen directamente allí para iniciar la búsqueda.`;
}
function launchAllVisualSearches(){
  Object.keys(visualSearchServices).forEach(serviceId => launchVisualSearch(serviceId));
  if(visualSearchNote) visualSearchNote.textContent = 'Abrimos los cuatro buscadores. Si el navegador bloqueó alguna pestaña, podés abrirla desde esta lista.';
}
visualSearchButton?.addEventListener('click', () => openDialog(visualSearchDialog));
closeVisualSearchButton?.addEventListener('click', () => closeDialog(visualSearchDialog));
document.querySelectorAll('[data-visual-provider]').forEach(button => {
  button.addEventListener('click', () => launchVisualSearch(button.dataset.visualProvider));
});
visualSearchAllButton?.addEventListener('click', launchAllVisualSearches);

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
    openDialog(dialog);
  };
  close && (close.onclick = () => dialog.close());
}



/* v13: clima y dólar en vivo */
function psosReadCache(key, maxAgeMs){
  try{
    const raw = localStorage.getItem(key);
    if(!raw) return null;
    const parsed = JSON.parse(raw);
    if(!parsed || !parsed.savedAt || (Date.now() - parsed.savedAt) > maxAgeMs) return null;
    return parsed.data;
  }catch(e){ return null; }
}
function psosWriteCache(key, data){
  try{ localStorage.setItem(key, JSON.stringify({savedAt:Date.now(), data})); }catch(e){}
}
function psosWeatherInfo(code){
  const c = Number(code);
  if(c === 0) return {icon:'☀', text:'Despejado'};
  if(c === 1) return {icon:'🌤', text:'Mayormente despejado'};
  if(c === 2) return {icon:'⛅', text:'Parcialmente nublado'};
  if(c === 3) return {icon:'☁', text:'Nublado'};
  if(c === 45 || c === 48) return {icon:'🌫', text:'Niebla'};
  if([51,53,55,56,57].includes(c)) return {icon:'🌦', text:'Llovizna'};
  if([61,63,65,66,67,80,81,82].includes(c)) return {icon:'🌧', text:'Lluvia'};
  if([71,73,75,77,85,86].includes(c)) return {icon:'❄', text:'Nieve'};
  if([95,96,99].includes(c)) return {icon:'⛈', text:'Tormenta'};
  return {icon:'☁', text:'Clima'};
}
function psosRound(value){
  const n = Number(value);
  return Number.isFinite(n) ? Math.round(n) : '--';
}
function psosFormatArs(value){
  const n = Number(value);
  if(!Number.isFinite(n)) return '--';
  return new Intl.NumberFormat('es-AR',{maximumFractionDigits:0}).format(n);
}
function psosSetWeather(data, label){
  const widget = document.getElementById('weatherWidget');
  const icon = document.getElementById('weatherIcon');
  const temp = document.getElementById('weatherTemp');
  const detail = document.getElementById('weatherDetail');
  if(!widget || !icon || !temp || !detail || !data) return;
  const current = data.current || {};
  const daily = data.daily || {};
  const info = psosWeatherInfo(current.weather_code);
  icon.textContent = info.icon;
  temp.textContent = `${psosRound(current.temperature_2m)}° ${info.text}`;
  const max = daily.temperature_2m_max && daily.temperature_2m_max[0];
  const min = daily.temperature_2m_min && daily.temperature_2m_min[0];
  detail.textContent = `${label} · Máx ${psosRound(max)}° / Mín ${psosRound(min)}° · Open-Meteo`;
  widget.title = `Sensación térmica: ${psosRound(current.apparent_temperature)}°. Tocá para usar tu ubicación. Datos: Open-Meteo.`;
  widget.classList.remove('is-loading','is-error');
}
async function psosLoadWeather(lat=-34.6037, lon=-58.3816, label='Buenos Aires', force=false){
  const widget = document.getElementById('weatherWidget');
  const detail = document.getElementById('weatherDetail');
  if(!widget || !detail) return;
  const cacheKey = `psos_weather_${lat.toFixed(2)}_${lon.toFixed(2)}`;
  if(!force){
    const cached = psosReadCache(cacheKey, 20*60*1000);
    if(cached){ psosSetWeather(cached, label); return; }
  }
  widget.classList.add('is-loading');
  detail.textContent = `${label} · Actualizando…`;
  try{
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lon)}&current=temperature_2m,apparent_temperature,weather_code&daily=temperature_2m_max,temperature_2m_min&temperature_unit=celsius&timezone=auto&forecast_days=1`;
    const response = await fetch(url,{cache:'no-store'});
    if(!response.ok) throw new Error('weather');
    const data = await response.json();
    psosWriteCache(cacheKey, data);
    psosSetWeather(data, label);
  }catch(e){
    const stale = psosReadCache(cacheKey, 7*24*60*60*1000);
    if(stale){ psosSetWeather(stale, label); return; }
    widget.classList.remove('is-loading');
    widget.classList.add('is-error');
    detail.textContent = `${label} · No disponible`;
  }
}
function psosUseLocation(){
  const widget = document.getElementById('weatherWidget');
  const detail = document.getElementById('weatherDetail');
  if(!navigator.geolocation){
    if(detail) detail.textContent = 'Ubicación no disponible';
    return;
  }
  widget?.classList.add('is-loading');
  if(detail) detail.textContent = 'Buscando tu ubicación…';
  navigator.geolocation.getCurrentPosition(
    pos => {
      const location = {lat:pos.coords.latitude, lon:pos.coords.longitude, label:'Tu ubicación'};
      try{ localStorage.setItem('psos_weather_location', JSON.stringify(location)); }catch(e){}
      psosLoadWeather(location.lat, location.lon, location.label, true);
    },
    () => {
      widget?.classList.remove('is-loading');
      if(detail) detail.textContent = 'Buenos Aires · Ubicación no autorizada';
      psosLoadWeather(-34.6037,-58.3816,'Buenos Aires');
    },
    {enableHighAccuracy:false, timeout:9000, maximumAge:30*60*1000}
  );
}
function psosSetDollar(oficial, blue){
  const widget = document.getElementById('dollarWidget');
  const oficialEl = document.getElementById('dollarOfficial');
  const blueEl = document.getElementById('dollarBlue');
  if(!widget || !oficialEl || !blueEl) return;
  blueEl.textContent = `Blue $${psosFormatArs(blue.venta)}`;
  oficialEl.textContent = `Oficial $${psosFormatArs(oficial.venta)} · DolarAPI`;
  const updated = new Date(blue.fechaActualizacion || oficial.fechaActualizacion || Date.now());
  widget.title = `Oficial: compra $${psosFormatArs(oficial.compra)} / venta $${psosFormatArs(oficial.venta)}. Blue: compra $${psosFormatArs(blue.compra)} / venta $${psosFormatArs(blue.venta)}. Actualizado ${updated.toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit'})}. Tocá para actualizar.`;
  widget.classList.remove('is-loading','is-error');
}
async function psosLoadDollar(force=false){
  const widget = document.getElementById('dollarWidget');
  const blueEl = document.getElementById('dollarBlue');
  if(!widget || !blueEl) return;
  const cacheKey = 'psos_dollar_oficial_blue';
  if(!force){
    const cached = psosReadCache(cacheKey, 10*60*1000);
    if(cached){ psosSetDollar(cached.oficial,cached.blue); return; }
  }
  widget.classList.add('is-loading');
  blueEl.textContent = 'Blue -- · Actualizando…';
  try{
    const [oficialResponse, blueResponse] = await Promise.all([
      fetch('https://dolarapi.com/v1/dolares/oficial',{cache:'no-store'}),
      fetch('https://dolarapi.com/v1/dolares/blue',{cache:'no-store'})
    ]);
    if(!oficialResponse.ok || !blueResponse.ok) throw new Error('dollar');
    const [oficial, blue] = await Promise.all([oficialResponse.json(),blueResponse.json()]);
    psosWriteCache(cacheKey,{oficial,blue});
    psosSetDollar(oficial,blue);
  }catch(e){
    const stale = psosReadCache(cacheKey, 7*24*60*60*1000);
    if(stale){ psosSetDollar(stale.oficial,stale.blue); return; }
    widget.classList.remove('is-loading');
    widget.classList.add('is-error');
    blueEl.textContent = 'Cotización no disponible';
  }
}
function initLiveStatus(){
  const weatherWidget = document.getElementById('weatherWidget');
  const dollarWidget = document.getElementById('dollarWidget');
  let location = null;
  try{ location = JSON.parse(localStorage.getItem('psos_weather_location') || 'null'); }catch(e){}
  if(location && Number.isFinite(Number(location.lat)) && Number.isFinite(Number(location.lon))){
    psosLoadWeather(Number(location.lat),Number(location.lon),location.label || 'Tu ubicación');
  }else{
    psosLoadWeather();
  }
  psosLoadDollar();
  weatherWidget?.addEventListener('click', psosUseLocation);
  dollarWidget?.addEventListener('click', () => window.open('https://dolarhoy.com/','_blank','noopener'));
}

function tick(){
  const now = new Date();
  clock.textContent = now.toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit'});
  dateText.textContent = now.toLocaleDateString('es-AR',{weekday:'long',day:'numeric',month:'long'}).replace(/^./,c=>c.toUpperCase());
}
restoreGroupsState();
initDailyPhrase();
initPlusAbTest();
initLiveStatus();
setInterval(tick,1000); tick(); renderAll();


function initLocalCountrySelector(){
  const sel = document.getElementById('localCountrySelect');
  if(!sel) return;
  sel.onchange = () => {
    if(sel.value) location.href = sel.value;
  };
}
initLocalCountrySelector();
