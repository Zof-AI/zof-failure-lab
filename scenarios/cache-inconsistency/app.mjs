// Intentionally defective synthetic teaching fixture; never deploy as a service.
export const expected = {"visible": 2};
export async function simulate(variant){if(!['broken','fixed'].includes(variant))throw new Error('Unknown variant');
const database=new Map([['item',1]]);const cache=new Map();const read=()=>{if(!cache.has('item'))cache.set('item',database.get('item'));return cache.get('item')};read();database.set('item',2);if(variant==='fixed')cache.delete('item');return {visible:read()};
}
