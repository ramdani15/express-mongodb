const ErrorResponse = require('../utils/errorResponse');
const AsyncHandler = require('../middlewares/async');
const User = require('../models/User');

// @desc        Register user
// @route       POST /api/v1/auth/register
// @access      Public
exports.register = AsyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    // Create user
    const user = await User.create({
        name,
        email,
        password,
        role
    });

    // Create token
    const token = user.getSignedJwtToken();

    let response = {
        "code": 201,
        "status": true,
        "message": "success",
        token
    }

    res.status(response['code']).json((response))
});

// @desc        Login user
// @route       POST /api/v1/auth/login
// @access      Public
exports.login = AsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Create token
    const token = user.getSignedJwtToken();

    let response = {
        "code": 200,
        "status": true,
        "message": "success",
        token
    }

    res.status(response['code']).json((response))
});
