class DefaultCodeService {
    constructor(db){
        this._db = db
    }

    async getDefaultCodesByProblem(problem_id){
        const defaultCodes = await this._db.defaultCode.findMany({
            where: { problem_id },
            include: { programmingLanguage: true }
        })

        return defaultCodes
    }
}

module.exports = DefaultCodeService