// Generate a standalone design preview. Never imported by the production Worker.
import {mkdir, writeFile} from 'node:fs/promises';
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
.review-toolbar small {width:100%;color:#666;}
`;
const nav=`<nav class="review-toolbar" aria-label="Local design preview"><strong>Local preview</strong>${[['clear','No blur'],['blurred','Blur only'],['panel','Password panel']].map(([key,label])=>`<button type="button" data-review-view="${key}" aria-pressed="${key==='clear'}">${label}</button>`).join('')}<small>Decorative placeholders only · Local file · Nothing is published</small></nav>`;
const script=`<script>document.querySelectorAll('[data-review-view]').forEach(button=>button.addEventListener('click',()=>{document.body.dataset.review=button.dataset.reviewView;document.querySelectorAll('[data-review-view]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));}));document.getElementById('access-form').addEventListener('submit',event=>event.preventDefault());</script>`;
const html=loginPage.replace(/<script[^>]*src="\/login\.js"[^>]*><\/script>/g,'').replace('<body class="is-locked">','<body class="is-locked" data-review="clear">').replace('</style>',styles+'</style>').replace('</body>',nav+script+'</body>').replace('type="submit"','type="button"').replace(' required autofocus',' disabled');
const directory=new URL('../outputs/',import.meta.url);
await mkdir(directory,{recursive:true});
const target=new URL('login-design-preview.html',directory);
await writeFile(target,html);
console.log(fileURLToPath(target));
