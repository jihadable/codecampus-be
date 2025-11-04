const { Router } = require("express")
const UserService = require("../service/userService")
const LeaderboardHandler = require("../handler/leaderboardHandler")

const leaderboardRouter = db => {
    const router = Router()
    const userService = new UserService(db)
    const handler = new LeaderboardHandler(userService)

    router.get("/", handler.getLeaderboard)

    return router
}

module.exports = leaderboardRouter