const ErrorResponse = require('../utils/errorResponse');
const AsyncHandler = require('../middlewares/async');
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');

// @desc        Show all courses
// @route       GET /api/v1/courses
// @route       GET /api/v1/bootcamps/:bootcampId/courses
// @access      Public
exports.getCourses = AsyncHandler(async (req, res, next) => {
    let query;

    if (req.params.bootcampId) {
        query = Course.find({bootcamp: req.params.bootcampId});
        const courses = await query;
        let response = {
            "code": 200,
            "status": true,
            "message": "success",
            "count": courses.length,
            "data" : courses
        }
        res.status(response['code']).json((response));
    } else {
        res.status(res.advancedResults.code || 200).json((res.advancedResults));
    }
});

// @desc        Get single course
// @route       GET /api/v1/courses/:id
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
// @route       POST /api/v1/bootcamps/:bootcampId/courses
// @access      Private
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

// @desc        Update course
// @route       PUT /api/v1/courses/:id
// @access      Private
exports.updateCourse = AsyncHandler(async (req, res, next) => {
    let course = await Course.findById(req.params.id);

    if (!course) {
        return next(new ErrorResponse(`No course with id ${req.params.id}`));
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true        
    });

    let response = {
        "code": 200,
        "status": true,
        "message": "success",
        "data" : course
    }

    res.status(response['code']).json((response));
});

// @desc        Delete course
// @route       DELETE /api/v1/courses/:id
// @access      Private
exports.deleteCourse = AsyncHandler(async (req, res, next) => {
    let course = await Course.findById(req.params.id);

    if (!course) {
        return next(new ErrorResponse(`No course with id ${req.params.id}`));
    }

    await course.remove();

    let response = {
        "code": 200,
        "status": true,
        "message": "success",
        "data" : {}
    }

    res.status(response['code']).json((response));
});
