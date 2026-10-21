import assert from 'node:assert/strict';
import test from 'node:test';
import {Script} from 'node:vm';
import {playgroundPage} from '../scripts/playground.mjs';

// Catch document-generation errors before browser startup or server permissions.
test('every Playground tab has a matching panel and measured icon source',async()=>{
 const html=await playgroundPage({inlineAssets:false});
 const markup=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'');
 const navigation=markup.match(/<nav\b[^>]*role="tablist"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
 assert.ok(navigation,'Missing Playground tab navigation');
 const tabs=[...navigation.matchAll(/<button\b(?=[^>]*\brole="tab")(?=[^>]*\bdata-tab="([^"]+)")[^>]*>/g)].map(match=>match[1]);
 assert.equal(tabs.length,10,'Inspect all ten actual navigation tabs');
 assert.equal(new Set(tabs).size,tabs.length,'Tab names are unique');
 const panels=[...html.matchAll(/<div data-panel="([^"]+)"[^>]*>([\s\S]*?)(?=<div data-panel="|<div class="catalog-sources")/g)];
 assert.ok(tabs.includes('url-reference'));
 for(const tab of tabs){
  const panel=panels.find(match=>match[1]===tab);
  assert.ok(panel,'Missing panel for '+tab);
  assert.match(panel[2],/class="section-heading"><h2[^>]*><svg data-icon-provider="lucide" data-icon-name="[^"]+"/,'Missing first panel icon for '+tab);
 }
 const reference=panels.find(match=>match[1]==='url-reference')[2];
 for(const text of ['Resources Aliases','Playground Root Aliases','Public Query Parameters','agent=codex','agent=claude','theme=light','theme=dark','login=false','login=true'])assert.ok(reference.includes(text),text);
 const headings=[...reference.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/g)];
 for(const heading of headings)assert.match(heading[1],/^<svg data-icon-provider="lucide" data-icon-name="[^"]+" data-icon-use="[^"]+"/);
 for(const [index,match] of [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].entries())assert.doesNotThrow(()=>new Script(match[1]),'Inline script '+index);
});
