// Intentionally defective synthetic teaching fixture; never deploy as a service.
export const expected = {"completed": 3, "refreshes": 1};
export async function simulate(variant){if(!['broken','fixed'].includes(variant))throw new Error('Unknown variant');
let expiry=2,completed=0,refreshes=0;for(let time=1;time<=3;time++){if(time>=expiry){if(variant==='broken')break;expiry=time+10;refreshes++;}completed++;}return {completed,refreshes};
}
