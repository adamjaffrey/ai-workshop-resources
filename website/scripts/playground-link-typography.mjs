import {withTheme} from '../lib/workshop-theme.mjs';
// Shared navigation specimen for the defined hyperlink style.
export const playgroundHomeLink='<a class="workshop-link--external" href="https://workshop.adamjaffrey.chatgpt.site/ai-workshop-resources">Resources</a>';
const linkExamples=(kind,href)=>`<section class="link-kind" data-link-kind="${kind}"><div class="link-examples"><section><h4>Resting State</h4><a class="workshop-link--${kind}" href="${href}">Resources</a></section><section><h4>Hover State</h4><a class="workshop-link--${kind}" href="${href}" data-link-preview="hover">Resources</a></section></div><div class="link-examples multiline-examples"><section><h4>Resting State</h4><p style="max-width:240px"><a class="workshop-link--${kind}" href="${href}">A longer workshop resources link that wraps across multiple lines</a></p></section><section><h4>Hover State</h4><p style="max-width:240px"><a class="workshop-link--${kind}" href="${href}" data-link-preview="hover">A longer workshop resources link that wraps across multiple lines</a></p></section></div></section>`;
export const linkTypographyPage=(section)=>withTheme(`<!doctype html><html lang="en-AU"><head><style>
html,body{overflow-y:hidden}body{margin:0;padding-block:24px;font:14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:var(--text);background:var(--page)}h3,caption{font-size:16px;line-height:24px;font-weight:700;text-align:left;margin:0 0 12px}caption{padding-bottom:12px;margin:0}p{margin:8px 0 16px}.link-examples{display:flex;flex-wrap:wrap;gap:24px}.link-examples section{flex:1;min-width:120px}.colour-table{--fade-left:0px;--fade-right:0px;mask-image:linear-gradient(to right,transparent calc(var(--fade-left)/3),#000 var(--fade-left),#000 calc(100% - var(--fade-right)),transparent calc(100% - var(--fade-right)/3));overflow-x:auto;overflow-y:hidden;margin-top:0}table{border-collapse:collapse;width:100%;font-size:12px}th:first-child,td:first-child{padding-left:0}th,td{text-align:left;padding:8px;border-bottom:1px solid var(--border);white-space:nowrap}output{display:block;margin:16px 0;font:12px/1.6 ui-monospace,monospace;overflow-wrap:anywhere}a[data-link-preview]{transition:none!important}.selection-example{padding:12px;border:1px solid var(--border);border-radius:8px}
h4{font-size:14px;line-height:21px;margin:0 0 12px}.link-kind+.link-kind{margin-top:32px;padding-top:24px;border-top:1px solid var(--border)}.multiline-examples{margin-top:24px}.list-examples>:last-child{margin-bottom:0}</style></head><body><div id="link-type-specimens" data-colour-chips>
${section==='external'?linkExamples('external','https://workshop.adamjaffrey.chatgpt.site/ai-workshop-resources'):''}
${section==='internal'?linkExamples('internal','/ai-workshop-resources'):''}
${['external','internal'].includes(section)?`<output id="link-metrics"></output><p>External links use the up-right arrow; internal links use the right arrow. Both are underlined at rest; hover hides the underline and shows the same solid background. Wrapped lines share the same decoration, and the final word and arrow stay together. Visited links retain the same colours. Specimen clicks are simulated.</p>

`:''}
${section==='colours'?`<div hidden>${linkExamples('external','#')}</div><div class="colour-table"><table aria-label="Link Colours"><thead><tr><th>Theme / Agent</th><th>Text / Underline / Arrow</th><th>Hover Text / Fill</th><th>Selection Fill / Text</th></tr></thead><tbody id="link-colours"></tbody></table></div>
`:''}
${section==='lists'?`<section class="list-examples">
<p>Shared body-copy styles. The marker sits near the left rail; wrapped text aligns with the item text.</p>
<ul><li>A short first-level bullet.</li><li>A longer first-level bullet that wraps on narrow screens so its hanging indentation can be inspected.</li><li>A parent item with nested detail.<ul><li>A nested bullet advances by one compact indent.</li><li>Use <code>div</code>, <code>section</code> and <code>.example-panel</code> for element and class references.</li></ul></li></ul>
<p>Element names such as <code>button</code>, IDs such as <code>#example-control</code>, and filenames such as <code>workshop-theme.mjs</code> use the shared monospace font.</p></section>
`:''}
</div><script>
let linkPalette='',linkTableReady=false;
function refreshLinkTypography(){
 const palette=document.documentElement.dataset.theme+'/'+document.documentElement.dataset.selectedAgent;if(linkPalette===palette)return;linkPalette=palette;
 window.decorateWorkshopLinks();
 const root=document.documentElement,savedTheme=root.dataset.theme,savedAgent=root.dataset.selectedAgent;
 const links=document.querySelectorAll('a'),normal=links[0],hover=links[1];if(!normal)return;
 const canvas=document.createElement('canvas');canvas.width=1;canvas.height=1;const ctx=canvas.getContext('2d',{willReadFrequently:true});
 const hex=value=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=value;ctx.fillRect(0,0,1,1);return '#'+[...ctx.getImageData(0,0,1,1).data].slice(0,3).map(n=>n.toString(16).padStart(2,'0')).join('').toUpperCase();};
 const opacity=value=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=value;ctx.fillRect(0,0,1,1);return Math.round(ctx.getImageData(0,0,1,1).data[3]/255*100);};
 if(!linkTableReady&&document.getElementById('link-colours')){
 const rows=[];
 for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
  root.dataset.theme=theme;root.dataset.selectedAgent=agent;
  const c=getComputedStyle(normal),selection=getComputedStyle(normal,'::selection');
  rows.push([theme+' / '+agent,hex(c.color),hex(getComputedStyle(hover).color)+' / '+hex(getComputedStyle(hover).backgroundColor)+' at '+opacity(getComputedStyle(hover).backgroundColor)+'% opacity',hex(selection.backgroundColor)+' / '+hex(selection.color)]);
 }
 if(savedTheme===undefined)delete root.dataset.theme;else root.dataset.theme=savedTheme;
 if(savedAgent===undefined)delete root.dataset.selectedAgent;else root.dataset.selectedAgent=savedAgent;
 const body=document.getElementById('link-colours');body.replaceChildren();for(const values of rows){const row=document.createElement('tr');for(const value of values){const cell=document.createElement('td');if(row.children.length===0){const [theme,agent]=value.split(' / ');for(const [i,word] of [theme,agent].entries()){if(i)cell.append(' / ');const code=document.createElement('code');code.textContent=word;cell.append(code);}}else cell.textContent=value;row.append(cell);}body.append(row);}
 linkTableReady=true;
 }
 const text=getComputedStyle(normal.querySelector('.link-label')),held=getComputedStyle(hover.querySelector('.link-label')),box=getComputedStyle(normal);
 if(document.getElementById('link-metrics'))document.getElementById('link-metrics').textContent='Text: '+hex(text.color)+' · Underline: '+hex(text.textDecorationColor)+' · Thickness: '+text.textDecorationThickness+' resting / '+held.textDecorationThickness+' hover · Underline offset: '+text.textUnderlineOffset+' · Layout padding: '+box.padding+' · Native cloned backgrounds and zero-blur shadows on every line; zero layout padding; opaque fill; instant text/icon effects; .2em icon gap'+' · Font: '+box.fontFamily+' · '+box.fontSize+' / '+box.lineHeight+' · Weight: '+box.fontWeight;
}
function measureLinkTypography(){parent.postMessage({guide:'reference-height',height:Math.ceil(document.getElementById('link-type-specimens').getBoundingClientRect().height+48)},'*');}
document.addEventListener('DOMContentLoaded',()=>{refreshLinkTypography();const table=document.querySelector('.colour-table');const fade=()=>{if(!table)return;table.style.setProperty('--fade-left',table.scrollLeft>2?'42px':'0px');table.style.setProperty('--fade-right',table.scrollWidth-table.clientWidth-table.scrollLeft>2?'42px':'0px');};if(table){table.addEventListener('scroll',fade,{passive:true});new ResizeObserver(fade).observe(table);}fade();new ResizeObserver(measureLinkTypography).observe(document.body);measureLinkTypography();});
window.addEventListener('message',e=>{if(e.source!==parent)return;if(e.data?.guide==='settings'){refreshLinkTypography();measureLinkTypography();}else if(e.data?.guide==='measure-reference')measureLinkTypography();});
</script></body></html>`);
