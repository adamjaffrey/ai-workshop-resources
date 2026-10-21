// Shared motion; shorter icon-only feedback needs less reading time.
export const copyTiming = {success:6000, failure:12000, fade:600, failureEntry:300};
export const anchorCopyTiming = {...copyTiming, success:3000, failure:6000};
export const qrCopyTiming = {...anchorCopyTiming};
export function copyFrames(success, exit=false){
 return exit ? [{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-2px)'}]
  : [{opacity:0,transform:success?'translateY(2px)':'translateY(0)'},{opacity:1,transform:'translateY(0)'}];
}
