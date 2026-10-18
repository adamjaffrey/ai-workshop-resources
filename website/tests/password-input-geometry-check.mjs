import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview();await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
 const page=await browser.newPage();
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:900});await page.goto('http://127.0.0.1:'+server.address().port+'/');
  const field=page.locator('.password-field'),input=page.locator('#workshop-password');
  const box=await field.boundingBox(),entry=await input.boundingBox();
  assert.ok(Math.abs(entry.x-box.x-1)<.5);assert.ok(Math.abs(box.x+box.width-entry.x-entry.width-1)<.5,'Input reaches right border');
  for(const x of [box.x+5,box.x+box.width-5]){
   await page.locator('#gate-title').focus();await page.mouse.click(x,box.y+box.height/2);
   assert.equal(await input.evaluate(e=>document.activeElement===e),true,'Both field edges focus the input');
  }
  const spacing=await input.evaluate(e=>{const s=getComputedStyle(e),icon=e.previousElementSibling.getBoundingClientRect(),r=e.getBoundingClientRect();return {gap:r.left+parseFloat(s.paddingLeft)-icon.right,right:s.paddingRight};});
  assert.equal(spacing.gap,12);assert.equal(spacing.right,'14px');
  await input.fill('sample-password');await page.locator('#gate-title').focus();
  const clip={x:box.x+10,y:box.y+10,width:box.width-20,height:box.height-20};
  const neutral=await page.screenshot({clip,animations:'disabled'});
  await input.evaluate(e=>e.style.setProperty('background-color','rgb(218,237,255)','important'));
  const filled=await page.screenshot({clip,animations:'disabled'});
  const identical=await page.evaluate(async([before,after])=>{
   const pixels=async(bytes)=>{const bitmap=await createImageBitmap(new Blob([new Uint8Array(bytes)],{type:'image/png'}));const canvas=document.createElement('canvas');canvas.width=bitmap.width;canvas.height=bitmap.height;const ctx=canvas.getContext('2d');ctx.drawImage(bitmap,0,0);return ctx.getImageData(0,0,canvas.width,canvas.height).data;};
   const a=await pixels(before),b=await pixels(after);return a.every((v,i)=>Math.abs(v-b[i])<=1);
  },[[...neutral],[...filled]]);
  assert.equal(identical,true,'Autofill surface stays neutral (one-channel antialiasing tolerance)');
 }
 console.log('PASS: full-width password input, both-edge focus, unchanged icon/text spacing at 320, 390, 768 and 1440px');
}finally{await browser.close();server.close();}
