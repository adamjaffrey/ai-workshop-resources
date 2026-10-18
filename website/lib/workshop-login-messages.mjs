// Shared by production authentication, its browser script and the local playground.
export const loginMessages = Object.freeze({
  empty: 'Enter your password.',
  wrong: 'Incorrect password. Try again.',
  network: 'Check your connection.',
  service: 'Sign-in unavailable. Try later.',
  generic: 'Sign-in failed. Try again.',
  limitedLater: 'Too many attempts. Try later.',
  retryReady: 'You can try again.',
  loading: 'Checking password…',
  success: 'Access granted.',
});
export function loginRetryMessage(duration) {
  const compact=duration.replace('less than a minute','<1 min').replace(/\bminutes?\b/g,'min');
  return 'Too many tries. Wait ' + compact + '.';
}

export const loginControlLabels = Object.freeze({opening: 'Opening Resources…'});
