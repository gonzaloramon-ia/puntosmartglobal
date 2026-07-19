import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import {
  siFacebook, siGoogle, siGooglemaps, siGoogletranslate, siInstagram,
  siNetflix, siNewyorktimes, siPinterest, siSteam, siTheweatherchannel,
  siTiktok, siUsps
} from 'simple-icons';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const entries = [
  [siGoogle, ['google-com.png', 'google-com-mx.png', 'google-es.png']],
  [siFacebook, ['facebook-com.png']],
  [siInstagram, ['instagram-com.png']],
  [siNetflix, ['netflix-com.png']],
  [siNewyorktimes, ['nytimes-com.png']],
  [siPinterest, ['pinterest-com.png']],
  [siSteam, ['steampowered-com.png']],
  [siTiktok, ['tiktok-com.png']],
  [siGooglemaps, ['maps-google-com.png']],
  [siGoogletranslate, ['translate-google-com.png']],
  [siTheweatherchannel, ['weather-com.png']],
  [siUsps, ['usps-com.png']]
];

const browser = await puppeteer.launch({
  args: chromium.args,
  executablePath: await chromium.executablePath(),
  headless: true
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 128, height: 128, deviceScaleFactor: 1 });
  for (const [icon, files] of entries) {
    const svg = icon.svg.replace('<svg ', `<svg fill="#${icon.hex}" `);
    await page.setContent(`<style>html,body{margin:0;width:128px;height:128px;background:transparent}body{display:grid;place-items:center}svg{width:96px;height:96px}</style>${svg}`);
    const bytes = await page.screenshot({ type: 'png', omitBackground: true });
    for (const file of files) await import('node:fs/promises').then(fs => fs.writeFile(path.join(root, 'assets', 'icons', file), bytes));
  }
} finally {
  await browser.close();
}

console.log(`Rendered ${entries.flatMap(([, files]) => files).length} official brand icons.`);
