const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    // Log in console
    console.log(err.stack);

    // Mongoose bad ObjectID
    if (err.name === 'CastError') {
        const message = `Resource not found with id  of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    res.status(error.statusCode || 500).json({
        status: false,
        error: error.message || 'Server Error'
    });
}

module.exports = errorHandler;