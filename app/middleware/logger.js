const fs = require('fs')
const path = require('path')
const log4js = require('log4js')
const config = require('../config/config')

const logsDir = path.parse(config.logPath).dir
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir)
}

const env = config.env

log4js.configure({
  appenders: {
    console: { type: 'console' },
    dateFile: {
      type: 'dateFile',
      filename: config.logPath,
      pattern: '-yyyy-MM-dd'
    }
  },
  categories: {
    default: {
      appenders: env === 'dev' ? ['console'] : ['dateFile'],
      level: 'info'
    }
  }
})

const logger = log4js.getLogger('[Default]')

const loggerMiddleware = async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start

  const remoteAddress =
    ctx.headers['x-forwarded-for'] ||
    ctx.ip ||
    ctx.ips ||
    (ctx.socket &&
      (ctx.socket.remoteAddress ||
        (ctx.socket.socket && ctx.socket.socket.remoteAddress)))
  let logText = `${ctx.method} ${ctx.status} ${
    ctx.url
  } 请求参数： ${JSON.stringify(ctx.request.body)} 响应参数： ${JSON.stringify(
    ctx.body
  )} - ${remoteAddress} - ${ms}ms`
  logger.info(logText)
  if (ctx.error) {
    logger.error(ctx.error)
  }
}

module.exports = {
  logger,
  loggerMiddleware
}
