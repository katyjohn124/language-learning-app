require('dotenv').config()

const mysql = require('mysql');


const pool = mysql.createPool({
    connectionLimit: 10,
    //以下都是填自己的主机、用户、数据库密码、数据库名称
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

module.exports = pool;
