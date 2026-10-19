export const playgroundSections=['components','typography','colours','blocks','icons','errors','focus','branding','discovery'];
export const isPlaygroundPath=path=>path==='/playground'||playgroundSections.some(section=>path==='/playground/'+section||path==='/playground/'+section+'/');
