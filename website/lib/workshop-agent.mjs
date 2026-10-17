// Runs before paint on both pages. This stores a display preference, never access.
export const agentScript = `(() => {
  const key='workshop-selected-agent';
  const normalise=value=>value==='claude-code'?'claude-code':'codex';
  let current='codex';
  try {current=normalise(localStorage.getItem(key));} catch {}
  function apply(value) {
    current=normalise(value);
    document.documentElement.dataset.selectedAgent=current;
    window.dispatchEvent(new Event('workshop-agent-change'));
  }
  window.workshopAgent={
    get current(){return current;},
    select(value){
      const next=normalise(value);
      try {localStorage.setItem(key,next);} catch {}
      apply(next);
    }
  };
  apply(current);
  window.addEventListener('storage',event=>{
    if(event.key===key||event.key===null)apply(event.newValue);
  });
})();`;
