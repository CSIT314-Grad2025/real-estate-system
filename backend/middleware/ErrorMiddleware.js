// Class providing custom error middleware methods
class ErrorMiddleware {
    // Error handler to override the default express.js errorHandler
    errorHandler = (err, req, res, next) => {
        // If no status code present, respond with 500 Server Error
        const statusCode = err.status ? err.status : 500;

        res.status(statusCode);
        res.json({
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack
        });
    }
}

module.exports = ErrorMiddleware;
