// Intentionally defective synthetic teaching fixture; never deploy as a service.
export const expected = {"total": 150};
export async function simulate(variant){if(!['broken','fixed'].includes(variant))throw new Error('Unknown variant');
const {DatabaseSync}=await import('node:sqlite');const db=new DatabaseSync(':memory:');try{db.exec('CREATE TABLE accounts(id INTEGER PRIMARY KEY,balance INTEGER); INSERT INTO accounts VALUES(1,100),(2,50)');try{if(variant==='fixed')db.exec('BEGIN');db.exec('UPDATE accounts SET balance=balance-25 WHERE id=1');throw new Error('injected failure before credit');}catch{if(variant==='fixed')db.exec('ROLLBACK');}const row=db.prepare('SELECT SUM(balance) AS total FROM accounts').get();return {total:row.total};}finally{db.close();}
}
