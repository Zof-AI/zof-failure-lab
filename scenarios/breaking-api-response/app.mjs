// Intentionally defective synthetic teaching fixture; never deploy as a service.
export const expected = {"greeting": "Hello Ada"};
export async function simulate(variant){if(!['broken','fixed'].includes(variant))throw new Error('Unknown variant');
const response=variant==='broken'?{displayName:'Ada'}:{name:'Ada',displayName:'Ada'};const client=response.name;return {greeting:typeof client==='string'?'Hello '+client:'INVALID_RESPONSE'};
}
