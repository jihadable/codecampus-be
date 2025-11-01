const { Router } = require("express")
const CommentService = require("../service/commentService")
const CommentHandler = require("../handler/commentHandler")
const authMiddleware = require("../middleware/authMiddleware")

const commentRouter = db => {
    const router = Router()
    const service = new CommentService(db)
    const handler = new CommentHandler(service)

    router.post("/", authMiddleware, handler.postComment)
    router.get("/discussions/:discussion_id", handler.getCommentsByDiscussion)
    router.delete("/:comment_id", authMiddleware, handler.deleteCommentById)

    return router
}

module.exports = commentRouter