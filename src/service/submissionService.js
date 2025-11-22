class SubmissionService {
    constructor(db){
        this._db = db
    }

    async addSubmission({ user_id, problem_id, programming_language_id, code, status }){
        const submission = await this._db.submission.create({
            data: {
                user_id, problem_id, programming_language_id, code, status
            },
            include: {
                problem: true,
                programmingLanguage: true
            }
        })

        return submission
    }

    async getSubmissionsByUser(user_id){
        const submissions = await this._db.submission.findMany({
            where: { user_id },
            include: {
                problem: true,
                programmingLanguage: true
            },
            orderBy: {
                updated_at: "desc"
            },
            take: 5
        })

        return submissions
    }
}

module.exports = SubmissionService