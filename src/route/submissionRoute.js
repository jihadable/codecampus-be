const { Router } = require("express")
const SubmissionService = require("../service/submissionService")
const PistonAPIService = require("../service/pistionAPIService")
const ProblemService = require("../service/problemService")
const ProgrammingLanguageService = require("../service/programmingLanguageService")
const TestCaseService = require("../service/testCaseService")
const SubmissionHandler = require("../handler/submissionHandler")
const authMiddleware = require("../middleware/authMiddleware")

const submissionRouter = db => {
    const router = Router()
    const service = new SubmissionService(db)
    const pistonAPIService = new PistonAPIService()
    const problemService = new ProblemService(dn)
    const programmingLanguageService = new ProgrammingLanguageService(db)
    const testCaseService = new TestCaseService(db)
    const handler = new SubmissionHandler(
        service,
        pistonAPIService,
        problemService,
        programmingLanguageService,
        testCaseService
    )

    router.post("/", authMiddleware, handler.postSubmission)
    router.get("/users", authMiddleware, handler.getSubmissionsByUser)

    return router
}

module.exports = submissionRouter