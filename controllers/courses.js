const ErrorResponse = require('../utils/errorResponse');
const AsyncHandler = require('../middlewares/async');
const Course = require('../models/Course');

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
