// Intentionally defective synthetic teaching fixture; never deploy as a service.
export const expected = {"stock": 1, "sold": 4};
export async function simulate(variant){if(!['broken','fixed'].includes(variant))throw new Error('Unknown variant');
let stock=5,sold=0;async function buy(){if(variant==='fixed'){if(stock>=4){stock-=4;sold+=4;}return;}const available=stock;await Promise.resolve();if(available>=4){stock=available-4;sold+=4;}}await Promise.all([buy(),buy()]);return {stock,sold};
}
