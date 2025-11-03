const NotFoundError = require("../error/NotFoundError")

class ProgrammingLanguageService {
    constructor(db){
        this._db = db
    }

    async getProgrammingLanguages(){
        const programmingLanguages = await this._db.programmingLanguage.findMany()

        return programmingLanguages
    }

    async getProgrammingLanguageById(id){
        const programmingLanguage = await this._db.programmingLanguage.findUnique({
            where: { id }
        })

        if (!programmingLanguage){
            throw new NotFoundError("Bahasa pemrograman tidak ditemukan")
        }

        return programmingLanguage
    }
}

module.exports = ProgrammingLanguageService