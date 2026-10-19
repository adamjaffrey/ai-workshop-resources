import {test} from 'node:test';
import assert from 'node:assert/strict';
import {placeholderFromPage} from '../lib/workshop-placeholder.mjs';
import {loginPage, resourcePage} from '../lib/workshop-pages.mjs';
import geometry from '../lib/workshop-placeholder.generated.json' with {type: 'json'};

test('login inherits current CSS and measured geometry; stale layouts fail', () => {
  assert.equal(loginPage.match(/<style>[\s\S]*?<\/style>/)[0], resourcePage.match(/<style>[\s\S]*?<\/style>/)[0]);
  assert.equal((loginPage.match(/class="step-row"/g) || []).length, (resourcePage.match(/class="step-row"/g) || []).length);
  assert.throws(() => placeholderFromPage(resourcePage, geometry.layoutRevision + 1), /stale/);
  assert.equal(placeholderFromPage(resourcePage + '<script>/* non-layout change */</script>'), geometry.markup);
});
test('measured geometry includes prompt words without source text or actions', () => {
  const html = geometry.markup;
  assert.ok(geometry.words > 1000);
  assert.doesNotMatch(html, /system-blueprint-creator|system-build-assistant|github.com|href=|onclick=|data-copy=|<script|<title|<form|<svg/);
  assert.match(html, /aria-hidden="true" inert/);
  assert.doesNotMatch(html.replace(/<[^>]*>/g, ''), /[^x\s/\-]/);
  assert.match(html, /--ph-cap/);
  assert.doesNotMatch(html, /ph-code-line/);
});
