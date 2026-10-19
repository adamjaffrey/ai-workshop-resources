import {withTheme} from '../lib/workshop-theme.mjs';
// One navigation source for the actual breadcrumb and its typography specimens.
export const playgroundHomeLink='<a href="/">Resources</a>';
export const linkTypographyPage=withTheme(`<!doctype html><html lang="en-AU"><head><style>
body{margin:0;padding:24px;font:14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:var(--text);background:var(--page)}h3{font-size:16px;margin:0 0 12px}p{margin:8px 0 16px}.link-examples{display:flex;flex-wrap:wrap;gap:24px}.link-examples section{flex:1;min-width:120px}.colour-table{overflow:auto;margin-top:24px}table{border-collapse:collapse;width:100%;font-size:12px}th,td{text-align:left;padding:8px;border-bottom:1px solid var(--border);white-space:nowrap}output{display:block;margin:16px 0;font:12px/1.6 ui-monospace,monospace;overflow-wrap:anywhere}a[data-link-preview]{transition:none}.selection-example{padding:12px;border:1px solid var(--border);border-radius:8px}
</style></head><body><div id="link-type-specimens">
<div class="link-examples"><section><h3>Resting Link</h3>${playgroundHomeLink}</section><section><h3>Hover Link</h3>${playgroundHomeLink.replace('<a ', '<a data-link-preview="hover" ')}</section></div>
<output id="link-metrics"></output><p>The text is underlined; the northeast arrow shares its colour without an underline. The padded hover background includes both. Visited links retain the same colours. The arrow indicates navigation; these specimen clicks are simulated.</p>
<p class="selection-example">Select this text to inspect the current agent and theme’s text highlight.</p>
<div class="colour-table"><table><caption>Colours Across Themes and Agents</caption><thead><tr><th>Theme / Agent</th><th>Text / Underline / Arrow</th><th>Hover Fill</th><th>Selection Fill / Text</th></tr></thead><tbody id="link-colours"></tbody></table></div>
</div><script>
function refreshLinkTypography(){
 window.decorateWorkshopLinks();
 const root=document.documentElement,savedTheme=root.dataset.theme,savedAgent=root.dataset.selectedAgent;
 const links=document.querySelectorAll('a'),normal=links[0],hover=links[1];
 const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');
 const hex=value=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=value;ctx.fillRect(0,0,1,1);return '#'+[...ctx.getImageData(0,0,1,1).data].slice(0,3).map(n=>n.toString(16).padStart(2,'0')).join('').toUpperCase();};
 const opacity=value=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=value;ctx.fillRect(0,0,1,1);return Math.round(ctx.getImageData(0,0,1,1).data[3]/255*100);};
 const rows=[];
 for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
  root.dataset.theme=theme;root.dataset.selectedAgent=agent;
  const c=getComputedStyle(normal),selection=getComputedStyle(normal,'::selection');
  rows.push([theme+' / '+(agent==='codex'?'Codex':'Claude Code'),hex(c.color),hex(getComputedStyle(root).getPropertyValue('--agent-accent').trim())+' at '+opacity(getComputedStyle(hover).backgroundColor)+'% opacity',hex(selection.backgroundColor)+' / '+hex(selection.color)]);
 }
 if(savedTheme===undefined)delete root.dataset.theme;else root.dataset.theme=savedTheme;
 if(savedAgent===undefined)delete root.dataset.selectedAgent;else root.dataset.selectedAgent=savedAgent;
 const body=document.getElementById('link-colours');body.replaceChildren();for(const values of rows){const row=document.createElement('tr');for(const value of values){const cell=document.createElement('td');cell.textContent=value;row.append(cell);}body.append(row);}
 const text=getComputedStyle(normal.querySelector('.link-label')),held=getComputedStyle(hover.querySelector('.link-label')),box=getComputedStyle(normal);
 document.getElementById('link-metrics').textContent='Text: '+hex(text.color)+' · Underline: '+hex(text.textDecorationColor)+' · Thickness: '+text.textDecorationThickness+' resting / '+held.textDecorationThickness+' hover · Underline offset: '+text.textUnderlineOffset+' · Padding: '+box.padding+' · Font: '+box.fontFamily+' · '+box.fontSize+' / '+box.lineHeight+' · Weight: '+box.fontWeight;
}
function measureLinkTypography(){parent.postMessage({guide:'reference-height',height:Math.ceil(document.getElementById('link-type-specimens').getBoundingClientRect().height+48)},'*');}
document.addEventListener('DOMContentLoaded',()=>{refreshLinkTypography();new ResizeObserver(measureLinkTypography).observe(document.body);measureLinkTypography();});
window.addEventListener('message',e=>{if(e.source!==parent)return;if(e.data?.guide==='settings'){refreshLinkTypography();measureLinkTypography();}else if(e.data?.guide==='measure-reference')measureLinkTypography();});
</script></body></html>`);
