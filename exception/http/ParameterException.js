const HttpException = require('./HttpException')

class ParameterException extends HttpException {
    constructor(code) {
        super(code)
        this.httpStatusCode = 400
    }
}

module.exports = ParameterException