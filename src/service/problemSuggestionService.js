class ProblemSuggestionService {
    constructor(db){
        this._db = db
    }

    async addProblemSuggestion({ title, description, difficulty, user_id }){
        const problemSuggestion = await this._db.problemSuggestion.create({
            data: {
                title, description, difficulty,
                status: false,
                suggested_by: user_id
            },
            include: { suggester: true }
        })

        return problemSuggestion
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