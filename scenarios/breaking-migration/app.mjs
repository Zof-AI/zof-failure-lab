// Intentionally defective synthetic teaching fixture; never deploy as a service.
export const expected = {"name": "Ada"};
export async function simulate(variant){if(!['broken','fixed'].includes(variant))throw new Error('Unknown variant');
const {DatabaseSync}=await import('node:sqlite');const db=new DatabaseSync(':memory:');try{db.exec("CREATE TABLE users(id INTEGER PRIMARY KEY,name TEXT); INSERT INTO users VALUES(1,'Ada')");if(variant==='broken')db.exec('ALTER TABLE users RENAME COLUMN name TO display_name');else{db.exec('ALTER TABLE users ADD COLUMN display_name TEXT');db.exec('UPDATE users SET display_name=name');}try{return {name:db.prepare('SELECT name FROM users WHERE id=1').get().name};}catch{return {name:'QUERY_FAILED'};}}finally{db.close();}
}
