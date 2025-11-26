const { Router } = require("express")
const SubmissionService = require("../service/submissionService")
const PistonAPIService = require("../service/pistionAPIService")
const ProblemService = require("../service/problemService")
const ProgrammingLanguageService = require("../service/programmingLanguageService")
const TestCaseService = require("../service/testCaseService")
const SubmissionHandler = require("../handler/submissionHandler")
const authMiddleware = require("../middleware/authMiddleware")
const WrapperCodeService = require("../service/wrapperCodeService")

const submissionRouter = db => {
    const router = Router()
    const service = new SubmissionService(db)
    const pistonAPIService = new PistonAPIService()
    const problemService = new ProblemService(db)
    const programmingLanguageService = new ProgrammingLanguageService(db)
    const testCaseService = new TestCaseService(db)
    const wrapperCodeService = new WrapperCodeService(db)
    const handler = new SubmissionHandler(
        service,
        pistonAPIService,
        problemService,
        programmingLanguageService,
        testCaseService,
        wrapperCodeService
    )

    router.post("/", authMiddleware, handler.postSubmission)
    router.get("/users", authMiddleware, handler.getSubmissionsByUser)

    return router
}

module.exports = submissionRouter