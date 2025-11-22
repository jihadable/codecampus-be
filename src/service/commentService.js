const NotFoundError = require("../error/NotFoundError")

class CommentService {
    constructor(db){
        this._db = db
    }

    async addComment({ discussion_id, user_id, content }){
        const discussion = await this._db.comment.create({
            data: {
                discussion_id,
                created_by: user_id,
                content      
            },
            include: { creator: true }
        })

        return discussion
    }

    async getCommentsByDiscussion(discussion_id){
        const comments = await this._db.comment.findMany({
            where: { discussion_id },
            include: { creator: true },
            orderBy: {
                created_at: "desc"
            }
        })

        return comments
    }

    async deleteCommentById(id){
        await this.getCommentById(id)

        await this._db.comment.delete({
            where: { id }
        })
    }

    async getCommentById(id){
        const comment = await this._db.comment.findUnique({
            where: { id },
            include: { creator: true }
        })

        if (!comment){
            throw new NotFoundError("Komentar tidak ditemukan")
        }

        return comment
    }
}

module.exports = CommentService