class LeaderboardHandler {
    constructor(userService){
        this._userService = userService

        this.getLeaderboard = this.getLeaderboard.bind(this)
    }

    async getLeaderboard(req, res, next){
        try {
            const users = await this._userService.getUsers()
            const leaderboard = []

            users.forEach(user => {
                const pointsPerSubmission = {
                    easy: 1,
                    medium: 2,
                    hard: 3
                }
                const pointsPerProblemSuggestion = {
                    easy: 4,
                    medium: 5,
                    hard: 6
                }

                const acceptedSubmissions = {
                    easy: 0,
                    medium: 0,
                    hard: 0
                }
                user.submissions.forEach(submission => {
                    if (submission.status){
                        acceptedSubmissions[submission.problem.difficulty]++
                    }
                })

                const acceptedProblemSuggestions = {
                    easy: 0,
                    medium: 0,
                    hard: 0
                }
                user.problemSuggestions.forEach(problemSuggestion => {
                    if (problemSuggestion.status){
                        acceptedProblemSuggestions[problemSuggestion.difficulty]++
                    }
                })

                let totalPoints = 0
                for (const difficulty in pointsPerSubmission){
                    totalPoints += pointsPerSubmission[difficulty] * acceptedSubmissions[difficulty]
                    totalPoints += pointsPerProblemSuggestion[difficulty] * acceptedProblemSuggestions[difficulty]
                }

                const userInLeaderboard = {
                    id: user.id,
                    username: user.username,
                    fullname: user.fullname,
                    accepted_submissions: acceptedSubmissions,
                    accpeted_problem_suggestions: acceptedProblemSuggestions,
                    total_points: totalPoints
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