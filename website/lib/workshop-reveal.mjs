// Bake easing into viewport coverage, then interpolate radii linearly. Reversing
// these frames produces the exact inverse light-mask motion for night mode.
export function revealRadii(width, height, x, y) {
  const feather = 300;
  const maximum = Math.hypot(Math.max(x, width - x), Math.max(y, height - y)) + feather;
  const distances = [];
  for (let row = 0; row < 48; row++) for (let col = 0; col < 48; col++) {
    distances.push(Math.hypot((col + .5) * width / 48 - x, (row + .5) * height / 48 - y));
  }
  // Sorted distances and prefix sums avoid rescanning every sample per radius.
  distances.sort((a, b) => a - b);
  const sums = [0];
  for (const distance of distances) sums.push(sums.at(-1) + distance);
  const below = value => {
    let low = 0, high = distances.length;
    while (low < high) { const mid = (low + high) >>> 1; if (distances[mid] < value) low = mid + 1; else high = mid; }
    return low;
  };
  const coverage = radius => {
    const span = Math.min(feather, radius);
    const solid = below(radius - span), edge = below(radius);
    return (solid + ((edge - solid) * radius - (sums[edge] - sums[solid])) / span) / distances.length;
  };
  const bezier = (t, a, b) => 3 * (1-t) ** 2 * t * a + 3 * (1-t) * t*t * b + t**3;
  return Array.from({length: 101}, (_, index) => {
    if (!index) return 0;
    if (index === 100) return maximum;
    let low = 0, high = 1;
    for (let i = 0; i < 22; i++) {
      const t = (low + high) / 2;
      if (bezier(t, .22, .36) < index / 100) low = t; else high = t;
    }
    // Retain the character of the ease, with a 20% linear contribution
    // so the last visible feather does not linger (or delay night mode).
    const target = .8 * bezier((low + high) / 2, 1, 1) + .2 * index / 100;
    low = 0; high = maximum;
    for (let i = 0; i < 22; i++) {
      const r = (low + high) / 2;
      if (coverage(r) < target) low = r; else high = r;
    }
    return (low + high) / 2;
  });
}
