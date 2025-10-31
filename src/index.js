const express = require("express")
const cors = require("cors")
const DB = require("./database/db")
const apiRouter = require("./route/route")
require("dotenv").config()

const app = express()

app.use(express.json(), cors())

const db = DB()
app.use("/api", apiRouter(db))

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})