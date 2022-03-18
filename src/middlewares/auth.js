const jwt = require('jsonwebtoken')
const { decode } = require('jsonwebtoken')
const env = require('../configs/env')

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const isCustomAuth = token.length < 500

        let decodeData
        if (token && isCustomAuth) {
            decodeData = jwt.verify(token, env.passport.jwtToken)
            req.userId = decodeData?.sub
        } else {
            decodeData = jwt.decode(token)
            req.userId = decodeData?.sub
        }
        next()
    } catch (error) {
        return res.status(401).json('Token expired')
    }
}

module.exports = auth
