// Shared by production authentication, its browser script and the local playground.
export const loginMessages = Object.freeze({
  empty: 'Enter your workshop password.',
  wrong: 'Incorrect password. Please try again.',
  network: 'Unable to connect. Check your connection and retry.',
  service: 'Sign-in is unavailable. Please try again later.',
  generic: 'Unable to sign in. Please try again.',
  limitedLater: 'Too many attempts. Please try again later.',
  retryReady: 'You can try signing in again.',
  loading: 'Checking password…',
  success: 'Access granted.',
});
export function loginRetryMessage(duration) {
  return 'Too many attempts. Try again in ' + duration + '.';
}

export const loginControlLabels = Object.freeze({opening: 'Opening Resources…'});
