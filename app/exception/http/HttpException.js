class HttpException extends Error {
  constructor(code) {
    super()
    this.code = code
    this.httpStatusCode = 500
  }
}

module.exports = HttpException
