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
  security: {
    secretKey:
      '\x88W\xf09\x91\x07\x98\x89\x87\x96\xa0A\xc68\xf9\xecJJU\x17\xc5V\xbe\x8b\xef\xd7\xd8\xd3\xe6\x95*4',
    expiresIn: 60 * 60 * 24 * 30
    // expiresIn: 60
  }
}
