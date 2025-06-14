const User = require('../models/users')
const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'secret keyword', (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.redirect('/login')
            } else {
                console.log(decodedToken);
                next()
            }
        })
    } else {
        res.redirect('/login')
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'secret keyword', async (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.locals.user = null
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}

module.exports = { requireAuth, checkUser }