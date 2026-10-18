// Deliberately undisclosed pointer shortcut; this is navigation, not access control.
export const playgroundShortcutScript = `
(() => {
 const version=document.querySelector('footer .footer-version');
 if(!version)return;
 let count=0,started=0;
 const reset=()=>{count=0;started=0;};
 document.addEventListener('click',event=>{
  if(event.button!==0||event.target!==version){reset();return;}
  const now=performance.now();
  if(!count||now-started>3000){count=0;started=now;}
  if(++count!==3)return;
  reset();
  if(document.dispatchEvent(new CustomEvent('workshop:open-playground',{cancelable:true})))window.open('/playground','_blank','noopener,noreferrer');
 });
 version.addEventListener('pointerdown',event=>{if(count&&performance.now()-started<=3000)event.preventDefault();});
 window.addEventListener('blur',reset);
 document.addEventListener('visibilitychange',reset);
})();
`;
