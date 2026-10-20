// Shared prose defaults: markers sit near the text rail, wrapped lines hang
// beneath the item text, and nested lists advance by one compact indent.
export const bodyTypeCSS=String.raw`
:root{--body-list-indent:20px;--body-code-font:ui-monospace,SFMono-Regular,Consolas,monospace}
ul:not([role]){padding-inline-start:var(--body-list-indent);margin-inline:0;list-style-position:outside}
ul:not([role])>li{padding-inline-start:0}
ul:not([role])>li+li{margin-top:8px}
ul:not([role]) ul{margin-block:8px}
code,kbd,samp{font-family:var(--body-code-font)}
`;
