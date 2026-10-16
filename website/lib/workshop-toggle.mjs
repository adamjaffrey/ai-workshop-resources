// One press, hold and release controller for both segmented toggles.
export const toggleScript = `window.createWorkshopToggle = function(toggle) {
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
      toggleAnimation?.cancel();
      const left = selected.offsetLeft, width = selected.offsetWidth;
      indicator.style.left = left + 'px';
      indicator.style.width = width + 'px';
      if (!animate || reducedMotionQuery.matches || !Number.isFinite(previous.left) || previous.width === 0) return;
      const direction = Math.sign(left - previous.left);
      if (!direction) return;
      // Fast eased launch, slightly stronger landing squash, then diminishing rebounds.
      toggleAnimation = indicator.animate([
        {left: previous.left + 'px', width: previous.width + 'px', transform: previous.transform, offset: 0, easing: 'cubic-bezier(.2,.7,.3,1)'},
        {left: (left + direction * 6) + 'px', width: width + 'px', transform: 'scale(.95,1.06)', offset: .48, easing: 'ease-in-out'},
        {left: (left - direction * 3) + 'px', width: width + 'px', transform: 'scale(1.03,.98)', offset: .7, easing: 'ease-in-out'},
        {left: (left + direction * 1) + 'px', width: width + 'px', transform: 'scale(.99,1.01)', offset: .86, easing: 'ease-out'},
        {left: left + 'px', width: width + 'px', transform: 'scale(1)', offset: 1}
      ], {duration: 520, easing: 'linear'});
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
      toggleAnimation = indicator.animate([
        {transform: previous.transform},
        {transform: 'translateX(' + direction * 5 + 'px) scale(1.16,.92)'}
      ], {duration: 160, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards'});
    }
    function cancelPress() {
      if (held) moveIndicator(false);
    }
    toggle.addEventListener('pointerdown', event => {
      const button = event.target.closest('button');
      if (button && toggle.contains(button) && event.button === 0 && event.isPrimary) press(button, event.pointerId);
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
