import {readFile} from 'node:fs/promises';

const escape=text=>text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
// Deliberately limited to the reference document's Markdown vocabulary. No raw
// HTML or executable links: examples (especially logout URLs) are text only.
const inline=text=>text.split(/(`[^`]+`)/).map(part=>part.startsWith('`')?'<code>'+escape(part.slice(1,-1))+'</code>':escape(part.replace(/\[([^\]]+)\]\(([^)]+)\)/g,'$1 ($2)'))).join('');
export function renderUrlReference(markdown,renderHeading){
 const lines=markdown.replace(/^---\n[\s\S]*?\n---\n/,'').trim().split('\n');
 let html='',section=false,sectionTitle='URL Reference';
 for(let i=0;i<lines.length;i++){
  const line=lines[i];
  if(!line.trim()||line.startsWith('# '))continue;
  if(line.startsWith('## ')){
   if(section)html+='</section>';
   section=true;sectionTitle=line.slice(3);html+='<section class="panel"><div class="section-heading"><h2>'+renderHeading(line.slice(3))+'</h2></div>';continue;
  }
  if(!section){html+='<p class="muted">'+inline(line)+'</p>';continue;}
  if(line.startsWith('### ')){html+='<h3 class="url-reference-subheading">'+renderHeading(line.slice(4))+'</h3>';continue;}
  if(line.startsWith('```')){
   const code=[];while(++i<lines.length&&!lines[i].startsWith('```'))code.push(lines[i]);
   html+='<div class="url-code-block code-wrap"><div class="code-header"><span class="code-label">'+escape(line.slice(3).trim()||'Example')+'</span></div><pre tabindex="0" aria-label="Code Example"><code>'+escape(code.join('\n'))+'</code></pre></div>';continue;
  }
  if(line.startsWith('|')){
   const rows=[];do{rows.push(lines[i]);i++;}while(i<lines.length&&lines[i].startsWith('|'));i--;
   const cells=row=>row.slice(1,-1).split('|').map(cell=>inline(cell.trim()));
   html+='<div class="url-table" tabindex="0" role="region" aria-label="'+escape(sectionTitle)+' Table"><table><thead><tr>'+cells(rows[0]).map(cell=>'<th scope="col">'+cell+'</th>').join('')+'</tr></thead><tbody>'+rows.slice(2).map(row=>'<tr>'+cells(row).map(cell=>'<td>'+cell+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';continue;
  }
  if(line.startsWith('- ')){
   html+='<ul>';do{html+='<li>'+inline(lines[i].slice(2))+'</li>';i++;}while(i<lines.length&&lines[i].startsWith('- '));i--;html+='</ul>';continue;
  }
  html+='<p>'+inline(line)+'</p>';
 }
 if(section)html+='</section>';
 return html;
}
export async function urlReferencePanel(renderHeading){
 const markdown=await readFile(new URL('../URL-REFERENCE.md',import.meta.url),'utf8');
 return '<div data-panel="url-reference" id="panel-url-reference" role="tabpanel" aria-labelledby="tab-url-reference" tabindex="0" hidden><p class="muted">URL mappings and query parameters, rendered from the repository’s URL-REFERENCE.md. Examples are text so inspecting a logout URL does not end your session.</p>'+renderUrlReference(markdown,renderHeading)+'</div>';
}
export const urlReferenceCSS=`
#panel-url-reference{overflow-wrap:anywhere;min-width:0}
#panel-url-reference .url-table{max-width:100%;overflow-x:auto}
#panel-url-reference table{width:100%;min-width:600px;overflow-wrap:normal;border-collapse:collapse;text-align:left;font-size:14px}
#panel-url-reference th,#panel-url-reference td{vertical-align:top;padding:12px 16px 12px 0;border-bottom:1px solid var(--border)}
#panel-url-reference th:last-child,#panel-url-reference td:last-child{padding-right:0}
#panel-url-reference th{color:var(--text)}
#panel-url-reference code{font:0.9em/1.5 ui-monospace,SFMono-Regular,Consolas,monospace;overflow-wrap:anywhere}
#panel-url-reference .url-code-block{position:relative;margin:16px -4px;border:1px solid var(--panel-border);border-radius:12px;background:var(--surface);color:var(--text)}
#panel-url-reference .code-header{min-height:56px;display:flex;align-items:center;border-bottom:1px solid var(--panel-border);padding:12px 20px}
#panel-url-reference .code-label{font-size:12px;color:var(--muted-text)}
#panel-url-reference pre{white-space:pre-wrap;margin:0;padding:16px 20px;max-height:320px;overflow:auto;border-radius:0 0 11px 11px}
#panel-url-reference pre:focus-visible{outline:3px solid var(--icon-ink);outline-offset:3px}
#panel-url-reference li+li{margin-top:8px}
#panel-url-reference h3{margin-top:24px}
.url-reference-subheading{display:flex;align-items:flex-start;gap:12px;line-height:1.5}
.url-reference-subheading>svg{flex:none;margin-top:calc((1.5em - 24px)/2)}
`;
