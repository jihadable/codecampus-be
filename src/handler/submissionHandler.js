const { submissionMapper } = require("../helper/mapper")

class SubmissionHandler {
    constructor(
        service,
        pistonAPIService,
        problemService,
        programmingLanguageService,
        testCaseService
    ){
        this._service = service

        this._pistonAPIService = pistonAPIService
        this._problemService = problemService
        this._programmingLanguageService = programmingLanguageService
        this._testCaseService = testCaseService

        this.postSubmission = this.postSubmission.bind(this)
        this.getSubmissionsByUser = this.getSubmissionsByUser.bind(this)
    }

    async postSubmission(req, res, next){
        try {
            const { user_id } = res.locals
            const { code, problem_id, programming_language_id } = req.body

            const problem = await this._problemService.getProblemById(problem_id)
            const programmingLanguage = await this._programmingLanguageService.getProgrammingLanguageById(programming_language_id)
            const testCases = await this._testCaseService.getTestCasesByProblem(problem_id)

            const { name, version, wrapper_code_template } = programmingLanguage
            const { function_name } = problem
            
            let submissionStatus = true
            const promises = testCases.map(async(testCase) => {
                const { input, expected_output } = testCase
                const fullCode = code + wrapper_code_template.replace("function_name", `${function_name}(${input})`)

                const result = await this._pistonAPIService.executeCode({ name, version, fullCode })

                const actualOutput = result.run.output.trim()
                if (expected_output != actualOutput){
                    submissionStatus = false
                }
            })

            await Promise.all(promises)

            const submission = await this._service.addSubmission({ user_id, problem_id, programming_language_id, code, status: submissionStatus })

            res.status(201).json({
                status: "success",
                data: { submission: submissionMapper(submission) }
            })
        } catch(error){
            next(error)
        }
    }

    async getSubmissionsByUser(req, res, next){
        try {
            const { user_id } = res.locals
            let submissions = await this._service.getSubmissionsByUser(user_id)

            res.status(200).json({
                status: "success",
                data: { submissions: submissions.map(submission => submissionMapper(submission)) }
            })
        } catch(error){
            next(error)
        }
    }
}

module.exports = SubmissionHandler