const { Router } = require("express")
const errorHandlerMiddleware = require("../middleware/errorMiddleware")
const userRouter = require("./userRoute")

const apiRouter = db => {
    const router = Router()

    router.use("/users", userRouter(db))
    // router.use("/submissions")
    // router.use("/discussions")
    // router.use("/comments")
    // router.use("/problem_suggestion")
    // router.use("/leaderboard")
    router.use(errorHandlerMiddleware)

    return router
}

module.exports = apiRouter