const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
  static USER = 8
  static ADMIN = 16
  static SUPER_ADMIN = 32

  constructor(level) {
    this.level = level || Auth.USER // 默认访问权限，需要至少是用户级别
  }

  get m() {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req)
      let decode

      if (!userToken || !userToken.name) {
        throw new global.errs.http.ForbiddenException(10004)
      }

      try {
        decode = jwt.verify(userToken.name, global.config.security.secretKey)
      } catch (error) {
        if (error.name == 'TokenExpiredError') {
          throw new global.errs.http.ForbiddenException(10008)
        }
        throw new global.errs.http.ForbiddenException(10004)
      }

      if (decode.scope < this.level) {
        throw new global.errs.http.ForbiddenException(10009)
      }

      // uid,scope
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }

      await next()
    }
  }

  static verifyToken(token) {
    try {
      jwt.verify(token, global.config.security.secretKey)
      return true
    } catch (error) {
      return false
    }
  }
}

module.exports = {
  Auth
}
