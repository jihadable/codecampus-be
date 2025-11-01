const NotFoundError = require("../error/NotFoundError")
const { problemMapper } = require("../helper/mapper")

class ProblemService {
    constructor(db){
        this._db = db
    }

    async getProblems(page, limit){
        const skip = (page - 1) * limit
        const total = await this._db.problem.count()

        const problems = await this._db.problem.findMany({
            skip,
            take: limit,
            orderBy: { createdAt: "desc" }
        })

        const totalPages = Math.ceil(total / limit)

        return {
            current_page: page,
            total_pages: totalPages,
            total_problems: total,
            problems_per_page: limit,
            problems: problems.map(problem => problemMapper(problem))
        }
    }

    async getProblemById(id){
        const problem = await this._db.problem.findUnique({
            where: { id }
        })

        if (!problem){
            throw new NotFoundError("Soal pemrograman tidak ditemukan")
        }

        return problem
    }
}

module.exports = ProblemService