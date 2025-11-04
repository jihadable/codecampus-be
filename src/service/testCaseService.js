const NotFoundError = require("../error/NotFoundError")

class TestCaseService {
    constructor(db){
        this._db = db
    }

    async getTestCaseById(id){
        const testCase = await this._db.testCase.findUnique({
            where: { id }
        })

        if (!testCase){
            throw new NotFoundError("Kasus pengujian tidak ditemukan")
        }

        return testCase
    }

    async getTestCasesByProblem(problem_id){
        const testCases = await this._db.testCase.findMany({
            where: { problem_id }
        })

        return testCases
    }
}

module.exports = TestCaseService