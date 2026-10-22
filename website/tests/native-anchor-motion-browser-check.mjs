import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port;
try{for(const engine of [chromium,webkit]){
 const browser=await engine.launch(engine===chromium?{channel:'chrome'}:{});
 try{for(const width of [390,1440])for(const kind of ['resources','playground']){
  const p=await browser.newPage({viewport:{width,height:900}});
  await p.goto(origin+(kind==='resources'?'/ai-workshop-resources':'/component-playground/url-reference'));
  await p.waitForTimeout(1200);
  await p.evaluate(kind=>{
   window.motionCalls=[];window.fadeSamples=[];
   const scroll=window.scrollTo.bind(window);window.scrollTo=(...args)=>{if(args[0]?.behavior==='smooth')motionCalls.push({start:scrollY,end:args[0].top});return scroll(...args);};
   const style=document.documentElement.style,set=style.setProperty.bind(style),property=kind==='resources'?'--anchor-arrival-progress':'--playground-anchor-progress';
   style.setProperty=(name,value,...args)=>{if(name===property)fadeSamples.push({y:scrollY,fade:+value});return set(name,value,...args);};
  },kind);
  const navigate=()=>p.evaluate(kind=>kind==='resources'?workshopResourceAnchors.navigate('step-3'):workshopPlaygroundAnchors.navigate('/component-playground/url-reference#public-query-parameters'),kind);
  for(const length of ['long','short']){
   if(length==='short')await p.evaluate(()=>{dispatchEvent(new WheelEvent('wheel'));scrollTo({top:Math.max(0,scrollY-200),behavior:'instant'});motionCalls=[];fadeSamples=[];});
   await navigate();
   const result=await p.evaluate(()=>({calls:motionCalls,samples:fadeSamples,y:scrollY}));
   assert.equal(result.calls.length,1,kind+' '+length+' uses one native smooth scroll');
   const {start,end}=result.calls[0],distance=end-start;
   assert.ok(length==='long'?Math.abs(distance)>500:Math.abs(distance)<350,JSON.stringify(result.calls));
   let previous=0,intermediate=0;
   for(const sample of result.samples.slice(1)){
    const travel=Math.min(1,Math.max(0,(sample.y-start)/distance));
    const t=Math.max(0,Math.min(1,(travel-.7)/.3)),expected=Math.max(previous,t*t*(3-2*t));
    if(sample.fade===1&&Math.abs(sample.y-end)<=1)continue;
    assert.ok(Math.abs(sample.fade-expected)<.002,JSON.stringify({kind,length,sample,expected,travel}));
    assert.ok(sample.fade>=previous);previous=sample.fade;if(sample.fade>0&&sample.fade<1)intermediate++;
   }
   assert.ok(intermediate>0,'visible fade samples '+kind+' '+length);
   assert.equal(result.samples.at(-1).fade,1);
   assert.ok(Math.abs(result.y-end)<2,'landing preserved');
   console.log('PASS native scroll/final-30% fade',engine.name(),width,kind,length);
  }
  await p.evaluate(()=>{dispatchEvent(new WheelEvent('wheel'));scrollTo({top:0,behavior:'instant'});motionCalls=[];});
  await p.evaluate(kind=>{void (kind==='resources'?workshopResourceAnchors.navigate('step-3'):workshopPlaygroundAnchors.navigate('/component-playground/url-reference#public-query-parameters'));},kind);
  await p.waitForFunction(()=>motionCalls.length===1);
  await p.waitForTimeout(50);await p.mouse.wheel(0,-20);await p.waitForTimeout(200);
  assert.equal(await p.locator('html[data-resource-anchor-arriving],html[data-playground-anchor-arriving]').count(),0,'interrupted arrival clears');
  assert.equal(await p.locator('[data-anchor-hidden],[data-playground-anchor-hidden]').count(),0,'interruption restores content');
  await p.emulateMedia({reducedMotion:'reduce'});
  await p.evaluate(()=>{dispatchEvent(new WheelEvent('wheel'));scrollTo({top:0,behavior:'instant'});motionCalls=[];fadeSamples=[];});
  await navigate();assert.equal(await p.evaluate(()=>motionCalls.length),0);assert.equal(await p.evaluate(()=>fadeSamples.at(-1).fade),1);
  await p.close();
 }}finally{await browser.close();}
}}finally{server.close();}
