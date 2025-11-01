const { hash } = require("bcrypt")
const NotFoundError = require("../error/NotFoundError")
const BadRequestError = require("../error/BadRequestError")

class UserService {
    constructor(db){
        this._db = db
    }

    async addUser({ username, fullname, email, password }){
        const hashedPassword = await hash(password, 10)
        const user = await this._db.user.create({
            data: { username, fullname, email, password: hashedPassword }
        })

        return user
    }

    async getUserById(id){
        const user = await this._db.user.findUnique({
            where: { id }
        })

        if (!user){
            throw new NotFoundError("User tidak ditemukan")
        }

        return user
    }

    async updateUserById(id, { username, fullname }){
        await this.getUserById(id)
        const user = await this._db.user.update({
            where: { id },
            data: { username, fullname }
        })

        return user
    }

    async verifyUser(email, password){
        const user = await this.db.user.findUnique({
            where: { email }
        })

        if (!user){
            throw new BadRequestError("Email atau password salah")
        }

        if (!compareSync(password, user.password)){
            throw new BadRequestError("Email atau password salah")
        }

        return user
    }
}

module.exports = UserService