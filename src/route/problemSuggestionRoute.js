const { Router } = require("express")
const ProblemSuggestionService = require("../service/problemSuggestionService")
const ProblemSuggestionHandler = require("../handler/problemSuggestionHandler")
const authMiddleware = require("../middleware/authMiddleware")

const problemSuggestionRouter = db => {
    const router = Router()
    const service = new ProblemSuggestionService(db)
    const handler = new ProblemSuggestionHandler(service)

    router.post("/", authMiddleware, handler.postProblemSuggestion)
    router.get("/users", authMiddleware, handler.getProblemSuggestionsByUser)

    return router
}

module.exports = problemSuggestionRouter