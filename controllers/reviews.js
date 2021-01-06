const ErrorResponse = require('../utils/errorResponse');
const AsyncHandler = require('../middlewares/async');
const Review = require('../models/Review');
const Bootcamp = require('../models/Bootcamp');

// @desc        Show all reviews
// @route       GET /api/v1/reviews
// @route       GET /api/v1/bootcamps/:bootcampId/reviews
// @access      Public
exports.getReviews = AsyncHandler(async (req, res, next) => {
    if (req.params.bootcampId) {
        const reviews = await Review.find({bootcamp: req.params.bootcampId});
        let response = {
            "code": 200,
            "status": true,
            "message": "success",
            "count": reviews.length,
            "data" : reviews
        }
        res.status(response['code']).json((response));
    } else {
        res.status(res.advancedResults.code || 200).json((res.advancedResults));
    }
});
