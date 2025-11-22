const { hash, compareSync } = require("bcrypt")
const NotFoundError = require("../error/NotFoundError")
const BadRequestError = require("../error/BadRequestError")

class UserService {
    constructor(db){
        this._db = db
    }

    async addUser({ username, fullname, email, password }){
        const hashedPassword = await hash(password, 10)
        const user = await this._db.user.create({
            data: { username, fullname, email, password: hashedPassword },
            include: {
                submissions: true,
                problemSuggestions: true
            }
        })

        return user
    }

    async getUsers(){
        const users = await this._db.user.findMany({
            include: {
                submissions: {
                    include: {
                        problem: true
                    } 
                },
                problemSuggestions: true
            }
        })

        return users
    }

    async getUserById(id){
        const user = await this._db.user.findUnique({
            where: { id },
            include: {
                submissions: {
                    include: {
                        problem: true
                    } 
                },
                problemSuggestions: true
            }
        })

        if (!user){
            throw new NotFoundError("User tidak ditemukan")
        }

        return user
    }

    async updateUserById(id, { username, fullname, bio, github, linkedin }){
        await this.getUserById(id)
        const user = await this._db.user.update({
            where: { id },
            data: { username, fullname, bio, github, linkedin },
            include: {
                submissions: true,
                problemSuggestions: true
            }
        })

        return user
    }

    async verifyUser(email, password){
        const user = await this._db.user.findUnique({
            where: { email },
            include: {
                submissions: true,
                problemSuggestions: true
            }
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