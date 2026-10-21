// Explicit Resources refresh; ordinary builds reuse saved geometry.
import {capture} from './capture-backdrops.mjs';
await capture('resources');
