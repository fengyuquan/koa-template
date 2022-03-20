const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const koaStatic = require('koa-static')
const helmet = require('koa-helmet')
const path = require('path')

const Init = require('./app/core/init.js')
const catchError = require('./app/middleware/exception')
const {loggerMiddleware} = require('./app/middleware/logger')

const app = new koa()

// Logger
app.use(loggerMiddleware)

// Error Handler
app.use(catchError)

// Global Middlewares
app.use(helmet())
app.use(bodyParser())
app.use(koaStatic(path.join(__dirname, './static')))

// 包含路由的初始化，和在ctx上挂载一些内容
Init.initCore(app)

app.listen(3000)