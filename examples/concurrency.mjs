import {runScenario} from '../dist/index.js';
console.log(JSON.stringify(await runScenario('inventory-race','broken'),null,2));
console.log(JSON.stringify(await runScenario('inventory-race','fixed'),null,2));
