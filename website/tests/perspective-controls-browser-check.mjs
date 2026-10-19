import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
import {perspectiveControls} from '../lib/workshop-easter-egg.mjs';
const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));const b=await chromium.launch({channel:'chrome',headless:true});
try{
 const p=await b.newPage();await p.goto('http://127.0.0.1:'+server.address().port+'/playground/easter-egg');const f=p.frameLocator('#discovery-frame');await f.locator('.perspective').waitFor();
 const expected=view=>perspectiveControls.filter(c=>view==='ready'?['sweep','particles'].includes(c.group):view==='complete'?(c.group==='sweep'&&c.key!=='duration')||['finalDuration','revealDuration','finalDelay'].includes(c.key):view==='after'?(c.group==='sweep'&&c.key!=='duration')||c.key==='finalDuration':view==='reveal'?['burstDuration','burstFeather','backdropFade'].includes(c.key):view==='success'?c.group==='halo':false).map(c=>c.key);
 const read=()=>p.locator('[data-egg-controls]:visible input').evaluateAll(es=>es.map(e=>e.id.slice('perspective-'.length)));
 for(const width of [390,1440]){await p.setViewportSize({width,height:950});for(const view of ['complete','after','reveal','success','locked','ready','reveal','complete','success','ready','locked']){
 await p.locator('input[name=egg][value='+view+']').focus();await p.keyboard.press('Space');assert.deepEqual(await read(),expected(view),'immediate controls '+view);
 await f.locator('body').evaluate(()=>parent.postMessage({guide:'egg-state',view:'old-view',state:'success'},'*'));await p.waitForTimeout(80);assert.deepEqual(await read(),expected(view),'stale event ignored '+view);
 } }
 await p.locator('input[name=egg][value=success]').locator('..').click();await f.locator('.perspective-dialog').waitFor({state:'visible'});await f.locator('.perspective-dialog button').click();await p.waitForTimeout(100);assert.deepEqual(await read(),expected('success'),'closing held success does not replace selected controls');
 await p.locator('input[name=egg][value=live]').locator('..').click();await p.waitForTimeout(250);await f.locator('body').evaluate(()=>parent.postMessage({guide:'egg-state',view:'live',state:'ready'},'*'));await p.waitForTimeout(100);assert.deepEqual(await read(),expected('ready'),'Natural Discovery follows live state');
 console.log('PASS: immediate stable control sets, rapid view switching, stale events, dialog closing and Natural Discovery');
}finally{await b.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
