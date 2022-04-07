const HttpException = require('./HttpException')

class NotFoundException extends HttpException {
  constructor(code) {
    super(code)
    this.httpStatusCode = 404
  }
}

module.exports = NotFoundException
