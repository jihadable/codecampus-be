const { problemMapper } = require("../helper/mapper")

class ProblemHandler {
    constructor(service){
        this._service = service

        this.getProblems = this.getProblems.bind(this)
        this.getProblemById = this.getProblemById.bind(this)
    }

    async getProblems(req, res, next){
        try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 20

            const problems = await this._service.getProblems(page, limit)

            res.status(200).json({
                status: "success",
                data: problems
            })
        } catch(error){
            next(error)
        }
    }

    async getProblemById(req, res, next){
        try {
            const { problem_id } = req.params
            const problem = await this._service.getProblemById(problem_id)

            res.status(200).json({
                status: "success",
                data: { problem: problemMapper(problem) }
            })
        } catch(error){
            next(error)
        }
    }
}

module.exports = ProblemHandler