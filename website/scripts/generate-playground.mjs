import {writeFile} from 'node:fs/promises';
import {playgroundPage} from './playground.mjs';
// Never write this HTML under public/ or dist/client/: it contains protected content.
const html=await playgroundPage({authenticated:true});
await writeFile(new URL('../lib/workshop-playground.generated.mjs',import.meta.url),'// Generated server-only authenticated playground. Do not edit.\nexport const playgroundPage = '+JSON.stringify(html)+';\n');
console.log('Generated authenticated playground from shared app sources ('+Buffer.byteLength(html)+' bytes).');
