// Deliberately undisclosed pointer shortcut; this is navigation, not access control.
export const brandShortcutScript = (destination) => `
(() => {
 const brand=document.querySelector('.brand');
 const backdrop=document.querySelector('.playground-placeholder>iframe');
 if(!brand&&!backdrop)return;
 // The locked backdrop is inert beneath the scrim: use its actual logo bounds,
 // without inserting a focusable hotspot or intercepting the login panel.
 const onBrand=event=>{
  if(!document.documentElement.classList.contains('is-locked'))return brand?.contains(event.target);
  if(event.target.closest('.gate-panel'))return false;
  let r=brand?.getBoundingClientRect();
  if(backdrop){
   // Anonymous, script-disabled same-origin geometry; no protected page is embedded.
   const logo=backdrop.contentDocument?.querySelector('.brand');
   if(!logo)return false;
   const bounds=logo.getBoundingClientRect(),frame=backdrop.getBoundingClientRect();
   const scaleX=frame.width/backdrop.clientWidth,scaleY=frame.height/backdrop.clientHeight;
   r={left:frame.left+bounds.left*scaleX,right:frame.left+bounds.right*scaleX,top:frame.top+bounds.top*scaleY,bottom:frame.top+bounds.bottom*scaleY,width:bounds.width,height:bounds.height};
  }
  if(!r)return false;
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
  if(document.dispatchEvent(new CustomEvent('workshop:open-playground',{cancelable:true})))window.open(${JSON.stringify(destination)},'_blank','noopener,noreferrer');
 });
 document.addEventListener('pointerdown',event=>{if(onBrand(event)&&count&&performance.now()-started<=3000)event.preventDefault();});
 window.addEventListener('blur',reset);
 document.addEventListener('visibilitychange',reset);
})();
`;

export const playgroundShortcutScript = brandShortcutScript('/component-playground');
export const resourcesShortcutScript = brandShortcutScript('/ai-workshop-resources');
