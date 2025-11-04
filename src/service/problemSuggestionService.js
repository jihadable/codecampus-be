class ProblemSuggestionService {
    constructor(db){
        this._db = db
    }

    async getProblemSuggestionsByUser(user_id){
        const problemSuggestions = await this._db.problemSuggestion.findMany({
            where: { user_id },
            include: { suggester: true }
        })

        return problemSuggestions
    }
}

module.exports = ProblemSuggestionService