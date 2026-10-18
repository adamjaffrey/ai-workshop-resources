// One press, hold and release controller for both segmented toggles.
// Shared 340ms motion: 160ms travel, then three 60ms rebound/settling phases.
export const toggleTiming = {arrival: 160, rebound: 60, return: 60, settle: 60};
toggleTiming.duration = toggleTiming.arrival + toggleTiming.rebound + toggleTiming.return + toggleTiming.settle;
export const toggleScript = `window.layoutWorkshopToggle = function(toggle) {
    const selected=toggle.querySelector('[aria-pressed="true"]'),indicator=toggle.querySelector('.toggle-indicator');
    if(!selected||!indicator)return;
    const left=selected.offsetLeft,width=selected.offsetWidth;
    indicator.style.left=left+'px';indicator.style.width=width+'px';
    return {left,width};
};
window.createWorkshopToggle = function(toggle) {
    const reducedMotionQuery = matchMedia('(prefers-reduced-motion: reduce)');
    toggle.classList.add('segmented-toggle');
    const indicator = document.createElement('span');
    indicator.className = 'toggle-indicator';
    indicator.setAttribute('aria-hidden', 'true');
    toggle.prepend(indicator);
    let toggleAnimation, held, releaseTimer;
    const selectedButton = () => toggle.querySelector('[aria-pressed="true"]');
    function snapshot() {
      const style = getComputedStyle(indicator);
      return {left: parseFloat(style.left), width: parseFloat(style.width), transform: style.transform};
    }
    function moveIndicator(animate = true) {
      const selected = selectedButton();
      if (!selected) return;
      const previous = snapshot();
      clearTimeout(releaseTimer);
      held = undefined;
      if (toggle.contains(document.activeElement) && document.activeElement !== selected) selected.focus({preventScroll: true});
      toggleAnimation?.cancel();
      const {left,width} = window.layoutWorkshopToggle(toggle);
      if (!animate || reducedMotionQuery.matches || !Number.isFinite(previous.left) || previous.width === 0) return;
      const direction = Math.sign(left - previous.left);
      if (!direction) return;
      // Constant-speed travel all the way to impact; reverse immediately on contact.
      // Keep the first rebound linear; soften only the small final return and settle.
      toggleAnimation = indicator.animate([
        {left: previous.left + 'px', width: previous.width + 'px', transform: previous.transform, offset: 0},
        {left: (left + direction * 6) + 'px', width: width + 'px', transform: 'scale(.95,1.06)', offset: ${toggleTiming.arrival / toggleTiming.duration}},
        {left: (left - direction * 3) + 'px', width: width + 'px', transform: 'scale(1.03,.98)', offset: ${(toggleTiming.arrival + toggleTiming.rebound) / toggleTiming.duration}, easing: 'cubic-bezier(.33,.67,.67,1)'},
        {left: (left + direction * 1) + 'px', width: width + 'px', transform: 'scale(.99,1.01)', offset: ${(toggleTiming.arrival + toggleTiming.rebound + toggleTiming.return) / toggleTiming.duration}, easing: 'ease-in-out'},
        {left: left + 'px', width: width + 'px', transform: 'scale(1)', offset: 1}
      ], {duration: ${toggleTiming.duration}, easing: 'linear'});
    }
    function press(button, input) {
      if (held || button.disabled) return;
      clearTimeout(releaseTimer);
      held = {button, input};
      if (reducedMotionQuery.matches) return;
      const previous = snapshot();
      toggleAnimation?.cancel();
      indicator.style.left = previous.left + 'px';
      indicator.style.width = previous.width + 'px';
      const selected = selectedButton();
      const direction = selected === toggle.querySelector('button') ? 1 : -1;
      // Cap added width in pixels so wide labels do not exaggerate the held stretch.
      const stretch = 1 + Math.min(.14, 6 / Math.max(previous.width, 1));
      toggleAnimation = indicator.animate([
        {transform: previous.transform},
        {transform: 'translateX(' + direction * 4 + 'px) scale(' + stretch + ',.94)'}
      ], {duration: 160, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards'});
    }
    function cancelPress() {
      if (held) moveIndicator(false);
    }
    toggle.addEventListener('pointerdown', event => {
      if (event.button !== 0 || !event.isPrimary) return;
      const directButton = event.target.closest('button');
      const button = directButton || selectedButton();
      if (!button || !toggle.contains(button) || button.disabled) return;
      if (!directButton) {
        event.preventDefault();
        button.focus({preventScroll: true});
      }
      press(button, event.pointerId);
    });
    // The track padding and central gap are part of the same hit target.
    toggle.addEventListener('click', event => {
      if (event.target.closest('button')) return;
      const button = held?.button || selectedButton();
      if (button && !button.disabled) {
        button.focus({preventScroll: true});
        button.click();
      }
    });
    window.addEventListener('pointerup', event => {
      if (held?.input !== event.pointerId) return;
      // Native click commits on release; if released outside, restore without toggling.
      releaseTimer = setTimeout(cancelPress, 0);
    });
    window.addEventListener('pointercancel', cancelPress);
    window.addEventListener('blur', cancelPress);
    toggle.addEventListener('focusout', event => {
      if (event.relatedTarget !== held?.button) cancelPress();
    });
    toggle.addEventListener('keydown', event => {
      if (![' ', 'Enter'].includes(event.key) || event.target.tagName !== 'BUTTON') return;
      event.preventDefault();
      if (!event.repeat) press(event.target, event.key);
    });
    toggle.addEventListener('keyup', event => {
      if (![' ', 'Enter'].includes(event.key)) return;
      event.preventDefault();
      if (held?.input === event.key && held.button === event.target) {
        event.target.click();
        cancelPress();
      }
    });
    new ResizeObserver(() => moveIndicator(false)).observe(toggle);
    reducedMotionQuery.addEventListener('change', () => moveIndicator(false));
    return moveIndicator;
};
`;
