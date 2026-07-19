import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sources = ['script.js', 'global/script.js'];
const domains = new Set();

for (const source of sources) {
  const code = await readFile(path.join(root, source), 'utf8');
  for (const match of code.matchAll(/(?:app|A)\('[^']*','([^']*)','([^']*)'/g)) {
    const [, url, configuredDomain] = match;
    let domain = configuredDomain;
    if (!domain && /^https?:/i.test(url)) {
      try { domain = new URL(url).hostname; } catch {}
    }
    domain = domain.replace(/^www\./i, '').toLowerCase();
    if (domain) domains.add(domain);
  }
}

const outputDir = path.join(root, 'assets', 'icons');
await mkdir(outputDir, { recursive: true });

const fileName = domain => `${domain.replace(/[^a-z0-9.-]+/g, '-').replace(/\.+/g, '-')}.png`;
const queue = [...domains].sort();
let completed = 0;
const failed = [];

async function worker() {
  while (queue.length) {
    const domain = queue.shift();
    const endpoint = `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(`https://${domain}`)}&sz=128`;
    try {
      try {
        const cached = await readFile(path.join(outputDir, fileName(domain)));
        if (cached.length >= 100) { completed += 1; continue; }
      } catch {}
      const response = await fetch(endpoint, {
        headers: { 'user-agent': 'PuntoSmartOS-icon-cache/1.0' },
        signal: AbortSignal.timeout(20_000)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length < 100) throw new Error(`invalid icon (${bytes.length} bytes)`);
      await writeFile(path.join(outputDir, fileName(domain)), bytes);
      completed += 1;
    } catch (error) {
      failed.push(`${domain} (${error.message})`);
    }
  }
}

await Promise.all(Array.from({ length: 2 }, () => worker()));
console.log(`Cached ${completed} preset icons in ${path.relative(root, outputDir)}.`);
if (failed.length) console.warn(`Unavailable (${failed.length}): ${failed.join(', ')}`);
