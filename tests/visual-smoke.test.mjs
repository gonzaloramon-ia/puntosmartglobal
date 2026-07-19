import test from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import puppeteer from 'puppeteer-core';

// El sandbox de CI no permite chown aunque el proceso informe uid 0.
const originalGetuid=process.getuid;
Object.defineProperty(process,'getuid',{value:()=>1000,configurable:true});
const {default:chromium}=await import('@sparticuz/chromium');

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.xml':'application/xml'};

const server=createServer(async(request,response)=>{
  try{
    const url=new URL(request.url,'http://localhost');
    let target=path.resolve(root,'.'+decodeURIComponent(url.pathname));
    if(!target.startsWith(root)) throw new Error('invalid path');
    const info=await stat(target);
    if(info.isDirectory()) target=path.join(target,'index.html');
    response.writeHead(200,{'content-type':types[path.extname(target)] || 'application/octet-stream'});
    response.end(await readFile(target));
  }catch{
    response.writeHead(404);
    response.end('Not found');
  }
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}`;

const browser=await puppeteer.launch({
  args:chromium.args,
  defaultViewport:null,
  executablePath:await chromium.executablePath(),
  headless:true
});
if(originalGetuid) Object.defineProperty(process,'getuid',{value:originalGetuid,configurable:true});

test.after(async()=>{
  await browser.close();
  await new Promise(resolve=>server.close(resolve));
});

async function open(route,width,height){
  const page=await browser.newPage();
  await page.setViewport({width,height,deviceScaleFactor:1,isMobile:width<=620,hasTouch:width<=620});
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.setRequestInterception(true);
  page.on('request',request=>{
    const url=request.url();
    if(url.includes('api.open-meteo.com')) return request.respond({status:200,contentType:'application/json',body:JSON.stringify({current:{temperature_2m:22,apparent_temperature:22,weather_code:1},daily:{temperature_2m_max:[25],temperature_2m_min:[18]}})});
    if(url.includes('dolarapi.com')) return request.respond({status:200,contentType:'application/json',body:JSON.stringify({compra:1400,venta:1500,fechaActualizacion:new Date().toISOString()})});
    if(url.includes('frankfurter.dev')) return request.respond({status:200,contentType:'application/json',body:JSON.stringify({date:'2026-07-17',rates:{USD:1.15,EUR:.87,MXN:18.4,BRL:5.5}})});
    if(url.includes('www.google.com/s2/favicons')) return request.respond({status:200,contentType:'image/svg+xml',body:'<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><rect width="32" height="32" rx="7" fill="#168cff"/></svg>'});
    if(url.includes('accounts.google.com/gsi/client')) return request.respond({status:200,contentType:'text/javascript',body:''});
    if(!url.startsWith(base)) return request.abort();
    request.continue();
  });
  await page.goto(base+route,{waitUntil:'domcontentloaded'});
  await new Promise(resolve=>setTimeout(resolve,180));
  return {page,errors};
}

for(const viewport of [{width:360,height:800},{width:768,height:1024},{width:1366,height:768}]){
  test(`Free no desborda en ${viewport.width}px y mantiene controles visibles`,async()=>{
    const {page,errors}=await open('/',viewport.width,viewport.height);
    const layout=await page.evaluate(()=>{
      const gear=document.getElementById('resetBtn');
      const edit=document.getElementById('editBtn');
      return {
        viewport:document.documentElement.clientWidth,
        scroll:document.documentElement.scrollWidth,
        gearDisplay:getComputedStyle(gear).display,
        gearWidth:gear.getBoundingClientRect().width,
        editPosition:getComputedStyle(edit).position,
        editInsideFooter:edit.closest('.footer') !== null,
        headerOverlaps:(items=>items.flatMap((item,index)=>items.slice(index+1).flatMap(other=>{
          const horizontal=item.rect.left < other.rect.right-1 && item.rect.right > other.rect.left+1;
          const vertical=item.rect.top < other.rect.bottom-1 && item.rect.bottom > other.rect.top+1;
          return horizontal && vertical ? [`${item.name} / ${other.name}`] : [];
        })))([...document.querySelectorAll('.topbar > .brand,.status-zone > *')]
          .filter(element=>getComputedStyle(element).display!=='none')
          .map(element=>({name:element.id || element.className,rect:element.getBoundingClientRect()})))
      };
    });
    assert.equal(errors.length,0,errors.join('\n'));
    assert(layout.scroll<=layout.viewport+1,`Overflow ${layout.scroll-layout.viewport}px`);
    assert.notEqual(layout.gearDisplay,'none');
    assert(layout.gearWidth>=40,`Reset demasiado pequeño: ${layout.gearWidth}px`);
    assert.equal(layout.editPosition,'static');
    assert(layout.editInsideFooter);
    assert.deepEqual(layout.headerOverlaps,[],`Controles superpuestos: ${layout.headerOverlaps.join(', ')}`);
    await page.screenshot({path:`/tmp/puntosmart-free-${viewport.width}.png`,fullPage:true});
    await page.close();
  });
}

for(const country of ['BR','FR']){
  test(`Global ${country} muestra datos live sin quedar cargando`,async()=>{
    const {page,errors}=await open(`/global/?country=${country}`,390,844);
    const state=await page.evaluate(()=>({
      overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,
      weather:document.getElementById('globalWeatherSub').textContent,
      currency:document.getElementById('globalCurrencySub').textContent,
      title:document.title,
      remoteFavicons:document.querySelectorAll('.tile img[src*="google.com/s2/favicons"]').length,
      localIcons:document.querySelectorAll('.tile img[src*="/assets/icons/"]').length,
      whatsapp:[...document.querySelectorAll('.tile')].find(tile=>tile.textContent.includes('WhatsApp'))?.querySelector('img')?.src
    }));
    assert.equal(errors.length,0,errors.join('\n'));
    assert(state.overflow<=1);
    assert(!state.weather.includes('Cargando'));
    assert(!state.currency.includes('Cargando'));
    assert(country==='BR' ? /Brasil/.test(state.title) : /France/.test(state.title));
    assert.equal(state.remoteFavicons,0,'Los accesos fijos no deben consultar favicons remotos.');
    assert(state.localIcons>20,`Se esperaban iconos locales y se encontraron ${state.localIcons}.`);
    assert.match(state.whatsapp,/\/assets\/icons\/web-whatsapp-com\.png$/);
    await page.click('.engine-pill[data-engine="soporte"]');
    const contact=await page.evaluate(()=>({
      open:document.getElementById('contactDialog').open,
      email:document.getElementById('contactEmail').value,
      overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth
    }));
    assert(contact.open,'Soporte debe abrir el contacto dentro de Punto Smart OS.');
    assert.equal(contact.email,'punto.smart.arg@gmail.com');
    assert(contact.overflow<=1);
    await page.close();
  });
}

for(const country of ['US','ES','MX']){
  test(`Global ${country} usa iconos locales en los accesos reportados`,async()=>{
    const {page,errors}=await open(`/global/?country=${country}`,390,844);
    const state=await page.evaluate(country=>{
      const tiles=[...document.querySelectorAll('.tile')];
      const src=name=>tiles.find(tile=>tile.textContent.trim().includes(name))?.querySelector('img')?.getAttribute('src') || '';
      return {
        whatsapp:src('WhatsApp'),
        government:country==='US' ? [src('USA.gov'),src('IRS')] : country==='ES' ? [src('Gob.es'),src('AEAT'),src('DGT'),src('Europages')] : [],
        remote:document.querySelectorAll('.tile img[src*="google.com/s2/favicons"]').length
      };
    },country);
    assert.equal(errors.length,0,errors.join('\n'));
    assert.match(state.whatsapp,/\/assets\/icons\/web-whatsapp-com\.png$/);
    assert.equal(state.remote,0);
    for(const src of state.government) assert.match(src,/\/assets\/icons\/.+\.png$/);
    await page.close();
  });
}

test('Plus carga sin desborde y con Drive desconectado',async()=>{
  const {page,errors}=await open('/plus/app/',390,844);
  const state=await page.evaluate(()=>({
    overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,
    drive:document.getElementById('plusSmall')?.textContent,
    gear:getComputedStyle(document.getElementById('resetBtn')).display
  }));
  assert.equal(errors.length,0,errors.join('\n'));
  assert(state.overflow<=1);
  assert.equal(state.drive,'Drive');
  assert.notEqual(state.gear,'none');
  await page.close();
});

test('Landing Plus comunica la oferta sin lenguaje de prueba',async()=>{
  const {page,errors}=await open('/plus/',390,844);
  const state=await page.evaluate(()=>({
    overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,
    text:document.body.textContent,
    price:document.querySelector('.price-card.featured .price-tag')?.textContent
  }));
  assert.equal(errors.length,0,errors.join('\n'));
  assert(state.overflow<=1);
  assert.match(state.text,/2 meses/);
  assert.match(state.text,/sin cobro automático/i);
  assert.match(state.price,/USD 3,99/);
  assert(!/\bbeta\b|bêta/i.test(state.text));
  await page.screenshot({path:'/tmp/puntosmart-plus-mobile.png',fullPage:true});
  await page.close();
});

for(const locale of ['es','mx','br','fr','us']){
  test(`Landing ${locale.toUpperCase()} mantiene el contenido principal visible en móvil`,async()=>{
    const {page,errors}=await open(`/${locale}/`,360,800);
    const state=await page.evaluate(()=>{
      const h1=document.querySelector('h1');
      const cta=document.querySelector('.btn.primary');
      return {
        overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,
        h1Visible:Boolean(h1 && h1.getBoundingClientRect().height>0),
        ctaVisible:Boolean(cta && cta.getBoundingClientRect().height>=40),
        cards:document.querySelectorAll('.card').length
      };
    });
    assert.equal(errors.length,0,errors.join('\n'));
    assert(state.overflow<=1);
    assert(state.h1Visible);
    assert(state.ctaVisible);
    assert.equal(state.cards,3);
    await page.close();
  });
}
