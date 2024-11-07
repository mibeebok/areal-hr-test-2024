const Pool = require('pg').Pool
const pool = new Pool({
    user:"mibeeb",
    password:'Qw110307',
    host: "localhost",
    port: 5432,
    database:"arealtest2024db"
})


module.export = pool