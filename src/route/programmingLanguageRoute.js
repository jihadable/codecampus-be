const { Router } = require("express")
const ProgrammingLanguageService = require("../service/programmingLanguageService")
const ProgrammingLanguageHandler = require("../handler/programmingLanguageHandler")

const programmingLanguageRouter = db => {
    const router = Router()
    const service = new ProgrammingLanguageService(db)
    const handler = new ProgrammingLanguageHandler(service)

    router.get("/", handler.getProgrammingLanguages)

    return router
}

module.exports = programmingLanguageRouter