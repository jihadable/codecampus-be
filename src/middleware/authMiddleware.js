const { verify } = require("jsonwebtoken")
const UnauthorizeError = require("../error/UnauthorizeError")

const authMiddleware = (req, res, next) => {
    try {
        const authorization = req.header("Authorization")

        if (!authorization){
            throw new UnauthorizeError("Token tidak ditemukan")
        }
        
        const token = authorization.split(" ")[1]

        if (!token){
            throw new UnauthorizeError("Token tidak ditemukan")
        }
        
        const payload = verify(token, process.env.JWT_SECRET)

        res.locals.user_id = payload.id

        next()
    } catch(error){
        next(error)
    }
}

module.exports = authMiddleware