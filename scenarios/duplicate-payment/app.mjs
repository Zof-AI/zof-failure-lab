// Intentionally defective synthetic teaching fixture; never deploy as a service.
export const expected = {"charges": 1};
export async function simulate(variant){if(!['broken','fixed'].includes(variant))throw new Error('Unknown variant');
let charges=0;const seen=new Map();const pay=key=>{if(variant==='fixed'&&seen.has(key))return seen.get(key);charges++;seen.set(key,charges);return charges};pay('intent-1'); // response is deliberately lost
pay('intent-1');return {charges};
}
