const { Prisma } = require("@prisma/client")
const { submissionMapper } = require("../helper/mapper")
const { SubmissionStatus } = require("../generated/prisma")

class SubmissionHandler {
    constructor(
        service,
        pistonAPIService,
        problemService,
        programmingLanguageService,
        testCaseService,
        wrapperCodeService
    ){
        this._service = service

        this._pistonAPIService = pistonAPIService
        this._problemService = problemService
        this._programmingLanguageService = programmingLanguageService
        this._testCaseService = testCaseService
        this._wrapperCodeService = wrapperCodeService

        this.postSubmission = this.postSubmission.bind(this)
        this.getSubmissionsByUser = this.getSubmissionsByUser.bind(this)
    }

    async postSubmission(req, res, next){
        try {
            const { user_id } = res.locals
            const { code, problem_id, programming_language_id } = req.body

            const problem = await this._problemService.getProblemById(problem_id)
            const programmingLanguage = await this._programmingLanguageService.getProgrammingLanguageById(programming_language_id)
            const testCases = await this._testCaseService.getTestCasesByProblemAndProgrammingLanguage(problem_id, programming_language_id)
            const wrapperCode = await this._wrapperCodeService.getWrapperCodeByProblemAndProgrammingLanguage(problem_id, programming_language_id)

            const { name, version, file_name } = programmingLanguage
            const { function_name } = problem
            const { code: wrapper_code_template } = wrapperCode
            
            let fullCode = code
            for (const { input } of testCases){
                fullCode += wrapper_code_template.replace("function_name", `${function_name}(${input})`)
            }

            const result = await this._pistonAPIService.executeCode({
                programming_language: name,
                programming_language_version: version,
                file_name,
                code: fullCode
            })
            // console.log(result)

            // runtime error
            if (result.run.stderr.length){
                const submission = await this._service.addSubmission({ user_id, problem_id, programming_language_id, code, status: SubmissionStatus.Runtime_Error })

                res.status(200).json({
                    status: "success",
                    data: {
                        submission: {
                            ...submissionMapper(submission),
                            runtime_error: {
                                stderr: result.run.stderr
                            }
                        }
                    }
                })
            }

            // runtime error
            if (result.run.code){
                const submission = await this._service.addSubmission({ user_id, problem_id, programming_language_id, code, status: SubmissionStatus.Runtime_Error })

                res.status(200).json({
                    status: "success",
                    data: {
                        submission: {
                            ...submissionMapper(submission),
                            runtime_error: {
                                stderr: result.run.stdout
                            }
                        }
                    }
                })
            }

            const actualOutputs = result.run.output.split("\n")

            let submissionStatus = true
            const totalTestCases = testCases.length
            let passedTestCases = 0
            let wrongTestCaseIndex = -1
            for (let i = 0; i < totalTestCases; i++){
                const { expected_output } = testCases[i]
                const actual_output = actualOutputs[i]

                if (actual_output != expected_output){
                    wrongTestCaseIndex = i
                    submissionStatus = false
                } else {
                    passedTestCases++
                }
            }

            // accepted
            if (submissionStatus){
                const submission = await this._service.addSubmission({ user_id, problem_id, programming_language_id, code, status: SubmissionStatus.Accepted })

                res.status(200).json({
                    status: "success",
                    data: {
                        submission: {
                            ...submissionMapper(submission),
                            accepted: {
                                passed_test_cases: passedTestCases,
                                total_test_cases: totalTestCases
                            }
                        }
                    }
                })
            } 
            // wrong answer
            else {
                const submission = await this._service.addSubmission({ user_id, problem_id, programming_language_id, code, status: SubmissionStatus.Wrong_Answer })
                const { input_as_json, expected_output } = testCases[wrongTestCaseIndex]
                const actual_output = actualOutputs[wrongTestCaseIndex]

                res.status(200).json({
                    status: "success",
                    data: {
                        submission: {
                            ...submissionMapper(submission),
                            wrong_answer: {
                                passed_test_cases: passedTestCases,
                                total_test_cases: totalTestCases,
                                input: input_as_json,
                                expected_output,
                                actual_output
                            }
                        }
                    }
                })
            }
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