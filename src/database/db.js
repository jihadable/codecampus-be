const { PrismaClient } = require("../generated/prisma")

const DB = () => new PrismaClient()

module.exports = DB