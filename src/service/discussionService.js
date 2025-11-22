const NotFoundError = require("../error/NotFoundError")
const { discussionMapper } = require("../helper/mapper")

class DiscussionService {
    constructor(db){
        this._db = db
    }

    async addDiscussion({ user_id, title, content }){
        const discussion = await this._db.discussion.create({
            data: { created_by: user_id, title, content },
            include: { creator: true }
        })

        return discussion
    }

    // async getDiscussions(page, limit){
    //     const skip = (page - 1) * limit
    //     const total = await this._db.discussion.count()

    //     const discussions = await this._db.discussion.findMany({
    //         skip,
    //         take: limit,
    //         orderBy: { created_at: "desc" },
    //         include: { creator: true }
    //     })

    //     const totalPages = Math.ceil(total / limit)

    //     return {
    //         current_page: page,
    //         total_pages: totalPages,
    //         total_discussions: total,
    //         discussions_per_page: limit,
    //         discussions: discussions.map(discussion => discussionMapper(discussion))
    //     }
    // }
    async getDiscussions(){
        const discussions = await this._db.discussion.findMany({
            include: {
                creator: true,
                _count: {
                    select: { comments: true }
                }
            },
            orderBy: {
                created_at: "desc"
            }
        })

        return discussions
    }
    
    async getDiscussionById(id){
        const discussion = await this._db.discussion.findUnique({
            where: { id },
            include: { creator: true }
        })

        if (!discussion){
            throw new NotFoundError("Diskusi tidak ditemukan")
        }

        return discussion
    }

    async deleteDiscussionById(id){
        await this.getDiscussionById(id)

        await this._db.discussion.delete({
            where: { id }
        })
    }
}

module.exports = DiscussionService