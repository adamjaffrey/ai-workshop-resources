// Shared motion; shorter icon-only feedback needs less reading time.
export const copyTiming = {success:6000, failure:12000, fade:600};
export const anchorCopyTiming = {...copyTiming, success:3000, failure:3000};
export function copyFrames(success, exit=false){
 return exit ? [{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-2px)'}]
  : [{opacity:0,transform:success?'translateY(2px)':'translateY(0)'},{opacity:1,transform:'translateY(0)'}];
}
