const path = require('path')

module.exports = {
    env: 'dev',
    port: '3000',
    logPath: path.resolve(__dirname, '../../logs/koa-template.log'),
    database: {
        dbName: 'koa-template',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: ''
    },
}