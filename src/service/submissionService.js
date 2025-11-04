class SubmissionService {
    constructor(db){
        this._db = db
    }

    async addSubmission({ user_id, problem_id, programming_language_id, code, status }){
        const submission = await this._db.submission.create({
            data: { user_id, problem_id, programming_language_id, code, status }
        })

        return submission
    }
}

module.exports = SubmissionService