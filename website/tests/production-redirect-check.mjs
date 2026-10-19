// Run against the built Worker, not the phone adapter: framework routing can
// otherwise introduce a slash-removal hop before the application handler.
import assert from 'node:assert/strict';
const origin=process.env.PRODUCTION_TEST_ORIGIN;
if(!origin)throw Error('Set PRODUCTION_TEST_ORIGIN to the local built Worker');
const aliases=[['/workshop-resources','/ai-workshop-resources'],['/style-guide','/component-playground'],['/home','/ai-workshop-resources'],['/component-playground/colors','/component-playground/colours'],['/component-playground/blocks','/component-playground/blocks-and-blur'],['/component-playground/blur','/component-playground/blocks-and-blur'],['/component-playground/errors','/component-playground/status-states'],['/component-playground/statuses','/component-playground/status-states'],['/component-playground/status','/component-playground/status-states'],['/component-playground/states','/component-playground/status-states'],['/component-playground/focus','/component-playground/focus-and-selection'],['/component-playground/selection','/component-playground/focus-and-selection'],['/component-playground/discovery','/component-playground/easter-egg'],['/component-playground/easter','/component-playground/easter-egg'],['/component-playground/egg','/component-playground/easter-egg']];
const canonical=['/component-playground',...['components','typography','colours','blocks-and-blur','icons','status-states','focus-and-selection','branding','easter-egg'].map(s=>'/component-playground/'+s)];
const query='?theme=dark&value=a%2Fb&value=c+d&empty=';
let count=0;
for(const [source,target] of [...aliases,...canonical.map(p=>[p,p]),['/unknown/path','/unknown/path']])for(const suffix of ['','/','///'])for(const method of ['GET','HEAD']){
 if(source===target&&!suffix)continue;
 const response=await fetch(origin+source+suffix+query,{method,redirect:'manual'});
 assert.equal(response.status,301,source+suffix);
 assert.equal(response.headers.get('location'),target+query,source+suffix);
 const next=await fetch(origin+target+query,{method,redirect:'manual'});
 assert.equal(next.headers.get('location'),null,'No second hop: '+target);
 count++;
}
console.log('PASS: '+count+' production Worker redirect cases, direct final destinations and exact query preservation');

for(const [path,target] of [['/','/ai-workshop-resources'],['/AI','/ai-workshop-resources'],['/AI-WORKSHOPS-RESOURCE/','/ai-workshop-resources'],['/Resources','/ai-workshop-resources'],['/COMPONENTS/ICON/','/component-playground/icons'],['/WORKSHOP-RESOURCES/','/ai-workshop-resources'],['/Unknown/Path','/unknown/path'],['/assets/MarkPro-Bold.ttf','/assets/markpro-bold.ttf']]){
 const r=await fetch(origin+path+'?Keep=Case',{redirect:'manual'});assert.equal(r.status,301);assert.equal(r.headers.get('location'),target+'?Keep=Case');
}
const font=await fetch(origin+'/assets/markpro-bold.ttf');assert.equal(font.status,200);
console.log('PASS: canonical Resources, site-wide case and existing font redirects on the built Worker');

for(const method of ['GET','HEAD']){
 const response=await fetch(origin+'/COMPONENTS/ICON/?AGENT=Claude&Theme=MOON&LOGIN=1&Token=AbC%2FZ+Q',{method,redirect:'manual'});
 assert.equal(response.status,301);
 assert.equal(response.headers.get('location'),'/component-playground/icons?agent=claude-code&theme=dark&show-login=true&Token=AbC%2FZ+Q');
 const canonical=await fetch(origin+response.headers.get('location'),{method,redirect:'manual'});
 assert.equal(canonical.headers.get('location'),null);
}
console.log('PASS: public query case normalisation combines with path aliases in one production redirect');

for(const [source,target] of [['/AIS-WORKSHOPS-RESOURCE/Day-1-Resources/','/ai-workshop-resources/day-1-resources'],['/home/Day-1/Notes/','/ai-workshop-resources/day-1/notes'],['/styles-guides/foci-and-selections/Example/','/component-playground/focus-and-selection/example'],['/styles-guide/easters-eggs/Example/','/component-playground/easter-egg/example']])for(const method of ['GET','HEAD']){
 const response=await fetch(origin+source+'?agent=CHATGPT-CODEX&theme=SUN&Keep=AbC',{method,redirect:'manual'});
 assert.equal(response.status,301);assert.equal(response.headers.get('location'),target+'?agent=codex&theme=light&Keep=AbC');
 assert.equal((await fetch(origin+response.headers.get('location'),{method,redirect:'manual'})).headers.get('location'),null);
}
console.log('PASS: descendant aliases, plural families and canonical preference values on the built Worker');

for(const alias of ['style','styles','guide','guides']){
 const response=await fetch(origin+'/'+alias+'/icon/?Agent=INVALID&Theme=MOON&Keep=AbC',{redirect:'manual'});
 assert.equal(response.status,301);assert.equal(response.headers.get('location'),'/component-playground/icons?theme=dark&Keep=AbC');
}
const invalid=await fetch(origin+'/ai-workshop-resources?agent=unknown&theme=',{redirect:'manual'});
assert.equal(invalid.status,301);assert.equal(invalid.headers.get('location'),'/ai-workshop-resources');
console.log('PASS: short Playground aliases and invalid preference cleanup on the built Worker');
