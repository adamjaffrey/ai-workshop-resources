import {resourcePage} from '../lib/workshop-resource-page.mjs';
import {readFile} from 'node:fs/promises';

// Reuse the real Resources control and its component rules, including state icons.
const copyTextButton=resourcePage.match(/<button[^>]*class="copy"[\s\S]*?<\/button>/)[0]
 .replace('class="copy"','class="copy url-copy"').replace(/ data-copy="[^"]*"/,'').replace(/aria-label="[^"]*"/,'aria-label="Copy Text" aria-live="polite"')
 .replaceAll('nodejs-prompt','url-text').replace('Copy Prompt','Copy Text');
const resourceStyles=[...resourcePage.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m=>m[1]).join('\n');
const copyTextCSS=[...resourceStyles.matchAll(/([^{}]+)\{([^{}]*)\}/g)].filter(m=>m[1].includes('.copy')&&!m[1].includes('.copy .icon')).map(m=>m[1].replace(/\.copy(?![-\w])/g,'#panel-url-reference .copy')+'{'+m[2]+'}').join('\n');

const escape=text=>text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
// Deliberately limited to the reference document's Markdown vocabulary. No raw
// HTML or executable links: examples (especially logout URLs) are text only.
const inline=text=>text.split(/(\*\*[^*]+\*\*|`[^`]+`)/).map(part=>part.startsWith('**')?'<strong>'+inline(part.slice(2,-2))+'</strong>':part.startsWith('`')?'<code>'+escape(part.slice(1,-1))+'</code>':escape(part.replace(/\[([^\]]+)\]\(([^)]+)\)/g,'$1 ($2)'))).join('');
export function renderUrlReference(markdown,renderHeading){
 const lines=markdown.replace(/^---\n[\s\S]*?\n---\n/,'').trim().split('\n');
 let html='<aside class="url-reference-intro" aria-label="About This Reference"><details class="disclosure-accent"><summary>About This Reference</summary><div class="reference-intro-copy"><p class="muted">URL mappings and query parameters, rendered from the repository’s <code>URL-REFERENCE.md</code>. Examples are text so inspecting a logout URL does not end your session.</p>',subsection=false,section=false,sectionTitle='URL Reference';
 for(let i=0;i<lines.length;i++){
  const line=lines[i];
  if(!line.trim()||line.startsWith('# '))continue;
  if(line.startsWith('## ')){
   if(subsection){html+='</div>';subsection=false;}if(section)html+='</section>';else html+='</div></details></aside>';
   section=true;sectionTitle=line.slice(3);html+='<section class="panel"><div class="section-heading"><h2>'+renderHeading(line.slice(3))+'</h2></div>';continue;
  }
  if(!section){html+='<p class="muted">'+inline(line)+'</p>';continue;}
  if(line.startsWith('### ')){if(subsection)html+='</div>';subsection=true;html+='<div class="url-subsection"><div class="section-heading"><h3 class="url-reference-subheading">'+renderHeading(line.slice(4))+'</h3></div>';continue;}
  if(line.startsWith('```')){
   const code=[];while(++i<lines.length&&!lines[i].startsWith('```'))code.push(lines[i]);
   html+='<div class="url-code-block code-wrap"><div class="code-header"><span class="code-label">'+escape(line.slice(3).trim()||'Example')+'</span>'+copyTextButton+'</div><pre tabindex="0" aria-label="Code Example"><code>'+escape(code.join('\n'))+'</code></pre></div>';continue;
  }
  if(line.startsWith('|')){
   const rows=[];do{rows.push(lines[i]);i++;}while(i<lines.length&&lines[i].startsWith('|'));i--;
   const cells=row=>row.slice(1,-1).split('|').map(cell=>inline(cell.trim()));
   // Preserve compact identifiers; reserve a readable measure for explanatory prose.
   const compact=new Set(['Purpose','Browser Title','Canonical Address or Path','Source Hostname','Destination Hostname','Canonical Path','Canonical Parameter','Status and Owner']);
   const prose=new Set(['Status and Owner','Effect','Result','Automatic Local Preview','Hosted Application','Request','Action']);
   const kinds=rows[0].slice(1,-1).split('|').map(name=>name.trim()==='Section'?'anchor-section':name.trim()==='Heading'?'anchor-heading':name.trim()==='Canonical Anchor URL'?'anchor-url':name.trim()==='Effect'?'effect':compact.has(name.trim())?'compact':prose.has(name.trim())?'prose':'aliases');
   html+='<div class="url-table" tabindex="0" role="region" aria-label="'+escape(sectionTitle)+' Table"><table'+(kinds.includes('anchor-url')?' class="anchor-table"':'')+'><thead><tr>'+cells(rows[0]).map((cell,index)=>'<th scope="col" data-column-style="'+kinds[index]+'">'+cell+'</th>').join('')+'</tr></thead><tbody>'+rows.slice(2).map(row=>'<tr>'+cells(row).map((cell,index)=>'<td data-column-style="'+kinds[index]+'">'+cell+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';continue;
  }
  if(line.startsWith('- ')){
   html+='<ul>';do{html+='<li>'+inline(lines[i].slice(2))+'</li>';i++;}while(i<lines.length&&lines[i].startsWith('- '));i--;html+='</ul>';continue;
  }
  html+='<p>'+inline(line)+'</p>';
 }
 if(subsection)html+='</div>';if(section)html+='</section>';
 return html;
}
export async function urlReferencePanel(renderHeading){
 const markdown=await readFile(new URL('../URL-REFERENCE.md',import.meta.url),'utf8');
 return '<div data-panel="url-reference" id="panel-url-reference" role="tabpanel" aria-labelledby="tab-url-reference" tabindex="0" hidden>'+renderUrlReference(markdown,renderHeading)+'</div>';
}
export const urlReferenceCSS=`
${copyTextCSS}
#panel-url-reference .copy .icon{width:18px;height:18px;flex:none;vertical-align:middle}
@media(max-width:380px){#panel-url-reference .copy .icon{display:none}}
#panel-url-reference{overflow-wrap:anywhere;min-width:0}
#panel-url-reference .url-table{max-width:100%;overflow-x:auto;-webkit-text-size-adjust:100%;text-size-adjust:100%}
#panel-url-reference table{width:auto;min-width:0;max-width:100%;table-layout:auto;overflow-wrap:normal;border-collapse:collapse;text-align:left;font-size:14px}
#panel-url-reference th,#panel-url-reference td{font-size:14px;line-height:1.5;vertical-align:top;padding:12px 16px 12px 0;border-bottom:1px solid var(--border)}
#panel-url-reference th:last-child,#panel-url-reference td:last-child{padding-right:0}
#panel-url-reference th{color:var(--text)}
#panel-url-reference [data-column-style=compact]{white-space:nowrap}
#panel-url-reference [data-column-style=prose]{min-width:28ch;max-width:40ch}
#panel-url-reference [data-column-style=effect]{min-width:36ch;max-width:44ch}
#panel-url-reference table code{font-size:12.6px;white-space:nowrap;overflow-wrap:normal}
#panel-url-reference [data-column-style=anchor-section]{min-width:26ch;max-width:32ch}
#panel-url-reference [data-column-style=anchor-heading]{min-width:38ch;max-width:42ch}
#panel-url-reference [data-column-style=anchor-url]{min-width:30ch;max-width:44ch;overflow-wrap:anywhere}
#panel-url-reference [data-column-style=anchor-url] code{white-space:normal;overflow-wrap:anywhere}
#panel-url-reference .anchor-table{table-layout:fixed;width:100%;min-width:1120px;max-width:none}
#panel-url-reference .anchor-table :is(th,td){min-width:0;max-width:none}
#panel-url-reference .anchor-table th:nth-child(1){width:18%}
#panel-url-reference .anchor-table th:nth-child(2){width:24%}
#panel-url-reference .anchor-table th:nth-child(3){width:46%}
#panel-url-reference .anchor-table th:nth-child(4){width:12%}
#panel-url-reference [data-column-style=anchor-url] strong code{font-weight:700}
#panel-url-reference code{font:0.9em/1.5 ui-monospace,SFMono-Regular,Consolas,monospace;overflow-wrap:anywhere}
#panel-url-reference .url-code-block{position:relative;margin:16px -4px;border:1px solid var(--panel-border);border-radius:12px;background:var(--content-surface);color:var(--text)}
#panel-url-reference .code-header{min-height:56px;display:flex;align-items:center;justify-content:space-between;gap:16px;border-bottom:1px solid var(--panel-border);padding:12px 20px}
#panel-url-reference .code-label{font-size:12px;color:var(--muted-text)}
#panel-url-reference pre{white-space:pre-wrap;margin:0;padding:16px 20px;font:14px/1.5 ui-monospace,SFMono-Regular,Consolas,monospace;max-height:320px;overflow:auto;border-radius:0 0 11px 11px}
#panel-url-reference pre code{font:inherit;color:inherit}
#panel-url-reference pre:focus-visible{outline:3px solid var(--icon-ink);outline-offset:3px}
#panel-url-reference li+li{margin-top:8px}
#panel-url-reference .url-reference-intro{margin:12px -4px 16px;padding:24px 28px;background:var(--surface);border:1px solid var(--border);border-radius:16px} .url-reference-intro>:first-child{margin-top:0}.url-reference-intro>:last-child{margin-bottom:0}#panel-url-reference .url-subsection{border-top:1px solid var(--border);padding-top:24px;margin-top:24px}#panel-url-reference .url-subsection h3{border:0;padding-top:0;margin:0}#panel-url-reference .url-subsection>.section-heading{margin-bottom:16px}#panel-url-reference .url-subsection[data-collapsed]>.section-heading{margin-bottom:0}
.url-copy[data-result=success]{color:var(--success)}
.url-copy[data-result=error]{color:var(--error)}
.icon-usages summary{display:flex;align-items:center;gap:4px;cursor:pointer}
.icon-usages summary::-webkit-details-marker{display:none}
.icon-usages summary{list-style:none}
.icon-usages[open] summary>svg{transform:rotate(90deg)}
.icon-usages ul{margin-left:0;padding-left:var(--body-list-indent)}
.url-reference-subheading{display:flex;align-items:flex-start;gap:12px;line-height:1.5}
.url-reference-subheading>svg{flex:none;margin-top:calc((1.5em - 24px)/2)}
`;

export const urlReferenceScript=String.raw`
for(const button of document.querySelectorAll('.url-copy')){
 let reset;
 button.addEventListener('click',async()=>{
  const text=button.closest('.url-code-block').querySelector('pre code').textContent;
  let success=false;
  try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(text);success=true;}else{const field=document.createElement('textarea');field.value=text;field.style.cssText='position:fixed;top:0;left:-10000px';document.body.append(field);try{field.select();success=document.execCommand('copy');}finally{field.remove();button.focus({preventScroll:true});}}}catch{}
  clearTimeout(reset);button.dataset.result=success?'success':'error';button.dataset.copied=String(success);button.toggleAttribute('data-copy-error',!success);button.querySelector('.copy-label').textContent=success?'Text Copied':'Copy Failed';button.setAttribute('aria-label',success?'Text Copied':'Copy Failed');reset=setTimeout(()=>{delete button.dataset.result;delete button.dataset.copied;button.removeAttribute('data-copy-error');button.querySelector('.copy-label').textContent='Copy Text';button.setAttribute('aria-label','Copy Text');},2000);
 });
}
`;
