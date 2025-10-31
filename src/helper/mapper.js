const userMapper = user => {
    return {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        email: user.email
    }
}

module.exports = { userMapper }