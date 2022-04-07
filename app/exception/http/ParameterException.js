const HttpException = require('./HttpException')

class ParameterException extends HttpException {
  constructor(code, message) {
    super(code)
    this.httpStatusCode = 400
    this.message = message
  }
}

module.exports = ParameterException
