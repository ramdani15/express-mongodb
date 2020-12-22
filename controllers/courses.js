const ErrorResponse = require('../utils/errorResponse');
const AsyncHandler = require('../middlewares/async');
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');

// @desc        Show all courses
// @route       /api/v1/courses
// @route       /api/v1/bootcamps/:bootcampId/courses
// @access      Public
exports.getCourses = AsyncHandler(async (req, res, next) => {
    let query;

    if (req.params.bootcampId) {
        query = Course.find({bootcamp: req.params.bootcampId});
    } else {
        query = Course.find();
    }

    query = query.populate({
        path: 'bootcamp',
        select: 'name description',
    });

    const courses = await query;

    let response = {
        "code": 200,
        "status": true,
        "message": "success",
        "count": courses.length,
        "data" : courses
    }

    res.status(response['code']).json((response));
});

// @desc        Get single course
// @route       /api/v1/courses/:id
// @access      Public
exports.getCourse = AsyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description',
    });

    if (!course) {
        return next(new ErrorResponse(`No course with id of ${req.params.id}`));
    }

    let response = {
        "code": 200,
        "status": true,
        "message": "success",
        "data" : course
    }

    res.status(response['code']).json((response));
});

// @desc        Add course
// @route       /api/v1/bootcamps/:bootcampId/courses
// @access      Public
exports.addCourse = AsyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId;

    const bootcamp = await Bootcamp.findById(req.params.bootcampId);

    if (!bootcamp) {
        return next(new ErrorResponse(`No bootcamp with id ${req.params.bootcampId}`));
    }

    const course = await Course.create(req.body);

    let response = {
        "code": 201,
        "status": true,
        "message": "success",
        "data" : course
    }

    res.status(response['code']).json((response));
});
