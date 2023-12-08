const jwt = require('jsonwebtoken')

const config = process.env

const verify = (req, res, next) => {
    const token = req.headers['x-access-token']
    if (!token) {
        return res.status(403).send()
    }
    else {
        try {
            const decoded = jwt.verify(token, config.TOKEN_KEY)
            req.user = decoded.username
        }
        catch (err) {
            res.status(401).send()
            return
        }
    }
    return next()
}

module.exports = verify