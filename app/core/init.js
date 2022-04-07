const Router = require('koa-router')
const requireDirectory = require('require-directory')
const path = require('path')

class Init {
  static initCore(app) {
    Init.app = app
    Init.initLoadConfig()
    Init.initLoadRouters()
    Init.initLoadHttpException()
  }

  static initLoadRouters() {
    const apiDirectory = path.normalize(`${process.cwd()}/app/api`)
    requireDirectory(module, apiDirectory, {
      visit: (obj) => {
        if (global.config.env === 'dev') {
          console.log(`注册了路由 ${obj.opts.prefix}`)
        }
        if (obj instanceof Router) {
          Init.app.use(obj.routes(), obj.allowedMethods())
        }
      }
    })
  }

  static initLoadHttpException() {
    const exceptionDirectory = path.normalize(`${process.cwd()}/app/exception`)
    global.errs = requireDirectory(module, exceptionDirectory)
  }

  static initLoadConfig() {
    const configPath = path.normalize(`${process.cwd()}/app/config/config.js`)
    global.config = require(configPath)
  }
}

module.exports = Init
