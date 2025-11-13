const errorHandlerMiddleware = (err, req, res) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'

    res.status(statusCode).json({
        status: "fail",
        message
    })
}

module.exports = errorHandlerMiddleware