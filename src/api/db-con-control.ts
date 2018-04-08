export type DB_TYPE = 'SQL' | 'NOSQL';
export  async function connect(db_type: DB_TYPE = 'NOSQL') {
  let con: any;
  switch (db_type) {
    case 'NOSQL':
      con =  await import('./db/connect-mongo');
      break;
    default:
       con =  await import('./db/connect-mysql');
      break;
  }
  return con;
}