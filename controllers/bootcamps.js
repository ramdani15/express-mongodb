const ErrorResponse = require('../utils/errorResponse');
const AsyncHandler = require('../middlewares/async');
const Bootcamp = require('../models/Bootcamp');

// @desc        Show all bootcamps
// @route       /api/v1/bootcamps
// @access      Public
exports.getBootcamps = AsyncHandler(async (req, res, next) => {
    let query;

    let queryStr = JSON.stringify(req.query);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    queryStr = JSON.parse(queryStr);

    query = Bootcamp.find(queryStr);

    const bootcamps = await query;

    let response = {
        "code": 200,
        "status": true,
        "message": "success",
        "count": bootcamps.length,
        "data" : bootcamps
    }

    res.status(response['code']).json((response));

    // delete count
    delete response.count;
});

// @desc        Create new bootcamp
// @route       /api/v1/bootcamps
// @access      Private
exports.createBootcamp = AsyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);

    let response = {
        "code": 201,
        "status": true,
        "message": "success",
        "data" : bootcamp
    }

    res.status(response['code']).json((response))
});

// @desc        Show bootcamp
// @route       /api/v1/bootcamps/:id
// @access      Public
exports.getBootcamp = AsyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`));
    }

    let response = {
        "code": 200,
        "status": true,
        "message": "success",
        "data" : bootcamp
    }

    res.status(response['code']).json((response))
});

// @desc        Update bootcamp
// @route       /api/v1/bootcamps
// @access      Private
exports.updateBootcamp = AsyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`));
    }

    let response = {
        "code": 200,
        "status": true,
        "message": "success",
        "data" : bootcamp
    }

    res.status(response['code']).json((response))
});

// @desc        Delete bootcamp
// @route       /api/v1/bootcamps
// @access      Private
exports.deleteBootcamp = async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`));
    }

    let response = {
        "code": 200,
        "status": true,
        "message": "success",
        "data" : []
    }

    res.status(response['code']).json((response))
};