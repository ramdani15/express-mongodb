const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require('../models/Bootcamp');

let response = {
    "code": 400,
    "status": false,
    "message": "",
    "data" : []
}

// @desc        Show all bootcamps
// @route       /api/v1/bootcamps
// @access      Public
exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find();

        response['code'] = 200;
        response['status'] = true;
        response['message'] = "success";
        response['data'] = bootcamps;

        // add count
        const { data } = response;
        delete response.data;
        response.count = bootcamps.length;
        response.data = data;
    } catch (err) {
        next(err);
    }
    res.status(response['code']).json((response));

    // delete count
    delete response.count;
}

// @desc        Create new bootcamp
// @route       /api/v1/bootcamps
// @access      Private
exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);

        response['code'] = 201;
        response['status'] = true;
        response['message'] = "success";
        response['data'] = bootcamp;
    } catch (err) {
        next(err);
    }
    res.status(response['code']).json((response))
}

// @desc        Show bootcamp
// @route       /api/v1/bootcamps/:id
// @access      Public
exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);

        response['code'] = 200;
        response['status'] = true;
        response['message'] = "success";
        response['data'] = bootcamp;

        res.status(response['code']).json((response))
    } catch (err) {
        next(err);
    }
}

// @desc        Update bootcamp
// @route       /api/v1/bootcamps
// @access      Private
exports.updateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        response['code'] = 200;
        response['status'] = true;
        response['message'] = "success";
        response['data'] = bootcamp;
    } catch (err) {
        next(err);
    }
    res.status(response['code']).json((response))
}

// @desc        Delete bootcamp
// @route       /api/v1/bootcamps
// @access      Private
exports.deleteBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        response['code'] = 204;
        response['status'] = true;
        response['message'] = "success";
        response['data'] = [];
    } catch (err) {
        next(err);
    }
    next(err);
}