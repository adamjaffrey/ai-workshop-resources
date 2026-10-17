// Bake easing into viewport coverage, then interpolate radii linearly. Reversing
// these frames produces the exact inverse light-mask motion for night mode.
export function revealRadii(width, height, x, y) {
  const feather = 300;
  const maximum = Math.hypot(Math.max(x, width - x), Math.max(y, height - y)) + feather;
  const distances = [];
  for (let row = 0; row < 48; row++) for (let col = 0; col < 48; col++) {
    distances.push(Math.hypot((col + .5) * width / 48 - x, (row + .5) * height / 48 - y));
  }
  const coverage = radius => {
    // Matches the CSS gradient: its opaque stop cannot lie below zero.
    const span = Math.min(feather, radius);
    return distances.reduce((sum, distance) => sum + Math.max(0, Math.min(1, (radius - distance) / span)), 0) / distances.length;
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
    const target = bezier((low + high) / 2, 1, 1);
    low = 0; high = maximum;
    for (let i = 0; i < 22; i++) {
      const r = (low + high) / 2;
      if (coverage(r) < target) low = r; else high = r;
    }
    return (low + high) / 2;
  });
}
