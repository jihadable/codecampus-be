const { NotBeforeError } = require("jsonwebtoken")

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
            include: { creator: true }
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
            where: { id }
        })

        if (!comment){
            throw new NotBeforeError("Komentar tidak ditemukan")
        }

        return comment
    }
}

module.exports = CommentService