const { commentMapper } = require("../helper/mapper")

class CommentHandler {
    constructor(service){
        this._service = service

        this.postComment = this.postComment.bind(this)
        this.getCommentsByDiscussion = this.getCommentsByDiscussion.bind(this)
        this.deleteCommentById = this.deleteCommentById.bind(this)
    }

    async postComment(req, res, next){
        try {
            const { user_id } = res.locals
            const { discussion_id, content } = req.body
            const comment = await this._service.addComment({ discussion_id, user_id, content })

            res.status(201).json({
                status: "success",
                data: { comment: commentMapper(comment) }
            })
        } catch(error){
            next(error)
        }
    }

    async getCommentsByDiscussion(req, res, next){
        try {
            const { discussion_id } = req.params
            const comments = await this._service.getCommentsByDiscussion(discussion_id)

            res.status(200).json({
                status: "success",
                data: { comments: comments.map(comment => commentMapper(comment)) }
            })
        } catch(error){
            next(error)
        }
    }

    async deleteCommentById(req, res, next){
        try {
            const { comment_id } = req.params
            await this._service.deleteCommentById(comment_id)

            res.status(200).json({
                status: "success"
            })
        } catch(error){
            next(error)
        }
    }
}

module.exports = CommentHandler