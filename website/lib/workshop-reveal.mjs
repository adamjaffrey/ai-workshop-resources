// Measure only the nearly invisible endpoints. Motion between them is a single
// radius interpolation in CSS; viewport coverage never changes its speed.
export function revealRadiusRange(width, height, x, y) {
  const feather = 300;
  const maximum = Math.hypot(Math.max(x, width - x), Math.max(y, height - y)) + feather;
  const distances = [];
  for (let row = 0; row < 96; row++) for (let col = 0; col < 96; col++) {
    distances.push(Math.hypot((col + .5) * width / 96 - x, (row + .5) * height / 96 - y));
  }
  function radiusAtCoverage(target) {
    let low = 0, high = maximum;
    for (let i = 0; i < 24; i++) {
      const radius = (low + high) / 2, span = Math.min(feather, radius);
      const coverage = distances.reduce((sum, distance) => sum + Math.max(0, Math.min(1, (radius - distance) / span)), 0) / distances.length;
      if (coverage < target) low = radius; else high = radius;
    }
    return (low + high) / 2;
  }
  // Trim only 0.01% of average visible mask opacity at either end. The browser
  // swaps to the exact final theme after the animation, without a lingering tail.
  return {start: radiusAtCoverage(.0001), end: radiusAtCoverage(.9999)};
}
