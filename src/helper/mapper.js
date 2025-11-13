const userMapper = user => {
    return {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        bio: user.bio
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

const defaultCodeMapper = defaultCode => {
    return {
        id: defaultCode.id,
        code: defaultCode.code,
        programming_language: {
            id: defaultCode.programmingLanguage.id,
            name: defaultCode.programmingLanguage.name,
            version: defaultCode.programmingLanguage.version
        }
    }
}

const programmingLanguageMapper = programmingLanguage => {
    return {
        id: programmingLanguage.id,
        name: programmingLanguage.name,
        version: programmingLanguage.version
    }
}

const submissionMapper = submission => {
    return {
        id: submission.id,
        code: submission.code,
        status: submission.status,
        problem: {
            id: submission.problem.id,
            title: submission.problem.title,
            description: submission.description,
            difficulty: submission.difficulty
        },
        programming_language: {
            id: submission.programmingLanguage.id,
            name: submission.programmingLanguage.name,
            version: submission.programmingLanguage.version
        }
    }
}

const problemSuggestionMapper = problemSuggestion => {
    return {
        id: problemSuggestion.id,
        title: problemSuggestion.title,
        description: problemSuggestion.description,
        difficulty: problemSuggestion.difficulty,
        suggester: {
            id: discussion.creator.id,
            username: discussion.creator.username,
            fullname: discussion.creator.fullname
        }
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

module.exports = {
    userMapper,
    problemMapper,
    defaultCodeMapper,
    programmingLanguageMapper,
    submissionMapper,
    problemSuggestionMapper,
    discussionMapper,
    commentMapper
}