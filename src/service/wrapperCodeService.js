const NotFoundError = require("../error/NotFoundError")

class WrapperCodeService {
    constructor(db){
        this._db = db
    }

    async getWrapperCodeByProblemAndProgrammingLanguage(problem_id, programming_language_id){
        const wrapperCode = await this._db.wrapperCode.findUnique({
            where: {
                problem_id_programming_language_id: {
                    problem_id, programming_language_id
                }
            }
        })

        if (!wrapperCode){
            throw new NotFoundError("Code penutup tidak ditemukan")
        }

        return wrapperCode
    }
}

module.exports = WrapperCodeService