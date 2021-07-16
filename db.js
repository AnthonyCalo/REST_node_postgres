const Pool = require('pg').Pool;

const pool =new Pool({
    user: "postgres",
    password: "assword",
    database: "usersdb",
    host: "localhost",
    port: 5432
});

module.exports=pool;