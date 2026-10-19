// Deliberately undisclosed pointer shortcut; this is navigation, not access control.
export const playgroundShortcutScript = `
(() => {
 const brand=document.querySelector('.brand');
 if(!brand)return;
 // The locked backdrop is inert beneath the scrim: use its actual logo bounds,
 // without inserting a focusable hotspot or intercepting the login panel.
 const onBrand=event=>{
  if(!document.documentElement.classList.contains('is-locked'))return brand.contains(event.target);
  if(event.target.closest('.gate-panel'))return false;
  const r=brand.getBoundingClientRect();
  return r.width>0&&r.height>0&&event.clientX>=r.left&&event.clientX<=r.right&&event.clientY>=r.top&&event.clientY<=r.bottom;
 };
 let count=0,started=0;
 const reset=()=>{count=0;started=0;};
 document.addEventListener('click',event=>{
  if(event.button!==0||!onBrand(event)){reset();return;}
  const now=performance.now();
  if(!count||now-started>3000){count=0;started=now;}
  if(++count!==3)return;
  reset();
  if(document.dispatchEvent(new CustomEvent('workshop:open-playground',{cancelable:true})))window.open('/component-playground','_blank','noopener,noreferrer');
 });
 document.addEventListener('pointerdown',event=>{if(onBrand(event)&&count&&performance.now()-started<=3000)event.preventDefault();});
 window.addEventListener('blur',reset);
 document.addEventListener('visibilitychange',reset);
})();
`;
