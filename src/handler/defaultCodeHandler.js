const { defaultCodeMapper } = require("../helper/mapper")

class DefaultCodeHandler {
    constructor(service){
        this._service = service

        this.getDefaultCodesByProblem = this.getDefaultCodesByProblem.bind(this)
    }

    async getDefaultCodesByProblem(req, res, next){
        try {
            const { problem_id } = req.params
            const defaultCodes = await this._service.getDefaultCodesByProblem(problem_id)

            res.status(200).json({
                status: "success",
                data: { default_code: defaultCodes.map(defaultCode => defaultCodeMapper(defaultCode)) }
            })
        } catch(error){
            next(error)
        }
    }
}

module.exports = DefaultCodeHandler