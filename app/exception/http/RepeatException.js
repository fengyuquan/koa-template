const HttpException = require('./HttpException')

class RepeatException extends HttpException {
  constructor(code) {
    super(code)
    this.httpStatusCode = 400
  }
}

module.exports = RepeatException
