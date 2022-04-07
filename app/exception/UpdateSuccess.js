const HttpException = require('./http/HttpException')

class UpdateSuccess extends HttpException {
  constructor(code) {
    super(code)
    this.httpStatusCode = 200
  }
}

module.exports = UpdateSuccess
