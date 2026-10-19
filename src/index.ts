import { readFile } from 'node:fs/promises';
import { isDeepStrictEqual } from 'node:util';
export type Variant='broken'|'fixed';
export interface Scenario {id:string;category:string;problem:string;mitigation:string;expected:Record<string,unknown>}
export interface ScenarioResult {id:string;variant:Variant;expected:Record<string,unknown>;observed:Record<string,unknown>;regressionPassed:boolean;defectReproduced:boolean;durationMs:number}
const manifest=JSON.parse(await readFile(new URL('../scenarios/manifest.json',import.meta.url),'utf8')) as {version:string;scenarios:Scenario[]};
/** Return data copies so callers cannot change the allowed scenario set. */
export function listScenarios():Scenario[]{return structuredClone(manifest.scenarios);}
/** Runs only the ten bundled deterministic fixtures, never caller-supplied source. */
export async function runScenario(id:string,variant:Variant):Promise<ScenarioResult>{
 if(typeof id!=='string'||!manifest.scenarios.some(s=>s.id===id)||!['broken','fixed'].includes(variant))throw new Error('Unsupported scenario or variant.');
 const scenario=manifest.scenarios.find(s=>s.id===id)!;
 const module=await import(new URL(`../scenarios/${id}/app.mjs`,import.meta.url).href) as {simulate:(variant:Variant)=>Promise<Record<string,unknown>>};
 const begin=performance.now();const observed=await module.simulate(variant);const regressionPassed=isDeepStrictEqual(observed,scenario.expected);
 return {id,variant,expected:structuredClone(scenario.expected),observed,regressionPassed,defectReproduced:variant==='broken'&&!regressionPassed,durationMs:Math.round((performance.now()-begin)*1000)/1000};
}
export async function runAll(variant:Variant):Promise<ScenarioResult[]>{const results:ScenarioResult[]=[];for(const s of manifest.scenarios)results.push(await runScenario(s.id,variant));return results;}
