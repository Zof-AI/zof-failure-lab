// Intentionally defective synthetic teaching fixture; never deploy as a service.
export const expected = {"deliveries": 1};
export async function simulate(variant){if(!['broken','fixed'].includes(variant))throw new Error('Unknown variant');
let deliveries=0;const claims=new Set();const job=async id=>{if(variant==='fixed'){if(claims.has(id))return;claims.add(id);}await Promise.resolve();deliveries++;};await Promise.all([job('daily-summary'),job('daily-summary')]);return {deliveries};
}
