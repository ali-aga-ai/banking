const {createPool} = require('mysql'); //use createPool for db intensive program

const pool = createPool({
    host:'localhost',
    user:'root',
    password:'$entropics110',
    database:'banking',
    connectionLimit: 10
})

pool.query('select * from customer',(err,result,fields)=>{
    if(err){
        return console.error(err);
    }
    console.log(result);
})