const { default: axios } = require("axios")

class PistonAPIService {
    constructor(){
        this._pistonAPIEndpoint = process.env.PISTON_API_ENDPOINT
    }

    async executeCode({ programming_language, programming_language_version, file_name, code }){
        try {
            const { data } = await axios.post(`${this._pistonAPIEndpoint}/execute`, {
                language: programming_language,
                version: programming_language_version,
                files: [
                    {
                        name: file_name,
                        content: code
                    }
                ]
            })
    
            return data   
        } catch(error){
            console.log(error)
        }
    }
}

module.exports = PistonAPIService