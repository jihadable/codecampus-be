const { Router } = require("express")
const UserService = require("../service/userService")
const LeaderboardHandler = require("../handler/leaderboardHandler")
const ProblemService = require("../service/problemService")

const leaderboardRouter = db => {
    const router = Router()
    const userService = new UserService(db)
    const problemService = new ProblemService(db)
    const handler = new LeaderboardHandler(userService, problemService)

    router.get("/", handler.getLeaderboard)

    return router
}

module.exports = leaderboardRouter