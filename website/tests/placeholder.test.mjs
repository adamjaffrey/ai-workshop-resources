import {test} from 'node:test';
import assert from 'node:assert/strict';
import {placeholderFromPage, synchroniseLoginLayout} from '../lib/workshop-placeholder.mjs';
import {loginPage, resourcePage} from '../lib/workshop-pages.mjs';

test('login inherits current resource CSS and every step automatically', () => {
  assert.equal(loginPage.match(/<style>[\s\S]*?<\/style>/)[0], resourcePage.match(/<style>[\s\S]*?<\/style>/)[0]);
  assert.equal((loginPage.match(/class="step-row"/g) || []).length, (resourcePage.match(/class="step-row"/g) || []).length);
  const changed = resourcePage.replace('</main>', '<section class="new-layout"><h3>SECRET TITLE</h3></section></main>');
  const projected = synchroniseLoginLayout('<style>body {margin:0}</style><main></main>', changed);
  assert.match(projected, /class="new-layout"/);
  assert.doesNotMatch(projected, /SECRET TITLE/);
});

test('placeholder removes text, scripts, URLs and non-layout attributes', () => {
  const html = placeholderFromPage('<main><article class="card" title="SECRET" data-prompt="SECRET" onclick="SECRET()"><a href="https://secret.example">SECRET</a><script>SECRET()</script><svg><title>SECRET</title></svg><code id="SECRET"></code></article></main>');
  assert.doesNotMatch(html, /SECRET|secret.example|href=|onclick=|data-prompt=|<script|<svg/);
  assert.match(html, /aria-hidden="true" inert/);
  assert.match(html, /ph-code-line/);
  assert.throws(() => placeholderFromPage('<main><iframe src="SECRET"></iframe></main>'), /Unsupported/);
});
