const ErrorResponse = require('../utils/errorResponse');
const AsyncHandler = require('../middlewares/async');
const User = require('../models/User');

// @desc        Get all users
// @route       GET /api/v1/auth/users
// @access      Private/Admin
exports.getUsers = AsyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc        Get single user
// @route       GET /api/v1/auth/users/:id
// @access      Private/Admin
exports.getUser = AsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    let response = {
        "code": 200,
        "status": true,
        "message": "success",
        data: user
    }

    res.status(response.code).json(response);
});

// @desc        Create user
// @route       POST /api/v1/auth/users
// @access      Private/Admin
exports.createUser = AsyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);

    let response = {
        "code": 201,
        "status": true,
        "message": "success",
        data: user
    }

    res.status(response.code).json(response);
});

// @desc        Update user
// @route       PUT /api/v1/auth/users/:id
// @access      Private/Admin
exports.updateUser = AsyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    let response = {
        "code": 200,
        "status": true,
        "message": "success",
        data: user
    }

    res.status(response.code).json(response);
});

// @desc        Delete user
// @route       DELETE /api/v1/auth/users/:id
// @access      Private/Admin
exports.deleteUser = AsyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    let response = {
        "code": 200,
        "status": true,
        "message": "success",
        data: []
    }

    res.status(response.code).json(response);
});
