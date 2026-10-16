// One indicator controller for the agent and theme segmented buttons.
export const toggleScript = `window.createWorkshopToggle = function(toggle) {
    const reducedMotionQuery = matchMedia('(prefers-reduced-motion: reduce)');
    toggle.classList.add('segmented-toggle');
    const indicator = document.createElement('span');
    indicator.className = 'toggle-indicator';
    indicator.setAttribute('aria-hidden', 'true');
    toggle.prepend(indicator);
    let toggleAnimation;
    function moveIndicator(animate = true) {
      const selected = toggle.querySelector('[aria-pressed="true"]');
      if (!selected) return;
      const previous = {left: parseFloat(getComputedStyle(indicator).left), width: indicator.getBoundingClientRect().width};
      toggleAnimation?.cancel();
      const left = selected.offsetLeft;
      const width = selected.offsetWidth;
      indicator.style.left = left + 'px';
      indicator.style.width = width + 'px';
      if (!animate || reducedMotionQuery.matches || !Number.isFinite(previous.left) || previous.width === 0 || previous.left === left) return;
      const direction = Math.sign(left - previous.left);
      toggleAnimation = indicator.animate([
        {left: previous.left + 'px', width: previous.width + 'px', transform: 'scale(1)'},
        {left: (previous.left + (left - previous.left) * .55) + 'px', width: ((previous.width + width) / 2) + 'px', transform: 'scale(1.12,.94)', offset: .38},
        {left: (left + direction * 5) + 'px', width: width + 'px', transform: 'scale(.97,1.03)', offset: .72},
        {left: (left - direction * 2) + 'px', width: width + 'px', transform: 'scale(1.015,.99)', offset: .88},
        {left: left + 'px', width: width + 'px', transform: 'scale(1)'}
      ], {duration: 520, easing: 'cubic-bezier(.2,.65,.3,1)'});
    }
    new ResizeObserver(() => moveIndicator(false)).observe(toggle);
    reducedMotionQuery.addEventListener('change', () => moveIndicator(false));
    return moveIndicator;
};
`;
