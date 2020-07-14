const Pool = require('pg').Pool;
const dotenv = require('dotenv');
require('dotenv').config();

const devConfig = {
    user :  process.env.DB_USER,
    database : process.env.DATABASE,
    password : process.env.DB_PASS,
    hostname : process.env.DB_HOST,
    port :process.env.DB_PORT,
};

const prodConfig = {
    connectionString: process.env.DATABASE_URL // heroku
};

const pool = new Pool(process.env.NODE_ENV === "production" ? prodConfig : devConfig);

console.log("Connected to Database");
module.exports = pool;