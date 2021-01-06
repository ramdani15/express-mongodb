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

// @desc        Get single review
// @route       GET /api/v1/reviews/:id
// @access      Public
exports.getReview = AsyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description',
    }).populate({
        path: 'user',
        select: 'name'
    });

    if (!review) {
        return next(new ErrorResponse(`No review with id of ${req.params.id}`));
    }

    let response = {
        "code": 200,
        "status": true,
        "message": "success",
        "data" : review
    }

    res.status(response['code']).json((response));
});