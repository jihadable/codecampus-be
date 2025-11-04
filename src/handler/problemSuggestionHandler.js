const { problemSuggestionMapper } = require("../helper/mapper")

class ProblemSuggestionHandler {
    constructor(service){
        this._service = service

        this.getProblemSuggestionsByUser = this.getProblemSuggestionsByUser.bind(this)
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