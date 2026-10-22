// Browser-owned scrolling shared by both anchor controllers; fades follow travel.
export async function anchorJourney(destination,reduced,{current=()=>true,update=()=>{}}={}){
 const start=scrollY,distance=destination-start,began=performance.now();
 let progress=0,lastY=start,lastMoved=began,settled=0;
 const finish=()=>({completed:true,duration:performance.now()-began});
 if(!current())return {completed:false,duration:0};
 if(reduced||Math.abs(distance)<1){scrollTo({top:destination,behavior:'instant'});update(1);return finish();}
 update(0);
 scrollTo({top:destination,behavior:'smooth'});
 return new Promise(resolve=>{
  function tick(now){
   if(!current()){resolve({completed:false,duration:now-began});return;}
   // A preference change during travel also completes without further motion.
   if(matchMedia('(prefers-reduced-motion:reduce)').matches){scrollTo({top:destination,behavior:'instant'});update(1);resolve(finish());return;}
   const y=scrollY;
   if(Math.abs(y-lastY)>.1){lastMoved=now;settled=0;}else settled++;
   lastY=y;
   progress=Math.max(progress,Math.min(1,Math.max(0,(y-start)/distance)));
   const fade=Math.max(0,Math.min(1,(progress-.7)/.3));
   update(fade*fade*(3-2*fade));
   if(Math.abs(y-destination)<=1&&settled>=2){update(1);resolve(finish());return;}
   // Native scrolling can be interrupted without a scrollend event. Never
   // invent a new duration or keep a cancelled arrival pending indefinitely.
   if(now-lastMoved>500){resolve({completed:false,duration:now-began});return;}
   requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
 });
}
