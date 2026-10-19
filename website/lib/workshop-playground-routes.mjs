export const playgroundSections=['components','typography','colours','blocks','icons','statuses','focus','branding','easter-egg'];
export const playgroundTabPaths={errors:'statuses',discovery:'easter-egg'};
const aliases={errors:'statuses',discovery:'easter-egg',colors:'colours'};
export const playgroundRedirect=path=>{const match=path.match(/^\/playground\/([^/]+)\/?$/);return match&&aliases[match[1]]?'/playground/'+aliases[match[1]]:null;};
export const isPlaygroundPath=path=>path==='/playground'||playgroundSections.some(section=>path==='/playground/'+section||path==='/playground/'+section+'/');
