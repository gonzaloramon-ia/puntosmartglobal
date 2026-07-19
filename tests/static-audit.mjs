import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readdir,readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');

async function walk(dir){
  const result=[];
  for(const entry of await readdir(dir,{withFileTypes:true})){
    if(['.git','node_modules'].includes(entry.name)) continue;
    const full=path.join(dir,entry.name);
    if(entry.isDirectory()) result.push(...await walk(full));
    else result.push(full);
  }
  return result;
}

const files=await walk(root);
const jsFiles=files.filter(file=>file.endsWith('.js') && !file.includes(`${path.sep}tests${path.sep}`));
for(const file of jsFiles) execFileSync(process.execPath,['--check',file],{stdio:'pipe'});

const htmlFiles=files.filter(file=>file.endsWith('.html'));
const missing=[];
for(const file of htmlFiles){
  const html=await readFile(file,'utf8');
  const attrs=[...html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)].map(match=>match[1]);
  for(const value of attrs){
    if(!value || /^(?:https?:|mailto:|tel:|data:|#|javascript:)/i.test(value)) continue;
    const clean=value.split(/[?#]/)[0];
    let target=path.resolve(path.dirname(file),clean);
    try{
      const info=await stat(target);
      if(info.isDirectory()) target=path.join(target,'index.html');
      await stat(target);
    }catch{ missing.push(`${path.relative(root,file)} -> ${value}`); }
  }
}
assert.deepEqual(missing,[],`Rutas locales faltantes:\n${missing.join('\n')}`);

const core=await readFile(path.join(root,'script.js'),'utf8');
const global=await readFile(path.join(root,'global/script.js'),'utf8');
const plus=await readFile(path.join(root,'plus/index.html'),'utf8');
const drive=await readFile(path.join(root,'global-plus/plus-drive.js'),'utf8');
const driveConfig=await readFile(path.join(root,'global-plus/plus-config.js'),'utf8');
const reliability=await readFile(path.join(root,'reliability.css'),'utf8');
const install=await readFile(path.join(root,'install.js'),'utf8');

assert(!/onerror=/.test(core+global),'No debe volver la inyección mediante onerror inline.');
assert.match(core,/GROUPS_SCHEMA_VERSION = 3/);
assert.match(global,/BR:\{lat:/);
assert.match(global,/FR:\{lat:/);
assert.match(core,/function presetIcon\(/);
assert.match(global,/function presetIcon\(/);
assert.match(core,/function remoteFavicon\(/);
assert.match(global,/function remoteFavicon\(/);
assert(!/domain=\$\{encodeURIComponent/.test(core+global),'No debe volver la variante rota del servicio de favicons.');
assert(!/technical\+support/.test(global),'Soporte no debe volver a dirigir a una búsqueda de Google.');
assert.match(global,/btn\.dataset\.engine === 'soporte'/);
assert(!/supportBtn\.onclick\s*=.*mailto:|suggestBtn\.onclick\s*=.*mailto:/.test(global),'Soporte y sugerencias deben abrir el contacto interno.');
assert.match(global,/function openContact\(/);
assert.match(drive,/puntosmart-config-\$\{COUNTRY\.toLowerCase\(\)\}-v2\.json/);
assert(!/DRIVE_FILE_NAME/.test(driveConfig),'La configuración global no debe forzar un nombre compartido.');
assert.match(plus,/2 meses/);
assert.match(plus,/USD 3,99/);
assert.match(plus,/Sin cobro automático/);
const publicText=files.filter(file=>/\.(?:html|js|json|md)$/i.test(file) && !file.includes(`${path.sep}tests${path.sep}`));
for(const file of publicText){
  const content=await readFile(file,'utf8');
  assert(!/\bbeta\b|bêta/i.test(content),`${path.relative(root,file)} todavía menciona beta.`);
}
assert.match(reliability,/\.gear\s*\{/);
assert.match(reliability,/position:static !important/);
assert.match(install,/beforeinstallprompt/);
assert.match(install,/serviceWorker\.register/);

const iconSources=core+'\n'+global;
const expectedDomains=new Set();
for(const match of iconSources.matchAll(/(?:app|A)\('[^']*','([^']*)','([^']*)'/g)){
  let [,url,domain]=match;
  if(!domain && /^https?:/i.test(url)) domain=new URL(url).hostname;
  domain=domain.replace(/^www\./i,'').toLowerCase();
  if(domain) expectedDomains.add(domain);
}
for(const domain of expectedDomains){
  const name=domain.replace(/[^a-z0-9.-]+/g,'-').replace(/\.+/g,'-')+'.png';
  await stat(path.join(root,'assets/icons',name));
}

for(const file of ['index.html','plus/app/index.html','global/index.html','global-plus/index.html']){
  const html=await readFile(path.join(root,file),'utf8');
  assert.match(html,/Content-Security-Policy/,`${file} necesita CSP.`);
  assert.match(html,/reliability\.css/,`${file} necesita las correcciones responsive compartidas.`);
  assert.match(html,/rel="manifest"/,`${file} necesita manifest de instalación.`);
  assert.match(html,/data-install-app/,`${file} necesita un botón para instalar la app.`);
  assert.match(html,/install\.js/,`${file} necesita el flujo de instalación.`);
  assert.match(html,/↺\s*<span class="reset-label">Restaurar<\/span>/,`${file} necesita un control Restaurar claro.`);
}

console.log(`OK: ${jsFiles.length} scripts, ${htmlFiles.length} HTML y enlaces locales validados.`);
