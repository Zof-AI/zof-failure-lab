import {runScenario} from '../dist/index.js';
console.log(JSON.stringify(await runScenario('breaking-migration','broken'),null,2));
console.log(JSON.stringify(await runScenario('breaking-migration','fixed'),null,2));
