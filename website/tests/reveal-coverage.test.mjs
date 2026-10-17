import test from 'node:test';
import assert from 'node:assert/strict';
import {revealRadii} from '../lib/workshop-reveal.mjs';
test('visible feathered coverage follows easing across viewport shapes and origins', () => {
  for (const [w,h,x,y] of [[390,844,320,60],[1440,900,1200,100],[320,500,160,250]]) {
    const radii=revealRadii(w,h,x,y);
    assert.equal(radii[0],0);
    assert.equal(radii[100],Math.hypot(Math.max(x,w-x),Math.max(y,h-y))+300);
    for(let i=1;i<radii.length;i++)assert.ok(radii[i]>=radii[i-1]);
    // Independent denser sampling of the actual gradient at known bezier points.
    for(const u of [.1,.25,.5,.75]) {
      const time=3*(1-u)**2*u*.22+3*(1-u)*u*u*.36+u**3;
      const expected=1-(1-u)**3;
      const frame=time*100,lower=Math.floor(frame);
      const radius=radii[lower]+(radii[lower+1]-radii[lower])*(frame-lower);
      let coverage=0;
      for(let row=0;row<120;row++)for(let col=0;col<120;col++) {
        const distance=Math.hypot((col+.5)*w/120-x,(row+.5)*h/120-y);
        coverage+=Math.max(0,Math.min(1,(radius-distance)/Math.min(300,radius)));
      }
      assert.ok(Math.abs(coverage/14400-expected)<.004);
    }
  }
});
