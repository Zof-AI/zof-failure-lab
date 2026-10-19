// Intentionally defective synthetic teaching fixture; never deploy as a service.
export const expected = {"orders": 1};
export async function simulate(variant){if(!['broken','fixed'].includes(variant))throw new Error('Unknown variant');
let orders=0;const completed=new Map();async function request(id,loseResponse){if(variant==='fixed'&&completed.has(id))return completed.get(id);const result=++orders;completed.set(id,result);if(loseResponse)throw new Error('injected timeout');return result;}try{await request('order-intent',true);}catch{await request('order-intent',false);}return {orders};
}
