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
 const src='/login-backdrop/components?theme='+theme+'&agent='+agent;
 if(frame.getAttribute('src')!==src)frame.setAttribute('src',src);
});
window.workshopSyncBackdrop=sync;
new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme','data-selected-agent']});
new MutationObserver(sync).observe(document.body,{childList:true,subtree:true});sync();})();
`;
