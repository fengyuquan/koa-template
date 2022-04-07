const jwt = require('jsonwebtoken')
const { secretKey, expiresIn } = require('../config/config').security

function generateToken(uid, scope) {
  return jwt.sign(
    {
      uid,
      scope
    },
    secretKey,
    {
      expiresIn
    }
  )
}

module.exports = {
  generateToken
}
