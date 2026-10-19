// Intentionally defective synthetic teaching fixture; never deploy as a service.
export const expected = {"credits": 10};
export async function simulate(variant){if(!['broken','fixed'].includes(variant))throw new Error('Unknown variant');
let credits=0;const seen=new Set();for(const event of [{id:'event-1',amount:10},{id:'event-1',amount:10}]){if(variant==='fixed'&&seen.has(event.id))continue;credits+=event.amount;seen.add(event.id);}return {credits};
}
