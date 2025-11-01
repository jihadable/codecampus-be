const { Router } = require("express")
const ProblemService = require("../service/problemService")
const ProblemHandler = require("../handler/problemHandler")

const problemRouter = db => {
    const router = Router()
    const service = new ProblemService(db)
    const handler = new ProblemHandler(service)

    router.get("/", handler.getProblems)
    router.get("/:problem_id", handler.getProblemById)

    return router
}

module.exports = problemRouter