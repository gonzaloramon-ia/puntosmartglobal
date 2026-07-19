import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {JSDOM,ResourceLoader,VirtualConsole} from 'jsdom';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');

class LocalLoader extends ResourceLoader{
  async fetch(url){
    const parsed=new URL(url);
    if(parsed.hostname !== 'puntosmart.test') return null;
    const relative=decodeURIComponent(parsed.pathname).replace(/^\//,'');
    const target=path.join(root,relative || 'index.html');
    try{return Buffer.from(await readFile(target));}catch{return null;}
  }
}

function fakeFetch(url){
  const value=String(url);
  if(value.includes('open-meteo.com')) return Promise.resolve(new Response(JSON.stringify({current:{temperature_2m:22,apparent_temperature:22,weather_code:1},daily:{temperature_2m_max:[25],temperature_2m_min:[18]}}),{status:200}));
  if(value.includes('dolarapi.com')) return Promise.resolve(new Response(JSON.stringify({compra:1400,venta:1500,fechaActualizacion:new Date().toISOString()}),{status:200}));
  if(value.includes('frankfurter.dev')) return Promise.resolve(new Response(JSON.stringify({date:'2026-07-17',rates:{USD:1.15,EUR:.87,MXN:18.4,BRL:5.5}}),{status:200}));
  return Promise.reject(new Error(`Unexpected fetch: ${value}`));
}

async function loadPage(route,setup=()=>{}){
  const htmlPath=path.join(root,route.split('?')[0].replace(/^\//,'') || 'index.html');
  const html=await readFile(htmlPath,'utf8');
  const errors=[];
  const virtualConsole=new VirtualConsole();
  virtualConsole.on('jsdomError',error=>errors.push(error));
  const dom=new JSDOM(html,{
    url:`https://puntosmart.test${route}`,
    runScripts:'dangerously',
    resources:new LocalLoader(),
    pretendToBeVisual:true,
    virtualConsole,
    beforeParse(window){
      window.fetch=fakeFetch;
      window.open=()=>null;
      window.alert=()=>{};
      window.confirm=()=>true;
      window.prompt=(_message,value='')=>value;
      window.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){}});
      if(window.HTMLDialogElement){
        window.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
        window.HTMLDialogElement.prototype.close=function(){this.open=false;};
      }
      setup(window);
    }
  });
  await new Promise(resolve=>dom.window.addEventListener('load',()=>setTimeout(resolve,80),{once:true}));
  return {dom,errors};
}

test('Free renderiza IDs únicos y reordena también con clic/touch',async()=>{
  const {dom,errors}=await loadPage('/index.html');
  const {document}=dom.window;
  assert.equal(errors.length,0,errors.map(error=>error.message).join('\n'));
  const ids=[...document.querySelectorAll('.tile[data-id]')].map(tile=>tile.dataset.id);
  assert.equal(ids.length,new Set(ids).size,'Los IDs renderizados deben ser únicos.');
  document.getElementById('editBtn').click();
  const firstTwo=[...document.querySelectorAll('#favoritesGrid .tile[data-id]')].slice(0,2);
  const before=firstTwo.map(tile=>tile.dataset.id);
  firstTwo[0].click();
  assert(firstTwo[0].classList.contains('move-selected'));
  firstTwo[1].click();
  const after=[...document.querySelectorAll('#favoritesGrid .tile[data-id]')].slice(0,2).map(tile=>tile.dataset.id);
  assert.deepEqual(after,[before[1],before[0]]);
  dom.window.close();
});

test('Los accesos personalizados se muestran como texto, sin ejecutar HTML',async()=>{
  const {dom}=await loadPage('/index.html');
  const {document,Event}=dom.window;
  document.querySelector('.custom-tile').click();
  document.getElementById('customName').value='<img data-xss src=x>Seguro';
  document.getElementById('customUrl').value='https://example.com/';
  document.getElementById('customForm').dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));
  assert.equal(document.querySelector('[data-xss]'),null);
  assert.match(document.querySelector('.custom-tile').textContent,/<img data-xss src=x>Seguro/);
  assert.match(document.querySelector('.custom-tile img').src,/google\.com\/s2\/favicons\?domain_url=/);
  dom.window.close();
});

test('La instalación como app queda visible y ofrece instrucciones de respaldo',async()=>{
  const {dom}=await loadPage('/index.html');
  const {document}=dom.window;
  const button=document.querySelector('[data-install-app]');
  assert(button && !button.hidden);
  button.click();
  assert(document.querySelector('.install-dialog').open);
  assert.match(document.querySelector('[data-install-message]').textContent,/menú del navegador/i);
  dom.window.close();
});

test('Una configuración legacy migra al esquema actual sin bloquear nuevos defaults',async()=>{
  const legacy={favorites:[{id:'google',name:'Google',url:'https://www.google.com/',domain:'google.com'}]};
  const {dom}=await loadPage('/index.html',window=>window.localStorage.setItem('ps_groups_state',JSON.stringify(legacy)));
  const saved=JSON.parse(dom.window.localStorage.getItem('ps_groups_state'));
  assert.equal(saved.schemaVersion,3);
  assert(saved.groups.favorites.length>1,'La migración debe sumar defaults posteriores.');
  assert(saved.groups.favorites.every(item=>item.id.startsWith('favorites:')));
  dom.window.close();
});

test('Plus exige reconexión tras recargar y el reset cancelado conserva los datos',async()=>{
  const {dom}=await loadPage('/plus/app/index.html',window=>{
    window.localStorage.setItem('ps_plus_connected','1');
    window.confirm=()=>false;
  });
  const {document,localStorage}=dom.window;
  assert.equal(document.getElementById('plusSmall').textContent,'Drive');
  assert.match(document.getElementById('plusStatus').textContent,/Reconectá/);
  assert(document.getElementById('exportConfigBtn'));
  localStorage.setItem('ps_groups_state','dato-que-no-debe-borrarse');
  document.getElementById('resetBtn').click();
  assert.equal(localStorage.getItem('ps_groups_state'),'dato-que-no-debe-borrarse');
  dom.window.close();
});

for(const country of ['BR','FR']){
  test(`Global ${country} completa clima, moneda y metadata`,async()=>{
    const {dom,errors}=await loadPage(`/global/index.html?country=${country}`);
    const {document}=dom.window;
    await new Promise(resolve=>setTimeout(resolve,40));
    assert.equal(errors.length,0,errors.map(error=>error.message).join('\n'));
    assert(!document.getElementById('globalCurrencySub').textContent.includes('Cargando'));
    assert(!document.getElementById('globalWeatherSub').textContent.includes('Cargando'));
    assert(country==='BR' ? /Brasil/.test(document.title) : /France/.test(document.title));
    assert.match(document.querySelector('.bottom-ad').getAttribute('href'),/^mailto:/);
    assert.match(document.querySelector('#favoritesGrid .tile img').src,/\/assets\/icons\//);
    assert.equal(document.querySelectorAll('.tile img[src*="google.com/s2/favicons"]').length,0);
    assert.match(document.getElementById('resetBtn').textContent,/↺/);
    document.querySelector('.engine-pill[data-engine="soporte"]').click();
    assert(document.getElementById('contactDialog').open,'Soporte debe abrir el contacto interno.');
    document.getElementById('dismissContactBtn').click();
    document.getElementById('suggestBtn').click();
    assert(document.getElementById('contactDialog').open,'Sugerencias debe abrir el contacto interno.');
    assert.match(document.getElementById('contactEmail').value,/punto\.smart\.arg@gmail\.com/);
    dom.window.close();
  });
}
