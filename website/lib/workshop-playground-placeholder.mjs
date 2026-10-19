import geometry from './workshop-playground-placeholder.generated.json' with {type:'json'};
export const playgroundPlaceholderStyles=`
.page-placeholder.playground-placeholder{position:fixed;inset:0;margin:0;padding:0;width:100%;max-width:none;height:100dvh;overflow:hidden}
main.page-placeholder.playground-placeholder>iframe{display:block;border:0;width:100%!important;max-width:none!important;margin:0!important;height:100%!important;pointer-events:none}
`;
export function playgroundPlaceholder(){
 return '<main class="page-placeholder playground-placeholder" aria-hidden="true" inert><iframe title="Decorative Components backdrop" tabindex="-1" sandbox="" src="/login-backdrop/components?theme=light&amp;agent=codex"></iframe></main>';
}
export function playgroundPlaceholderDocument(theme='light',agent='codex'){
 theme=theme==='dark'?'dark':'light';agent=['claude','claude-code'].includes(agent)?'claude-code':'codex';
 return geometry.document.replace(/<html\b[^>]*>|&lt;html\b.*?&gt;/g,tag=>tag.replace(/(data-theme=(?:&(?:amp;)*quot;|"))(?:light|dark)/g,'$1'+theme).replace(/(data-selected-agent=(?:&(?:amp;)*quot;|"))(?:codex|claude-code|claude)/g,'$1'+agent));
}
// Only this anonymous document is public; it contains no scripts or app actions.
export const playgroundPlaceholderScript=`
(()=>{const sync=()=>document.querySelectorAll('.playground-placeholder>iframe').forEach(frame=>{
 const theme=document.documentElement.dataset.theme==='dark'?'dark':'light',agent=['claude','claude-code'].includes(document.documentElement.dataset.selectedAgent)?'claude':'codex';
 if(window.workshopRenderBackdropPreview){window.workshopRenderBackdropPreview(frame,theme,agent);return;}
 const src='/login-backdrop/components?theme='+theme+'&agent='+agent;
 if(frame.getAttribute('src')!==src)frame.setAttribute('src',src);
});
window.workshopSyncBackdrop=sync;
new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme','data-selected-agent']});
new MutationObserver(sync).observe(document.body,{childList:true,subtree:true});sync();})();
`;

// Only the authenticated Playground's isolated specimens use this inline source.
// A sandboxed ancestor cannot load the same-origin-only production document.
export const playgroundPlaceholderPreviewScript=`
window.workshopRenderBackdropPreview=(frame,theme,agent)=>{
 const value=Number(frame.dataset.blockStrength??40),strength=Number.isFinite(value)?Math.max(0,Math.min(100,value)):40;
 const state=theme+'|'+agent+'|'+strength;
 if(frame.dataset.previewState===state)return;
 frame.dataset.previewState=state;
 let html=${JSON.stringify(geometry.document).replaceAll('<','\\u003c')};
 html=html.replaceAll('--ph-strength:40%','--ph-strength:'+strength+'%');
 html=html.replace(/<html\\b[^>]*>|&lt;html\\b.*?&gt;/g,tag=>tag.replace(/(data-theme=(?:&(?:amp;)*quot;|"))(?:light|dark)/g,'$1'+theme).replace(/(data-selected-agent=(?:&(?:amp;)*quot;|"))(?:codex|claude-code|claude)/g,'$1'+(agent==='claude'?'claude-code':'codex')));
 frame.removeAttribute('src');frame.srcdoc=html;
};
window.workshopSyncBackdrop?.();
`;
