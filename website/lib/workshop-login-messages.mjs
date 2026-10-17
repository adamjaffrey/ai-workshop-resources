// Shared by production authentication, its browser script and the local playground.
export const loginMessages = Object.freeze({
  empty: 'Enter your password.',
  wrong: 'Incorrect password. Try again.',
  network: 'Connection failed. Check your internet.',
  service: 'Sign-in unavailable. Try later.',
  generic: 'Sign-in failed. Try again.',
  limitedLater: 'Too many attempts. Try later.',
  retryReady: 'You can try again.',
  loading: 'Checking password…',
  success: 'Access granted.',
});
export function loginRetryMessage(duration) {
  return 'Too many attempts. Retry in ' + duration + '.';
}

export const loginControlLabels = Object.freeze({opening: 'Opening Resources…'});
