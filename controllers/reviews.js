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


// @desc        Add review
// @route       POST /api/v1/bootcamps/:bootcampId/reviews
// @access      Private
exports.addReview = AsyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId;
    req.body.user = req.user.id;

    const bootcamp = await Bootcamp.findById(req.params.bootcampId);

    if (!bootcamp) {
        return next(new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId}`, 404));
    }

    const review = await Review.create(req.body);

    let response = {
        "code": 201,
        "status": true,
        "message": "success",
        "data" : review
    }
    res.status(response['code']).json((response));
});

// @desc        Update review
// @route       PUT /api/v1/reviews/:id
// @access      Private
exports.updateReview = AsyncHandler(async (req, res, next) => {
    let review = await Review.findById(req.params.id);

    if (!review) {
        return next(new ErrorResponse(`No review with the id of ${req.params.id}`, 404));
    }

    // Make sure is course owner
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to update review ${review._id}`, 401));
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true        
    });

    let response = {
        "code": 200,
        "status": true,
        "message": "success",
        "data" : review
    }
    res.status(response['code']).json((response));
});

// @desc        Delete review
// @route       Delete /api/v1/reviews/:id
// @access      Private
exports.deleteReview = AsyncHandler(async (req, res, next) => {
    let review = await Review.findById(req.params.id);

    if (!review) {
        return next(new ErrorResponse(`No review with the id of ${req.params.id}`, 404));
    }

    // Make sure is course owner
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete review ${review._id}`, 401));
    }

    await review.remove();

    let response = {
        "code": 200,
        "status": true,
        "message": "success",
        "data" : []
    }
    res.status(response['code']).json((response));
});
