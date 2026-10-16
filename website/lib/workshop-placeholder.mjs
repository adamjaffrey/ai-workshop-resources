// Decorative geometry only: never derive these shapes from protected content.
// Reuse the page's layout classes so widths, gaps and breakpoints stay aligned.
const line = (width='100%', extra='') => `<span class="ph-line ${extra}" style="width:${width}"></span>`;
const paragraph = widths => widths.map(w=>line(w)).join('');
const card = () => `<article>
  <div class="card-top"><span class="symbol"></span><div class="ph-step"><span class="ph-number"></span>${line('100px')}</div></div>
  <div class="ph-card-title">${line('76%')}</div>
  <div class="ph-slug">${line('46%')}</div>
  <div class="ph-description">${paragraph(['98%','95%','36%'])}</div>
  <div class="code-wrap"><div class="code-header">${line('110px')}<span class="ph-copy"></span></div>
    <div class="ph-code-body">${paragraph(['97%','92%','10%'])}<div class="ph-code-gap"></div>${paragraph(['98%','94%','7%'])}<div class="ph-code-gap"></div>${paragraph(['91%','100%','96%','43%'])}</div>
  </div>
</article>`;

export const placeholderMarkup = `<main class="page-placeholder" aria-hidden="true" inert>
  <div class="brand"><span class="ph-brand-mark"></span>${line('124px')}</div>
  <div class="page-header"><div>
    <div class="ph-eyebrow">${line('185px')}</div>
    <div class="ph-title">${line('98%')}${line('36%')}</div>
    <div class="ph-intro">${paragraph(['98%','76%'])}</div>
  </div><div class="qr-card"><div class="ph-qr"></div><div class="ph-caption">${line('100%')}</div></div></div>
  <div class="controls">${line('62px')}<div class="toggle ph-toggle"><span></span><span></span></div></div>
  <div class="cards">${card()}${card()}</div>
  <div class="help ph-help">${paragraph(['99%','53%'])}</div><div class="status"></div>
  <footer>${line('230px')}</footer>
</main>`;

export const placeholderStyles = `
.page-placeholder { pointer-events:none; user-select:none; filter:blur(5px); }
.page-placeholder .ph-line { display:block; max-width:100%; height:10px; border-radius:3px; background:#747b80; }
.page-placeholder .brand { height:20px; }
.page-placeholder .brand .ph-line { height:14px; background:#35393c; }
.ph-brand-mark { display:block; width:48px; height:18px; border-radius:50%; background:#35393c; }
.ph-eyebrow { height:14px; margin-bottom:16px; padding-top:2px; }
.ph-eyebrow .ph-line { background:#4283a8; }
.ph-title { margin-bottom:20px; }
.ph-title .ph-line { height:40px; margin:0 0 16px; background:#35393c; }
.ph-title .ph-line:last-child { margin-bottom:0; }
.ph-intro { max-width:660px; }
.ph-intro .ph-line { height:12px; margin:10px 0 16px; }
.ph-qr { width:190px; height:190px; max-width:100%; background:repeating-conic-gradient(#333 0% 25%,#fff 0% 50%) 0 0/22px 22px; border:8px solid #fff; }
.ph-caption { padding:12px 0 5px; }
.ph-toggle { height:50px; }
.ph-toggle span { display:block; width:105px; border-radius:8px; }
.ph-toggle span:first-child { background:#00a2ff; }
.ph-toggle span:last-child { width:153px; background:#dadcde; }
.ph-step { display:flex; align-items:center; gap:10px; }
.ph-number { width:40px; height:40px; border-radius:50%; background:#00a2ff; }
.ph-card-title { height:29px; padding:5px 0; margin-bottom:8px; }
.ph-card-title .ph-line { height:19px; background:#35393c; }
.ph-slug { height:14px; padding-top:3px; margin-bottom:16px; }
.ph-slug .ph-line { height:8px; }
.ph-description { height:74px; margin-bottom:24px; }
.ph-description .ph-line { height:10px; margin:7px 0 15px; }
.page-placeholder .code-header { height:61px; }
.page-placeholder .code-header .ph-line { height:8px; background:#9a9fa3; }
.ph-copy { display:block; width:111px; height:33px; border:1px solid #ffffff30; background:#ffffff12; border-radius:7px; }
.ph-code-body { padding:18px; }
.ph-code-body .ph-line { height:7px; margin:7px 0 14.6px; background:#c2c5c7; }
.ph-code-gap { height:21.6px; }
.ph-help .ph-line { height:8px; margin:7px 0 14px; }
@media(max-width:700px) {
  .ph-title .ph-line { height:26px; margin-bottom:10px; }
  .ph-title .ph-line:last-child { width:65% !important; }
  .ph-intro { padding-bottom:20px; }
  .ph-toggle span { width:100px; }
  .ph-toggle span:last-child { width:143px; }
  .ph-step .ph-line { width:80px !important; }
}
`;
