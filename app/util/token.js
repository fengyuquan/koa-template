const jwt = require('jsonwebtoken')
const {secretKey, expiresIn} = require('../config/config').security

function generateToken(uid) {
    return jwt.sign({
            uid,
        },
        secretKey,
        {
            expiresIn,
        })
}

module.exports = {
    generateToken,
}