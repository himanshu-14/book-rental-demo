const pg = require('pg');
const Pool=pg.Pool;
const config={
    host:process.env.host||'localhost',
    port:process.env.port||5432,
    database:process.env.database||'bookrental',
    user:process.env.user,
    password:process.env.password
};
console.log(JSON.stringify(config))
const pool=new Pool(config);

module.exports=pool;