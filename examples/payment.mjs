import {runScenario} from '../dist/index.js';
console.log(JSON.stringify(await runScenario('duplicate-payment','broken'),null,2));
console.log(JSON.stringify(await runScenario('duplicate-payment','fixed'),null,2));
