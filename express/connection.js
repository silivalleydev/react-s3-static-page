const mysql = require('mysql');
const connectInfo = require('./env');

const connection = mysql.createConnection({
    host: connectInfo.host,
    user: connectInfo.user,
    port: connectInfo.port,
    password: connectInfo.password,
    database: connectInfo.database
})

module.exports = connection;