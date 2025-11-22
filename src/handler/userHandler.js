const generateJWT = require("../helper/generateJWT")
const getPoints = require("../helper/getPoints")
const { userMapper } = require("../helper/mapper")

class UserHandler {
    constructor(service, problemService){
        this._service = service
        this._problemService = problemService

        this.postUser = this.postUser.bind(this)
        this.getUserById = this.getUserById.bind(this)
        this.updateUserById = this.updateUserById.bind(this)
        this.verifyUser = this.verifyUser.bind(this)
    }

    async postUser(req, res, next){
        try {
            const { username, fullname, email, password } = req.body
            const user = await this._service.addUser({ username, fullname, email, password })
            const problems = await this._problemService.getProblems()
            const points = getPoints(user.submissions, problems, user.problemSuggestions)
            const jwt = generateJWT(user.id)

            res.status(201).json({
                status: "success",
                data: {
                    user: {...userMapper(user), ...points},
                    jwt
                }
            })
        } catch(error){
            next(error)
        }
    }

    async getUserById(req, res, next){
        try {
            const { user_id } = res.locals
            const user = await this._service.getUserById(user_id)
            const problems = await this._problemService.getProblems()
            const points = getPoints(user.submissions, problems, user.problemSuggestions)

            res.status(200).json({
                status: "success",
                data: { user: {...userMapper(user), ...points} }
            })
        } catch(error){
            next(error)
        }
    }

    async updateUserById(req, res, next){
        try {
            const { user_id } = res.locals
            const { username, fullname, bio, github, linkedin } = req.body
            const user = await this._service.updateUserById(user_id, { username, fullname, bio, github, linkedin })
            const problems = await this._problemService.getProblems()
            const points = getPoints(user.submissions, problems, user.problemSuggestions)

            res.status(200).json({
                status: "success",
                data: { user: {...userMapper(user), ...points} }
            })
        } catch(error){
            next(error)
        }
    }

    async verifyUser(req, res, next){
        try {
            const { email, password } = req.body
            const user = await this._service.verifyUser(email, password)
            const problems = await this._problemService.getProblems()
            const points = getPoints(user.submissions, problems, user.problemSuggestions)
            const jwt = generateJWT(user.id)

            res.status(200).json({
                status: "success",
                data: {
                    user: {...userMapper(user), ...points},
                    jwt
                }
            })
        } catch(error){
            next(error)
        }
    }
}

module.exports = UserHandler