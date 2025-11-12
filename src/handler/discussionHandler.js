const { discussionMapper } = require("../helper/mapper")

class DiscussionHandler {
    constructor(service){
        this._service = service

        this.postDiscussion = this.postDiscussion.bind(this)
        this.getDiscussions = this.getDiscussions.bind(this)
        this.getDiscussionById = this.getDiscussionById.bind(this)
        this.deleteDiscussionById = this.deleteDiscussionById.bind(this)
    }

    async postDiscussion(req, res, next){
        try {
            const { user_id } = res.locals
            const { title, content } = req.body
            const discussion = await this._service.addDiscussion({ user_id, title, content })

            res.status(201).json({
                status: "success",
                data: { discussion: discussionMapper(discussion) }
            })
        } catch(error){
            next(error)
        }
    }

    // async getDiscussions(req, res, next){
    //     try {
    //         const page = parseInt(req.query.page) || 1
    //         const limit = parseInt(req.query.limit) || 20

    //         const discussions = await this._service.getDiscussions(page, limit)

    //         res.status(200).json({
    //             status: "success",
    //             data: discussions
    //         })
    //     } catch(error){
    //         next(error)
    //     }
    // }
    async getDiscussions(req, res, next){
        try {
            const discussions = await this._service.getDiscussions()

            res.status(200).json({
                status: "success",
                data: { discussions: discussions.map(discussion => discussionMapper(discussion)) }
            })
        } catch(error){
            next(error)
        }
    }

    async getDiscussionById(req, res, next){
        try {
            const { id } = req.params
            const discussion = await this._service.getDiscussionById(id)

            res.status(200).json({
                status: "success",
                data: { discussion: discussionMapper(discussion) }
            })
        } catch(error){
            next(error)
        }
    }

    async deleteDiscussionById(req, res, next){
        try {
            const { id } = req.params
            await this._service.deleteDiscussionById(id)

            res.status(200).json({
                status: "success"
            })
        } catch(error){
            next(error)
        }
    }
}

module.exports = DiscussionHandler