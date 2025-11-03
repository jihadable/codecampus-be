const { default: axios } = require("axios")

class PistonAPIService {
    constructor(programmingLanguageService, testCaseService){
        this._pistonAPI = process.env.PISTON_API

        this.programmingLanguageService = programmingLanguageService
        this.testCaseService = testCaseService
    }

    async executeCode(code, programming_language_id, test_case_id){
        const programmingLanguage = await this.programmingLanguageService.getProgrammingLanguageById(programming_language_id)
        const testCase = await this.testCaseService.getTestCaseById(test_case_id)
        const { data } = await axios.post(`${this._pistonAPI}/execute`, {
            language: programmingLanguage.name,
            version: programmingLanguage.version,
            files: {
                content: `${code}\n${programmingLanguage.wrapper_code_template}`
            },
            args: [`${testCase.input}`]
        })

        
    }
}

module.exports = PistonAPIService