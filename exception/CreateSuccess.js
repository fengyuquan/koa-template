const HttpException = require('./http/HttpException')

class CreateSuccess extends HttpException {
    constructor(code) {
        super(code)
        this.httpStatusCode = 201
    }
}

module.exports = CreateSuccess