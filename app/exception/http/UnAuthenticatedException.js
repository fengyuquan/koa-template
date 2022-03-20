const HttpException = require('./HttpException')

class UnAuthenticatedException extends HttpException {
    constructor(code) {
        super(code)
        this.httpStatusCode = 401
    }
}

module.exports = UnAuthenticatedException