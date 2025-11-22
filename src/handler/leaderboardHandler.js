const getPoints = require("../helper/getPoints")

class LeaderboardHandler {
    constructor(userService, problemService){
        this._userService = userService
        this._problemService = problemService

        this.getLeaderboard = this.getLeaderboard.bind(this)
    }

    async getLeaderboard(req, res, next){
        try {
            const users = await this._userService.getUsers()
            const leaderboard = []
            const problems = await this._problemService.getProblems()

            users.forEach(user => {
                const points = getPoints(user.submissions, problems, user.problemSuggestions)
                const userInLeaderboard = {
                    id: user.id,
                    username: user.username,
                    fullname: user.fullname,
                    ...points
                }

                leaderboard.push(userInLeaderboard)
            })

            leaderboard.sort((a, b) => b.total_points - a.total_points)

            res.status(200).json({
                status: "success",
                data: { leaderboard }
            })
        } catch(error){
            next(error)
        }
    }
}

module.exports = LeaderboardHandler