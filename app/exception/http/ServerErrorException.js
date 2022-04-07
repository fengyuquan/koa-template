const HttpException = require('./HttpException')

class ServerErrorException extends HttpException {
  constructor(code) {
    super(code)
    this.httpStatusCode = 500
  }
}

module.exports = ServerErrorException
