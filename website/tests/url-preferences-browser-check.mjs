import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {createPhonePreview} from '../scripts/phone-preview.mjs';
const {server,password}=createPhonePreview({protectPlayground:true});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const context=await browser.newContext({colorScheme:'light',reducedMotion:'reduce'}),page=await context.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const check=async(agent,theme,playground=false)=>{
  // Selector synchronisation runs on DOMContentLoaded after login navigation.
  await page.waitForLoadState('domcontentloaded');
  assert.equal(await page.locator('html').getAttribute('data-selected-agent'),agent);
  assert.equal(await page.locator('html').getAttribute('data-theme'),theme);
  if(playground){assert.equal(await page.locator('#agent input:checked').inputValue(),agent);assert.equal(await page.locator('#theme input:checked').inputValue(),theme);}
  if(await page.locator('[data-playground-favicon]').count()){
   const svg=decodeURIComponent(await page.locator('[data-playground-favicon]').getAttribute('href'));
   assert.ok(svg.includes(agent==='codex'?'#0285FF':'#D97757'));
   assert.ok(svg.includes(theme==='dark'?'fill="#17191c"':'stroke="white"'));
  }
 };
 // Locked destination honours overrides before authentication.
 await page.goto(origin+'/Components/ICON?AGENT=Claude&Theme=Night');await check('claude-code','dark');
 assert.equal(new URL(page.url()).pathname,'/component-playground/icons');
 await page.fill('#workshop-password',password);await page.click('.gate-submit');await page.waitForSelector('#playground-title');await check('claude-code','dark',true);
 assert.equal(new URL(page.url()).search,'?agent=claude-code&theme=dark');
 const agents={codex:'codex',chatgpt:'codex','chatgpt-codex':'codex',claude:'claude-code','claude-code':'claude-code',code:'claude-code'};
 const themes={light:'light',day:'light',sun:'light',dark:'dark',night:'dark',moon:'dark'};
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:900});
  for(const [alias,agent] of Object.entries(agents)){
   await page.goto(origin+'/component-playground?agent='+alias.toUpperCase()+'&theme=LIGHT');await check(agent,'light',true);
  }
  for(const [alias,theme] of Object.entries(themes)){
   await page.goto(origin+'/component-playground?agent=code&theme='+alias.toUpperCase());await check('claude-code',theme,true);
  }
  await page.screenshot({path:'/tmp/playground-url-'+width+'.png'});
 }
 await page.goto(origin+'/component-playground?agent=codex&theme=light');
 await page.locator('#agent input[value="claude-code"]').check();await page.locator('#theme input[value="dark"]').check();await check('claude-code','dark',true);
 await page.locator('[data-tab=icons]').click();await page.reload();await check('claude-code','dark',true);
 await page.goto(origin+'/component-playground?agent=__proto__&theme=unknown');await check('claude-code','dark',true);
 await context.request.post(origin+'/auth/logout',{headers:{origin},maxRedirects:0});
 await page.goto(origin+'/ai-workshop-resources?show-login=true&agent=chatgpt&theme=sun');await check('codex','light');
 await page.fill('#workshop-password',password);await page.click('.gate-submit');await page.waitForURL(url=>!url.searchParams.has('show-login'));await page.waitForSelector('#workshop-content');assert.equal(new URL(page.url()).searchParams.has('show-login'),false);await check('codex','light');
 await page.goto(origin+'/');await check('codex','light');
 // Unknown paths still canonicalise site-wide, then remain a genuine 404.
 const redirect=await context.request.get(origin+'/UNKNOWN/Path?Keep=Case',{maxRedirects:0});assert.equal(redirect.status(),301);assert.equal(redirect.headers().location,'/unknown/path?Keep=Case');
 assert.equal((await context.request.get(origin+'/unknown/path')).status(),404);
 assert.equal((await context.request.get(origin+'/assets/MarkPro-Bold.ttf',{maxRedirects:0})).status(),301);
 assert.equal((await context.request.get(origin+'/assets/markpro-bold.ttf')).status(),200);
 // Automatic local preview must leave inspection mode after a successful login.
 const automatic=createPhonePreview({autoLogin:true});await new Promise(r=>automatic.server.listen(0,'127.0.0.1',r));
 const local='http://127.0.0.1:'+automatic.server.address().port;
 try{
  for(const width of [390,1440]){
   await page.setViewportSize({width,height:900});
   await page.goto(local+'/ai-workshop-resources?Logged-In=FALSE&Theme=MOON');
   assert.equal(new URL(page.url()).search,'?show-login=true&theme=dark');
   await page.fill('#workshop-password',automatic.password);await page.click('.gate-submit');
   await page.waitForURL(url=>!url.searchParams.has('show-login'));await page.waitForSelector('#workshop-content');assert.equal(new URL(page.url()).search,'?theme=dark');
   assert.equal((await context.request.get(local+'/auth/session')).status(),200);
   await page.goto(local+'/ai-workshop-resources?show-login=true');await page.waitForSelector('#access-form');
   assert.equal((await context.request.get(local+'/auth/session')).status(),401);
   await page.goto(local+'/component-playground/icons?show-login=false&Agent=CLAUDE&Theme=NIGHT');
   await page.waitForSelector('#access-form');assert.equal(new URL(page.url()).search,'?show-login=false&agent=claude-code&theme=dark');
   await page.fill('#workshop-password',automatic.password);await page.click('.gate-submit');
   await page.waitForURL(url=>!url.searchParams.has('show-login'));await page.waitForSelector('#playground-title');
   assert.equal(new URL(page.url()).pathname,'/component-playground/icons');
   assert.equal((await context.request.get(local+'/auth/session')).status(),200);
   await page.goto(local+'/component-playground/icons?show-login=true');await page.waitForSelector('#access-form');
   assert.equal((await context.request.get(local+'/auth/session')).status(),401);
  }
 }finally{await new Promise(r=>automatic.server.close(r));}
 assert.deepEqual(errors,[]);
 console.log('PASS: aliases, case, locked login continuity, saved preferences, selectors, favicon variants, mobile/desktop and asset redirects');
}finally{await browser.close();await new Promise(r=>server.close(r));}
