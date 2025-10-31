const express = require("express")
const cors = require("cors")
const path = require("path")
const DB = require("./database/db")
const apiRouter = require("./route/route")
require("dotenv").config()

const app = express()

app.use(express.json(), cors())

const db = DB()
app.use("/api", apiRouter(db))

app.get("/openapi.json", (_, res) => {
    res.sendFile(path.join(__dirname, "../openapi.json"))
})
app.use("/docs", express.static(path.join(__dirname, "view", "docs")))

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})