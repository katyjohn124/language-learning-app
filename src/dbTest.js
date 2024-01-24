require('dotenv').config();

const pool = require('./database'); // 确保这里的路径正确指向您的数据库连接池文件

pool.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});
