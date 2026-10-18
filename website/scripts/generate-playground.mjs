import {writeFile} from 'node:fs/promises';
import {styleGuidePage} from './style-guide.mjs';
// Never write this HTML under public/ or dist/client/: it contains protected content.
const html=await styleGuidePage({authenticated:true});
await writeFile(new URL('../lib/workshop-playground.generated.mjs',import.meta.url),'// Generated server-only authenticated playground. Do not edit.\nexport const playgroundPage = '+JSON.stringify(html)+';\n');
console.log('Generated authenticated playground from shared app sources ('+Buffer.byteLength(html)+' bytes).');
