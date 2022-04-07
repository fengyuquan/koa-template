const codes = require('../config/exception-code')
const HttpException = require('../exception/http/HttpException')
const ParameterException = require('../exception/http/ParameterException')

const catchError = async (ctx, next) => {
  try {
    await next()
    if (ctx.status === 404) {
      // 请求路由不存在
      _unifyResponse(ctx, 10007, codes[10007], 404)
    }
  } catch (error) {
    if (error instanceof HttpException) {
      // 已知错误，是主动抛出的
      // 针对参数校验错误，它的message应该是由校验类传递过来的，不再通过查询codes配置文件获得
      let message = codes[error.code]
      if (error instanceof ParameterException && error.message) {
        message = error.message
      }
      _unifyResponse(ctx, error.code, message, error.httpStatusCode)
    } else {
      // 未知错误，非主动抛出，一般是服务器错误
      ctx.error = error
      _unifyResponse(ctx, 999, codes[999], 500)
    }
  }
}

function _unifyResponse(ctx, code, message, httpStatusCode) {
  ctx.body = {
    code,
    message,
    request: `${ctx.method} ${ctx.path}`
  }
  ctx.status = httpStatusCode
}

module.exports = catchError
