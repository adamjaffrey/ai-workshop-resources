// Local-only adapter: never imported by application or production build entrypoints.
import http from 'node:http';
import {gzipSync} from 'node:zlib';
import {styleGuidePage} from './style-guide.mjs';
import {randomBytes} from 'node:crypto';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {networkInterfaces} from 'node:os';
import {pathToFileURL} from 'node:url';
import {handleRequest,makeVerifier,COOKIE} from '../lib/workshop-handler.mjs';

const previewCookie='workshop_preview_session';
const assets=new Map([
  ['/favicon.png','image/png'],
  ['/assets/MarkPro-Bold.ttf','font/ttf'],
  ['/assets/wavelength-worm.png','image/png'],
  ['/assets/workshop-resources-qr.png','image/png'],
]);

export function createPhonePreview({protectPlayground=false}={}) {
  // Each process has a fresh credential and database. Never read .env or hosted secrets.
  const password='preview-'+randomBytes(6).toString('hex');
  const sql=new DatabaseSync(':memory:');
  sql.exec(readFileSync(new URL('../drizzle/0000_early_felicia_hardy.sql',import.meta.url),'utf8'));
  const env={WORKSHOP_PASSWORD_VERIFIER:makeVerifier(password),DB:{prepare(query){return {bind(...values){return {
    async first(){return sql.prepare(query).get(...values)||null;},
    async run(){return sql.prepare(query).run(...values);},
  };}};}}};
  const server=http.createServer(async(req,res)=>{
    try {
      const url=new URL(req.url,'http://'+req.headers.host);
      if(!protectPlayground && ['GET','HEAD'].includes(req.method) && ['/style-guide','/style-guide/','/playground/'].includes(url.pathname)) {
        res.writeHead(308,{'Location':'/playground'+url.search,'Cache-Control':'no-store'});res.end();return;
      }
      if(!protectPlayground && ['GET','HEAD'].includes(req.method) && url.pathname==='/playground') {
        const compressed=(req.headers['accept-encoding']||'').split(',').some(value=>/^\s*gzip(?:\s*;|\s*$)/i.test(value)&&!/(?:^|;)\s*q=0(?:\.0*)?\s*$/i.test(value));
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','Vary':'Accept-Encoding',...(compressed?{'Content-Encoding':'gzip'}:{})});
        if(req.method==='HEAD'){res.end();return;}
        const html=await styleGuidePage({inlineAssets:false});res.end(compressed?gzipSync(html):html);return;
      }
      if(req.method==='GET'&&assets.has(url.pathname)) {
        res.writeHead(200,{'Content-Type':assets.get(url.pathname),'Cache-Control':'no-store','Access-Control-Allow-Origin':'*'});
        res.end(readFileSync(new URL('../public'+url.pathname,import.meta.url)));return;
      }
      const headers=new Headers();
      for(const [key,value] of Object.entries(req.headers))if(value!==undefined)headers.set(key,Array.isArray(value)?value.join(', '):value);
      // LAN HTTP cannot use __Host-/Secure cookies. Translate only at this local boundary.
      // Ignore production cookies entirely; local tokens live only in this process's database.
      const cookies=(req.headers.cookie||'').split(';').map(x=>x.trim()).filter(x=>x.startsWith(previewCookie+'='));
      headers.set('cookie',cookies.map(x=>COOKIE+x.slice(previewCookie.length)).join('; '));
      headers.set('cf-connecting-ip',req.socket.remoteAddress||'local');
      let body;
      if(!['GET','HEAD'].includes(req.method)) {
        const chunks=[];let size=0;
        for await(const chunk of req){size+=chunk.length;if(size>4096){res.writeHead(413);res.end('Request too large');return;}chunks.push(chunk);}
        body=Buffer.concat(chunks);
      }
      const response=await handleRequest(new Request(url,{method:req.method,headers,body}),env,Date.now(),{renderPlayground:()=>styleGuidePage({authenticated:true})});
      res.statusCode=response.status;
      for(const [key,value] of response.headers){
        res.setHeader(key,key==='set-cookie'?value.replace(COOKIE+'=',previewCookie+'=').replace('; Secure',''):value);
      }
      res.end(Buffer.from(await response.arrayBuffer()));
    } catch {res.writeHead(500);res.end('Local preview unavailable');}
  });
  server.on('close',()=>sql.close());
  return {server,password};
}

if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
  const {server,password}=createPhonePreview();
  server.listen(8788,'0.0.0.0',()=>{
    console.log('Local preview: http://localhost:8788/');
    for(const addresses of Object.values(networkInterfaces()))for(const address of addresses||[])
      if(address.family==='IPv4'&&!address.internal)console.log('Network preview: http://'+address.address+':8788/');
    console.log('Local-only test password: '+password);
    console.log('Password and sessions reset when this server stops. Production authentication is unchanged.');
  });
  for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close(()=>process.exit(0)));
}
