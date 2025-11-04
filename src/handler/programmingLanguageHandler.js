const { programmingLanguageMapper } = require("../helper/mapper")

class ProgrammingLanguageHandler {
    constructor(service){
        this._service = service

        this.getProgrammingLanguages = this.getProgrammingLanguages.bind(this)
    }

    async getProgrammingLanguages(req, res, next){
        try {
            const programmingLanguages = await this._service.getProgrammingLanguages()

            res.status(200).json({
                status: "success",
                data: { programming_languages: programmingLanguages.map(programmingLanguage => programmingLanguageMapper(programmingLanguage))}
            })
        } catch(error){
            next(error)
        }
    }
}

module.exports = ProgrammingLanguageHandler