import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server}=createPhonePreview({autoLogin:true});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message));
 for(const width of [320,390,768,1440])for(const theme of ['light','dark'])for(const agent of ['codex','claude-code']){
  await page.setViewportSize({width,height:900});
  await page.goto(origin+'/component-playground/url-reference?theme='+theme+'&agent='+agent);
  const panel=page.locator('#panel-url-reference');await panel.waitFor({state:'visible'});
  assert.equal(await page.locator('#tab-url-reference').getAttribute('aria-selected'),'true');
  for(const heading of ['Hostname Redirects','Resources Aliases','Playground Root Aliases','Playground Sections','Public Query Parameters','Login Aliases and Validation'])assert.ok((await panel.innerText()).includes(heading),heading);
  for(const value of ['agent=codex','agent=claude-code','theme=light','theme=dark','show-login=true','show-login=false','login=1','login=0','url-references'])assert.ok((await panel.innerText()).includes(value),value);
  const headingIcons=await panel.locator('h2>svg,h3>svg').evaluateAll(nodes=>nodes.map(svg=>({name:svg.dataset.iconName,use:svg.dataset.iconUse})));
  assert.equal(headingIcons.length,await panel.locator('h2,h3').count(),'Every reference heading has an icon');
  assert.equal(await page.locator('#tab-url-reference svg').getAttribute('data-icon-name'),'file-code-corner');
  for(const {name,use} of headingIcons){
   assert.ok((await page.locator('#playground-icon-catalog [data-catalog-icon="'+name+'"]').first().textContent()).includes(use),'Catalogue includes '+use);
  }
  assert.ok((await page.locator('#playground-icon-catalog [data-catalog-icon="file-code-corner"]').textContent()).includes('playground-tab-url-reference'));
  for(const table of await panel.locator('.url-table').all()){
   assert.equal(await table.getAttribute('tabindex'),'0','Overflow table remains keyboard-accessible');
   assert.ok(await table.locator('table').evaluate(e=>e.getBoundingClientRect().width>=600),'Keep columns readable');
  }
  assert.equal(await panel.locator('a').count(),0,'Examples cannot log users out');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'No page overflow');
  assert.equal(await page.locator('nav[role=tablist]').evaluate(e=>{e.scrollTop=10;return e.scrollTop;}),0,'Tabs remain horizontal only');
  if(agent==='codex'&&theme==='light'&&[390,1440].includes(width))await page.screenshot({path:'/tmp/url-reference-'+width+'.png'});
 }
 await page.locator('#tab-url-reference').focus();await page.keyboard.press('ArrowLeft');
 assert.equal(await page.locator('#tab-discovery').getAttribute('aria-selected'),'true');
 await page.goBack();await page.locator('#panel-url-reference').waitFor({state:'visible'});
 assert.deepEqual(errors,[]);
 console.log('PASS: URL Reference paths, query parameters, inert examples, navigation and overflow across four widths, both themes and agents');
}finally{await browser.close();server.close();}
