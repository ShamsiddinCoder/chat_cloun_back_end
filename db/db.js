const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'chat_cloun',
    port: 5432,
    password: 'shamsiddin3203157'
});

module.exports.fetch = async (SQL, ...params) => {
    let client = await pool.connect();
    // console.log(params);
    try {
        let {rows} = await client.query(SQL, params ? params : null);
        return rows
    } catch (error) {
        return error
    }finally{
        client.release();
    }
}

module.exports.fetchOne = async (SQL, ...params) => {
    let client = await pool.connect();
    try {
        let {rows: [row]} = await client.query(SQL, params ? params : null);
        return row
    } catch (error) {
        return error
    }finally {
        client.release();
    }
}