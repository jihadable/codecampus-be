const getPoints = (submissions, problems, problemSuggestions) => {
    const pointsPerSubmission = {
        Mudah: 1,
        Sedang: 2,
        Sulit: 3
    }
    const pointsPerProblemSuggestion = {
        Mudah: 4,
        Sedang: 5,
        Sulit: 6
    }

    const acceptedSubmissions = {
        Mudah: 0,
        Sedang: 0,
        Sulit: 0
    }
    submissions.forEach(submission => {
        if (submission.status == "Accepted"){
            acceptedSubmissions[submission.problem.difficulty]++
        }
    })

    const acceptedProblemSuggestions = {
        Mudah: 0,
        Sedang: 0,
        Sulit: 0
    }
    problemSuggestions.forEach(problemSuggestion => {
        if (problemSuggestion.status){
            acceptedProblemSuggestions[problemSuggestion.difficulty]++
        }
    })

    let totalPoints = 0
    for (const difficulty in pointsPerSubmission){
        totalPoints += pointsPerSubmission[difficulty] * acceptedSubmissions[difficulty]
        totalPoints += pointsPerProblemSuggestion[difficulty] * acceptedProblemSuggestions[difficulty]
    }

    const totalEasyProblems = problems.filter(problem => problem.difficulty == "Mudah").length
    const totalMediumProblems = problems.filter(problem => problem.difficulty == "Sedang").length
    const totalHardProblems = problems.filter(problem => problem.difficulty == "Sulit").length

    const userSubmissions = {
        accepted_submissions: acceptedSubmissions.Mudah + acceptedSubmissions.Sedang + acceptedSubmissions.Sulit,
        total_problems: problems.length,
        Mudah: {
            accepted_submissions: acceptedSubmissions.Mudah,
            total_problems: totalEasyProblems
        },
        Sedang: {
            accepted_submissions: acceptedSubmissions.Sedang,
            total_problems: totalMediumProblems
        },
        Sulit: {
            accepted_submissions: acceptedSubmissions.Sulit,
            total_problems: totalHardProblems
        }
    }

    return {
        submissions: userSubmissions,
        accpeted_problem_suggestions: acceptedProblemSuggestions,
        total_points: totalPoints
    }
}

module.exports = getPoints