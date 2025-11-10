const DB = require("./db");

const db = DB()

const truncate = async() => {
    await db.user.deleteMany()
    await db.problem.deleteMany()
    await db.programmingLanguage.deleteMany()
    await db.defaultCode.deleteMany()
    await db.testCase.deleteMany()
    await db.submission.deleteMany()
    await db.problemSuggestion.deleteMany()
    await db.discussion.deleteMany()
    await db.comment.deleteMany()
}

truncate()
    .then(() => {
        console.log("✅ Truncating completed successfully.")
    })
    .catch(error => {
        console.error("❌ Truncating failed:", error)
        process.exit(1)
    })
    .finally(() => db.$disconnect())