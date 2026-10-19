// Present colour literals consistently without changing their text or copied value.
export const colourValueCSS=`
.hex-value{font-family:ui-monospace,SFMono-Regular,Consolas,monospace;white-space:nowrap}
.hex-chip{display:inline-block;width:1cap;height:1cap;border-radius:2px;margin-left:.4em;background:var(--hex-colour);vertical-align:baseline;box-shadow:inset 0 0 0 1px #80808040}
`;
export const colourValueScript=String.raw`
window.formatWorkshopColourValues=function(root=document.body){
 const skip='script,style,textarea,input,pre,code,[contenteditable],.hex-value,svg';
 const texts=[];
 if(root.nodeType===Node.TEXT_NODE)texts.push(root);else{const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let node;while(node=walker.nextNode())texts.push(node);}
 for(const node of texts){if(!node.parentElement||node.parentElement.closest(skip))continue;
  const matches=[...node.textContent.matchAll(/#(?:[\da-f]{8}|[\da-f]{6}|[\da-f]{4}|[\da-f]{3})(?![\da-f])/gi)];if(!matches.length)continue;
  const fragment=document.createDocumentFragment();let from=0;const chips=Boolean(node.parentElement.closest('[data-colour-chips]'));
  for(const match of matches){fragment.append(node.textContent.slice(from,match.index));const value=document.createElement('span');value.className='hex-value';value.textContent=match[0];
   if(chips){const chip=document.createElement('span');chip.className='hex-chip';chip.setAttribute('aria-hidden','true');chip.style.setProperty('--hex-colour',match[0]);value.append(chip);}fragment.append(value);from=match.index+match[0].length;
  }fragment.append(node.textContent.slice(from));node.replaceWith(fragment);
 }
};
document.addEventListener('DOMContentLoaded',()=>{
 window.formatWorkshopColourValues();
 new MutationObserver(records=>{for(const record of records){if(record.type==='characterData')window.formatWorkshopColourValues(record.target);else for(const node of record.addedNodes)if(node.nodeType===1||node.nodeType===3)window.formatWorkshopColourValues(node);}}).observe(document.body,{subtree:true,childList:true,characterData:true});
});
`;
