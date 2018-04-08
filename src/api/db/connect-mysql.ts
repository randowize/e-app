const mysql = require('promise-mysql');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'otopark',
    supportBigNumbers: true,
    debug: false,
});

export default connection;
function generateQueryString(table: string): string {

    const qs = `
        INSERT INTO ${table}
        (??)
        Values(?)
    `;
    return qs;
}

const insertBuilder = (table: string) => async(fields: string[], values: any[]) => {
    const preparedQuery =  generateQueryString(table);
    const con = await connection;
    const qs = con.format(preparedQuery, [fields, values]);
    const res = await con.query(qs);
    return res;
};

export const connect = async() => {
    const con = await connection;
    const res = await con.query('SELECT * FROM otopark.db_abonelikler limit  4');
    return res;
};

export const daoFactory = (table: string) => ({
    insert : insertBuilder(table),
    delete : () => undefined,
    select : () => undefined,
    update : () => undefined,
});

export const vms = daoFactory('otopark_vms');
