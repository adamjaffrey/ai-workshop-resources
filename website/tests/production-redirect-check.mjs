// Run against the built Worker, not the phone adapter: framework routing can
// otherwise introduce a slash-removal hop before the application handler.
import assert from 'node:assert/strict';
const origin=process.env.PRODUCTION_TEST_ORIGIN;
if(!origin)throw Error('Set PRODUCTION_TEST_ORIGIN to the local built Worker');
const aliases=[['/style-guide','/playground'],['/home','/'],['/playground/colors','/playground/colours'],['/playground/blocks','/playground/blocks-and-blur'],['/playground/blur','/playground/blocks-and-blur'],['/playground/errors','/playground/status-states'],['/playground/statuses','/playground/status-states'],['/playground/status','/playground/status-states'],['/playground/states','/playground/status-states'],['/playground/focus','/playground/focus-and-selection'],['/playground/selection','/playground/focus-and-selection'],['/playground/discovery','/playground/easter-egg'],['/playground/easter','/playground/easter-egg'],['/playground/egg','/playground/easter-egg']];
const canonical=['/playground',...['components','typography','colours','blocks-and-blur','icons','status-states','focus-and-selection','branding','easter-egg'].map(s=>'/playground/'+s)];
const query='?theme=dark&value=a%2Fb&value=c+d&empty=';
let count=0;
for(const [source,target] of [...aliases,...canonical.map(p=>[p,p]),['/unknown/path','/unknown/path']])for(const suffix of ['','/','///'])for(const method of ['GET','HEAD']){
 if(source===target&&!suffix)continue;
 const response=await fetch(origin+source+suffix+query,{method,redirect:'manual'});
 assert.equal(response.status,source===target?308:301,source+suffix);
 assert.equal(response.headers.get('location'),target+query,source+suffix);
 const next=await fetch(origin+target+query,{method,redirect:'manual'});
 assert.equal(next.headers.get('location'),null,'No second hop: '+target);
 count++;
}
console.log('PASS: '+count+' production Worker redirect cases, direct final destinations and exact query preservation');
