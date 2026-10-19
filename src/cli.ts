#!/usr/bin/env node
import { listScenarios, runScenario, runAll } from './index.js';
try{
 const [command,id='all',...extra]=process.argv.slice(2);if(extra.length)throw new Error('usage');
 if(command==='--help')console.log('Usage: zof-failure-lab start | list | reproduce [id|all] | verify [id|all] | cleanup\nNo services, credentials, persistent files or network access.');
 else if(command==='--version')console.log('0.1.0');
 else if(command==='start'||command==='cleanup')console.log(JSON.stringify({state:command==='start'?'ready':'clean',persistentResources:0,services:0}));
 else if(command==='list')console.log(JSON.stringify(listScenarios(),null,2));
 else if(command==='reproduce'||command==='verify'){
  const variant=command==='reproduce'?'broken':'fixed';const results=id==='all'?await runAll(variant):[await runScenario(id,variant)];console.log(JSON.stringify({results},null,2));
  if(results.some(r=>variant==='broken'?!r.defectReproduced:!r.regressionPassed))process.exitCode=1;
 }else throw new Error('usage');
}catch{console.error(JSON.stringify({error:'Unsupported scenario or command.'}));process.exitCode=2;}
