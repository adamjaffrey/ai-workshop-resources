// Standalone local preview: embed assets so the file also works when moved.
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resourcePage} from '../lib/workshop-resource-page.mjs';
let html = resourcePage;
for (const [name, mime] of [['wavelength-worm.png', 'image/png'], ['workshop-resources-qr.png', 'image/png'], ['markpro-bold.ttf', 'font/ttf']]) {
  const bytes = await readFile(new URL('../public/assets/' + name, import.meta.url));
  html = html.replaceAll('/assets/' + name, `data:${mime};base64,${bytes.toString('base64')}`);
}
html = html.replace('/favicon.png', `data:image/png;base64,${(await readFile(new URL('../public/favicon.png', import.meta.url))).toString('base64')}`);
const start = html.indexOf('    async function checkSession()');
const end = html.indexOf('  </script>', start);
if (start < 0 || end < 0) throw new Error('Preview session boundary missing');
html = html.slice(0, start) + html.slice(end);
html = html.replace('<form action="/auth/logout" method="post">', '<form>').replace('<button type="submit">', '<button type="button">');
const output = new URL('../outputs/workshop-resources-preview.html', import.meta.url);
await mkdir(new URL('../outputs/', import.meta.url), {recursive: true});
await writeFile(output, html);
console.log(fileURLToPath(output));
