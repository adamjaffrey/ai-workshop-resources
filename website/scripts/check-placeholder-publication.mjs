// Read-only publication preflight. The caller must resolve the latest successful
// Sites deployment and obtain its exact source checkout, never assume HEAD is live.
import {execFileSync} from 'node:child_process';
import {readFileSync,existsSync} from 'node:fs';
import {resolve,relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {placeholderLayoutRevision,playgroundPlaceholderLayoutRevision} from '../lib/workshop-layout.mjs';
const args=process.argv.slice(2),arg=name=>args[args.indexOf(name)+1];
if(!args.includes('--published-source')||!args.includes('--published-commit'))throw Error('Supply --published-source PATH --published-commit SHA from the latest successful Sites deployment.');
const source=resolve(arg('--published-source')),commit=arg('--published-commit');
const git=(...args)=>execFileSync('git',['-C',source,...args],{encoding:'utf8'}).trim();
if(git('rev-parse','HEAD')!==commit)throw Error('Published checkout does not match the confirmed Sites source commit.');
if(git('status','--porcelain','--untracked-files=no'))throw Error('Published source checkout has tracked modifications.');
const root=fileURLToPath(new URL('../',import.meta.url));
const files=git('ls-tree','-r','--name-only',commit).split('\n').filter(p=>/^(lib|scripts|public|app|build)\//.test(p));
const changed=files.filter(p=>!existsSync(resolve(root,p))||!readFileSync(resolve(root,p)).equals(readFileSync(resolve(source,p))));
const added=execFileSync('git',['ls-files','--others','--exclude-standard','--cached',root],{encoding:'utf8'}).trim().split('\n').map(p=>relative(root,resolve(p))).filter(p=>/^(lib|scripts|public|app|build)\//.test(p)&&!files.includes(p));
console.log('Confirmed published source:',commit);console.log('Review changes for visible Resources or Components layout:',[...new Set([...changed,...added])]);
for(const [file,revision] of [['workshop-placeholder.generated.json',placeholderLayoutRevision],['workshop-playground-placeholder.generated.json',playgroundPlaceholderLayoutRevision]]){
 const saved=JSON.parse(readFileSync(new URL('../lib/'+file,import.meta.url)));
 if(saved.layoutRevision!==revision)throw Error(`${file} is stale for publication. Measure this affected backdrop after final layout edits.`);
 console.log(file+': saved revision '+revision);
}
console.log('Revision checks passed. Review the listed diff before publication; non-layout edits alone never require measurement.');
