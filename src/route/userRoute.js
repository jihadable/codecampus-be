const { Router } = require("express")
const UserService = require("../service/userService")
const UserHandler = require("../handler/userHandler")
const authMiddleware = require("../middleware/authMiddleware")

const userRouter = db => {
    const router = Router()
    const service = new UserService(db)
    const handler = new UserHandler(service)

    router.get("/", authMiddleware, handler.getUserById)
    router.post("/register", handler.postUser)
    router.post("/login", handler.verifyUser)
    router.put("/", authMiddleware, handler.updateUserById)

    return router
}

module.exports = userRouter