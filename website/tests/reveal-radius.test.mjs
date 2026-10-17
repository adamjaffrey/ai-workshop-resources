import test from 'node:test';
import assert from 'node:assert/strict';
import {revealRadiusRange} from '../lib/workshop-reveal.mjs';
test('trimmed radius endpoints retain almost all visible feathered colour change', () => {
  for (const [w,h,x,y] of [[390,844,320,60],[1440,900,1200,100],[320,500,160,250]]) {
    const {start,end}=revealRadiusRange(w,h,x,y);
    const maximum=Math.hypot(Math.max(x,w-x),Math.max(y,h-y))+300;
    assert.ok(start>0&&start<end&&end<maximum);
    const coverage=radius=>{
      let sum=0;
      for(let row=0;row<300;row++)for(let col=0;col<300;col++) {
        const distance=Math.hypot((col+.5)*w/300-x,(row+.5)*h/300-y);
        sum+=Math.max(0,Math.min(1,(radius-distance)/Math.min(300,radius)));
      }
      return sum/90000;
    };
    assert.ok(coverage(start)<.00015);
    assert.ok(coverage(end)>.99985);
  }
});
