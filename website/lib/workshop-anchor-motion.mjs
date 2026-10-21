// Shared distance-based motion for Resources and Playground anchor arrivals.
export function anchorJourney(distance,reduced=false){
 const ramp=300,duration=reduced?0:Math.min(3000,Math.max(600,Math.abs(distance)/1.2+ramp)),cruise=duration-ramp;
 const rampDistance=t=>ramp*((t/ramp)**3-.5*(t/ramp)**4);
 return {duration,position(elapsed){if(!duration)return 1;elapsed=Math.min(duration,elapsed);const travelled=elapsed<ramp?rampDistance(elapsed):elapsed>duration-ramp?cruise-rampDistance(duration-elapsed):elapsed-ramp/2;return travelled/cruise;},fade(elapsed){const t=duration?Math.max(0,Math.min(1,(elapsed-(duration-600))/600)):1;return t*t*(3-2*t);}};
}
