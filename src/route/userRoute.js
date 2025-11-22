const { Router } = require("express")
const UserService = require("../service/userService")
const UserHandler = require("../handler/userHandler")
const authMiddleware = require("../middleware/authMiddleware")
const ProblemService = require("../service/problemService")

const userRouter = db => {
    const router = Router()
    const service = new UserService(db)
    const problemService = new ProblemService(db)
    const handler = new UserHandler(service, problemService)

    router.get("/", authMiddleware, handler.getUserById)
    router.post("/register", handler.postUser)
    router.post("/login", handler.verifyUser)
    router.put("/", authMiddleware, handler.updateUserById)

    return router
}

module.exports = userRouter