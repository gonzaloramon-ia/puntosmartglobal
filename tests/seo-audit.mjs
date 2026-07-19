import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {JSDOM} from 'jsdom';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const origin='https://www.puntosmart.com.ar';
const indexable=['index.html','es/index.html','mx/index.html','br/index.html','fr/index.html','us/index.html','plus/index.html','instructivo/index.html','privacidad/index.html','legal/index.html'];
const localized=['index.html','es/index.html','mx/index.html','br/index.html','fr/index.html','us/index.html'];
const noindex=['404.html','global/index.html','global-plus/index.html','plus/app/index.html','ar/index.html','free/index.html','home/index.html','spain/index.html','mexico/index.html','brasil/index.html','france/index.html','usa/index.html','plus-es/index.html','plus-mx/index.html','plus-br/index.html','plus-fr/index.html','plus-us/index.html'];
const hreflangs=['es-AR','es-ES','es-MX','pt-BR','fr-FR','en-US','x-default'];

async function documentFor(file){
  const html=await readFile(path.join(root,file),'utf8');
  return {html,document:new JSDOM(html).window.document};
}

for(const file of indexable){
  const {document}=await documentFor(file);
  const title=document.querySelector('title')?.textContent.trim() || '';
  const description=document.querySelector('meta[name="description"]')?.content.trim() || '';
  const canonical=document.querySelector('link[rel="canonical"]')?.href || '';
  const robots=document.querySelector('meta[name="robots"]')?.content || '';
  assert(title.length>=20 && title.length<=65,`${file}: título SEO inválido (${title.length}).`);
  assert(description.length>=40 && description.length<=170,`${file}: descripción SEO inválida (${description.length}).`);
  assert(canonical.startsWith(`${origin}/`),`${file}: canonical debe usar ${origin}.`);
  assert(!/noindex/i.test(robots),`${file}: una página indexable no puede llevar noindex.`);
  assert.equal(document.querySelectorAll('h1').length,1,`${file}: debe tener exactamente un H1.`);
  for(const property of ['og:type','og:site_name','og:title','og:description','og:image']){
    assert(document.querySelector(`meta[property="${property}"]`)?.content,`${file}: falta ${property}.`);
  }
  assert(document.querySelector('meta[name="twitter:card"]')?.content,`${file}: falta Twitter Card.`);
}

for(const file of localized){
  const {document}=await documentFor(file);
  const found=[...document.querySelectorAll('link[rel="alternate"][hreflang]')].map(node=>node.hreflang);
  assert.deepEqual(new Set(found),new Set(hreflangs),`${file}: hreflang incompleto.`);
}

for(const file of noindex){
  const {document}=await documentFor(file);
  assert.match(document.querySelector('meta[name="robots"]')?.content || '',/noindex/i,`${file}: debe quedar fuera del índice.`);
}

for(const file of ['es/index.html','mx/index.html','br/index.html','fr/index.html','us/index.html','plus/index.html']){
  const {document}=await documentFor(file);
  const blocks=[...document.querySelectorAll('script[type="application/ld+json"]')];
  assert(blocks.length>0,`${file}: faltan datos estructurados JSON-LD.`);
  for(const block of blocks) assert.doesNotThrow(()=>JSON.parse(block.textContent),`${file}: JSON-LD inválido.`);
}

const rootPage=await documentFor('index.html');
assert(rootPage.document.querySelector('[itemscope][itemtype="https://schema.org/WebApplication"]'),'index.html: faltan datos estructurados de WebApplication.');

const sitemap=await readFile(path.join(root,'sitemap.xml'),'utf8');
const sitemapDoc=new JSDOM(sitemap,{contentType:'text/xml'}).window.document;
const sitemapUrls=[...sitemapDoc.querySelectorAll('url > loc')].map(node=>node.textContent.trim());
const expected=indexable.map(file=>file==='index.html' ? `${origin}/` : `${origin}/${file.replace(/index\.html$/,'')}`);
assert.deepEqual(new Set(sitemapUrls),new Set(expected),'sitemap.xml debe contener sólo URLs indexables y canónicas.');
assert.equal(sitemapUrls.length,new Set(sitemapUrls).size,'sitemap.xml no debe repetir URLs.');

const robots=await readFile(path.join(root,'robots.txt'),'utf8');
assert.match(robots,/^User-agent:\s*\*$/m);
assert.match(robots,new RegExp(`Sitemap: ${origin.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}/sitemap\\.xml`));

const manifest=JSON.parse(await readFile(path.join(root,'site.webmanifest'),'utf8'));
assert.equal(manifest.name,'Punto Smart OS');
assert.equal(manifest.id,'./');
assert.equal(manifest.display,'standalone');
assert(manifest.icons?.length,'site.webmanifest necesita al menos un icono.');

const plusPage=await documentFor('plus/index.html');
const plusLd=JSON.parse(plusPage.document.querySelector('script[type="application/ld+json"]').textContent);
assert.equal(plusLd.offers.price,'3.99');
assert.equal(plusLd.offers.priceCurrency,'USD');
assert.match(plusLd.offers.description,/dos meses gratis/i);

console.log(`OK SEO: ${indexable.length} páginas indexables, ${noindex.length} excluidas y ${localized.length} variantes hreflang.`);
