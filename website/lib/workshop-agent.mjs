import {toggleTiming} from './workshop-toggle.mjs';
// Runs before paint on both pages. This stores a display preference, never access.
export const agentScript = `(() => {
  const key='workshop-selected-agent';
  const normalise=value=>value==='claude-code'?'claude-code':'codex';
  let current='codex';
  try {current=normalise(localStorage.getItem(key));} catch {}
  function apply(value, animate = false) {
    const changed = current !== normalise(value);
    current=normalise(value);
    const change = () => {
      document.documentElement.dataset.selectedAgent=current;
      window.dispatchEvent(new Event('workshop-agent-change'));
    };
    if (animate && changed && window.workshopColourTransition) window.workshopColourTransition(change, ${toggleTiming.duration * toggleTiming.arrivalFraction});
    else change();
  }
  window.workshopAgent={
    get current(){return current;},
    select(value){
      const next=normalise(value);
      try {localStorage.setItem(key,next);} catch {}
      apply(next, true);
    }
  };
  apply(current);
  window.addEventListener('storage',event=>{
    if(event.key===key||event.key===null)apply(event.newValue, true);
  });
})();`;
