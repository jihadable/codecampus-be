const userMapper = user => {
    return {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        email: user.email
    }
}

const problemMapper = problem => {
    return {
        id: problem.id,
        title: problem.title,
        description: problem.description,
        difficulty: problem.difficulty
    }
}

const discussionMapper = discussion => {
    return {
        id: discussion.id,
        title: discussion.title,
        content: discussion.content,
        creator: {
            id: discussion.creator.id,
            username: discussion.creator.username,
            fullname: discussion.creator.fullname
        },
        created_at: discussion.created_at
    }
}

const commentMapper = comment => {
    return {
        id: comment.id,
        content: comment.content,
        creator: {
            id: comment.creator.id,
            username: comment.creator.username,
            fullname: comment.creator.fullname
        },
        created_at: comment.created_at
    }
}

module.exports = { userMapper, problemMapper, discussionMapper, commentMapper }