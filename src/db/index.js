const mysql = require('mysql')

const db = mysql.createPool({
    user: 'root',
    password: 'root',
    host: '10.0.8.225',
    port: 3306,
    database: 'node'
})

module.exports = db