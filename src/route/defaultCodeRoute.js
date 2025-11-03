const { Router } = require("express")
const DefaultCodeService = require("../service/defaultCodeService")
const DefaultCodeHandler = require("../handler/defaultCodeHandler")

const defaultCodeRouter = db => {
    const router = Router()
    const service = new DefaultCodeService(db)
    const handler = new DefaultCodeHandler(service)

    router.get("/problems/:problem_id", handler.getDefaultCodesByProblem)

    return router
}

module.exports = defaultCodeRouter