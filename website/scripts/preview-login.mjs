// Generate a standalone design preview. Never imported by the production Worker.
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {loginPage} from '../lib/workshop-pages.mjs';
const styles=`
body {padding-bottom:110px;}
body[data-review=clear] .page-placeholder {filter:none;}
body[data-review=clear] .access-gate, body[data-review=blurred] .access-gate {display:none;}
body[data-review=clear], body[data-review=blurred] {overflow:auto;}
.review-toolbar {position:fixed;bottom:16px;left:50%;transform:translateX(-50%);z-index:200;background:white;color:#1a1a1a;border:1px solid #ccc;border-radius:14px;padding:12px 16px;box-shadow:0 6px 30px #0002;display:flex;align-items:center;gap:12px;font:13px system-ui;max-width:calc(100% - 24px);width:max-content;flex-wrap:wrap;}
.review-toolbar button {padding:8px 12px;color:#006aa6;border:0;border-radius:8px;background:#eef6fa;}
.review-toolbar button[aria-pressed=true] {background:#006aa6;color:white;}
.review-toolbar label {display:flex;align-items:center;gap:6px;flex-wrap:wrap;}
.review-toolbar input {width:120px;}
.review-toolbar output {min-width:36px;}
.review-toolbar small {width:100%;color:#666;}
`;
const nav=`<nav class="review-toolbar" aria-label="Local design preview"><strong>Local preview</strong>${[['clear','No blur'],['blurred','Blur only'],['panel','Password panel']].map(([key,label])=>`<button type="button" data-review-view="${key}" aria-pressed="${key==='blurred'}">${label}</button>`).join('')}<label>Block strength <input id="block-strength" type="range" min="0" max="100" value="40"><output id="block-strength-value">40%</output></label><label>Background blur <input id="blur-amount" type="range" min="0" max="20" step="0.5" value="4"><output id="blur-amount-value">4px</output></label><small>Decorative placeholders only · Local file · Nothing is published</small></nav>`;
const script=`<script>document.getElementById('blur-amount').addEventListener('input',event=>{const value=event.target.value+'px';document.querySelector('.page-placeholder').style.setProperty('--ph-blur',value);document.getElementById('blur-amount-value').value=value;});document.getElementById('block-strength').addEventListener('input',event=>{const value=event.target.value+'%';document.querySelector('.page-placeholder').style.setProperty('--ph-strength',value);document.getElementById('block-strength-value').value=value;});document.querySelectorAll('[data-review-view]').forEach(button=>button.addEventListener('click',()=>{document.body.dataset.review=button.dataset.reviewView;document.querySelectorAll('[data-review-view]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));}));document.getElementById('access-form').addEventListener('submit',event=>event.preventDefault());</script>`;
let html=loginPage.replace(/<script[^>]*src="\/login\.js"[^>]*><\/script>/g,'').replace('<body class="is-locked">','<body class="is-locked" data-review="blurred">').replace('</style>',styles+'</style>').replace('</body>',nav+script+'</body>').replace('type="submit"','type="button"').replace(' required autofocus',' disabled');
for (const [name, mime] of [['wavelength-worm.png', 'image/png'], ['MarkPro-Bold.ttf', 'font/ttf'], ['workshop-resources-qr.png', 'image/png']]) {
  const bytes = await readFile(new URL('../public/assets/' + name, import.meta.url));
  html = html.replaceAll('/assets/' + name, `data:${mime};base64,${bytes.toString('base64')}`);
}
const directory=new URL('../outputs/',import.meta.url);
await mkdir(directory,{recursive:true});
const target=new URL('login-design-preview.html',directory);
await writeFile(target,html);
console.log(fileURLToPath(target));
