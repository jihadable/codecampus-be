const { Router } = require("express")
const DiscussionService = require("../service/discussionService")
const DiscussionHandler = require("../handler/discussionHandler")
const authMiddleware = require("../middleware/authMiddleware")

const discussionRouter = db => {
    const router = Router()
    const service = new DiscussionService(db)
    const handler = new DiscussionHandler(service)

    router.post("/", authMiddleware, handler.postDiscussion)
    router.get("/", handler.getDiscussions)
    router.get("/:discussion_id", handler.getDiscussionById)
    router.delete("/:discussin_id", authMiddleware, handler.deleteDiscussionById)

    return router
}

module.exports = discussionRouter