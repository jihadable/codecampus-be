class SubmissionService {
    constructor(db){
        this._db = db
    }

    async addSubmission({ user_id, problem_id, programming_language_id, code, status }){
        const submission = await this._db.submission.upsert({
            where: {
                user_id, problem_id, programming_language_id, status
            },
            update: { code },
            create: {
                user_id, problem_id, programming_language_id, code, status
            }
        })

        return submission
    }

    async getSubmissionsByUser(user_id){
        const submissions = await this._db.submission.findMany({
            where: { user_id }
        })

        return submissions
    }
}

module.exports = SubmissionService