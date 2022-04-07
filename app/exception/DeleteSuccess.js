const HttpException = require('./http/HttpException')

class DeleteSuccess extends HttpException {
  constructor(code) {
    super(code)
    this.httpStatusCode = 200
  }
}

module.exports = DeleteSuccess
