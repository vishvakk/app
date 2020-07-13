const Pool = require('pg').Pool;
const dotenv = require('dotenv');
require('dotenv').config()

const port = process.env.PORT;

const pool = new Pool({
    user :  "vishvak",
    database : "denorestapi",
    password : "anaconda123",
    hostname : process.env.DB_HOST,
    port : port
})

console.log("Connected to Database")
module.exports = pool;