const HttpException = require('./HttpException')

class ForbiddenException extends HttpException {
  constructor(code) {
    super(code)
    this.httpStatusCode = 403
  }
}

module.exports = ForbiddenException
