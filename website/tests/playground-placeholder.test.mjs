import test from 'node:test';
import assert from 'node:assert/strict';
import {handleRequest} from '../lib/workshop-handler.mjs';
import {playgroundPlaceholderDocument} from '../lib/workshop-playground-placeholder.mjs';
import geometry from '../lib/workshop-playground-placeholder.generated.json' with {type:'json'};
test('public backdrop is anonymous and cannot expose another tab or run code',async()=>{
 const response=await handleRequest(new Request('https://example.test/login-backdrop/components?theme=dark&agent=claude'),{});
 assert.equal(response.status,200);
 const html=await response.text();
 assert.match(html,/<html[^>]*data-theme="dark" data-selected-agent="claude-code"/);
 assert.doesNotMatch(html,/<script|&lt;script|href=|onclick=|<form|&lt;form|system-blueprint-creator|system-build-assistant|github\.com\/adamjaffrey/);
 assert.doesNotMatch(html,/data-panel="(?:typography|components|blocks|icons|errors|focus|branding|discovery)"/);
 assert.match(response.headers.get('content-security-policy'),/script-src 'none'/);
 assert.match(response.headers.get('content-security-policy'),/frame-ancestors 'self'/);
 assert.equal(response.headers.get('set-cookie'),null);
 assert.equal((await handleRequest(new Request('https://example.test/auth/session'),{})).status,503);
});
test('backdrop parameters are allowlisted and default to Codex blue',()=>{
 assert.match(playgroundPlaceholderDocument('bad','bad'),/data-theme="light" data-selected-agent="codex"/);
 assert.doesNotMatch(playgroundPlaceholderDocument('<script>','" onload="bad'),/onload=|<script/);
 assert.equal(geometry.source,'colours');assert.ok(geometry.words>1000);
});
