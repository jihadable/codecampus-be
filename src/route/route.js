const { Router } = require("express")
const errorHandlerMiddleware = require("../middleware/errorMiddleware")
const userRouter = require("./userRoute")
const problemRouter = require("./problemRoute")
const discussionRouter = require("./discussionRoute")
const commentRouter = require("./commentRoute")

const apiRouter = db => {
    const router = Router()

    router.use("/users", userRouter(db))
    router.use("/problems", problemRouter(db))
    // router.use("/submissions")
    router.use("/discussions", discussionRouter(db))
    router.use("/comments", commentRouter(db))
    // router.use("/problem_suggestions")
    // router.use("/leaderboard")
    router.use(errorHandlerMiddleware)

    return router
}

module.exports = apiRouter