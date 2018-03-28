const mysql = require('mysql')
const wapper = require('co-mysql')
const config = {
    database: {
        port: 3306,
        database: 'graduationdesign',
        user: "root",
        password: '1547923100',
        host: '120.24.226.55'
    }
}

var pool = mysql.createPool(config.database);
const p = wapper(pool);

module.exports = p