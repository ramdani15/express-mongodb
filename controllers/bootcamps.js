const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const AsyncHandler = require('../middlewares/async');
const Bootcamp = require('../models/Bootcamp');

// @desc        Show all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
exports.getBootcamps = AsyncHandler(async (req, res, next) => {
    res.status(res.advancedResults.code || 200).json((res.advancedResults));
});

// @desc        Create new bootcamp
// @route       POST /api/v1/bootcamps
// @access      Private
exports.createBootcamp = AsyncHandler(async (req, res, next) => {
    // Add user to req.body
    req.body.user = req.user.id;

    // Check for published bootcamp
    const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id })

    // If the user is not an admin, they can only add one bootcamp
    if (publishedBootcamp && req.user.role !== 'admin') {
        return next(new ErrorResponse(`The user with ID ${req.user.id} has already published a bootcamp`, 400));
    }

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
// @route       GET /api/v1/bootcamps/:id
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
// @route       PUT /api/v1/bootcamps
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
// @route       DELETE /api/v1/bootcamps
// @access      Private
exports.deleteBootcamp = async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`));
    }

    let response = {
        "code": 200,
        "status": true,
        "message": "success",
        "data" : []
    }

    bootcamp.remove();

    res.status(response['code']).json((response))
};

// @desc        Upload photo bootcamp
// @route       PUT /api/v1/bootcamps/:id/photo
// @access      Private
exports.bootcampPhotoUplaod = async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }

    if (!req.files) {
        return next(new ErrorResponse(`Please upload a file`, 400));
    }

    const file = req.files.file;

    // Make sure the image is photo
    if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`Please upload an image file`, 400));
    }

    // Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400));
    }

    // Create custom filename
    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if (err) {
            console.log(err);
            return next(new ErrorResponse(`Problem with file upload`, 500));
        }

        await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
        let response = {
            "code": 200,
            "status": true,
            "message": "success",
            "data" : file.name
        }    
        res.status(response['code']).json((response))
    });
};