// Match the cap-height alignment used by Playground headings. Values are
// relative to the first line box, so font leading does not count as text ink.
export function headingMetrics(element,text='H'){
 const css=getComputedStyle(element),size=parseFloat(css.fontSize),height=parseFloat(css.lineHeight)||size*1.2;
 const context=document.createElement('canvas').getContext('2d');
 context.font=css.fontWeight+' '+css.fontSize+' '+css.fontFamily;
 const metrics=context.measureText(text);
 const ascent=metrics.fontBoundingBoxAscent??size*.8,descent=metrics.fontBoundingBoxDescent??size*.2;
 const baseline=(height-ascent-descent)/2+ascent;
 return {bottom:baseline+metrics.actualBoundingBoxDescent,top:baseline-metrics.actualBoundingBoxAscent,centre:baseline-(metrics.actualBoundingBoxAscent-metrics.actualBoundingBoxDescent)/2};
}
