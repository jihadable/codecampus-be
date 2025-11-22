const { problemSuggestionMapper } = require("../helper/mapper")

class ProblemSuggestionHandler {
    constructor(service){
        this._service = service

        this.postProblemSuggestion = this.postProblemSuggestion.bind(this)
        this.getProblemSuggestionsByUser = this.getProblemSuggestionsByUser.bind(this)
    }

    async postProblemSuggestion(req, res, next){
        try {
            const { user_id } = res.locals
            const { title, description, difficulty } = req.body
            const problemSuggestion = await this._service.addProblemSuggestion({ title, description, difficulty, user_id })

            res.status(201).json({
                status: "success",
                data: { problem_suggestion: problemSuggestionMapper(problemSuggestion) }
            })
        } catch(error){
            next(error)
        }
    }

    async getProblemSuggestionsByUser(req, res, next){
        try {
            const { user_id } = res.locals
            const problemSuggestions = await this._service.getProblemSuggestionsByUser(user_id)

            res.status(200).json({
                status: "success",
                data: { problem_suggestions: problemSuggestions.map(problemSuggestion => problemSuggestionMapper(problemSuggestion)) }
            })
        } catch(error){
            next(error)
        }
    }
}

module.exports = ProblemSuggestionHandler