const errorHandlerMiddleware = (err, _, res) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'

    return res.status(statusCode).json({
        status: "fail",
        message
    })
}

module.exports = errorHandlerMiddleware