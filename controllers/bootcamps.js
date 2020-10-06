// @desc        Show all bootcamps
// @route       /api/v1/bootcamps
// @access      Public
exports.getBootcamps = (req, res, next) => {
    res.status(200).json(( {
        success: true,
        message: "Show all bootcamps"
    }))
}

// @desc        Create new bootcamp
// @route       /api/v1/bootcamps
// @access      Private
exports.createBootcamp = (req, res, next) => {
    res.status(200).json(( {
        success: true,
        message: "Create new bootcamp"
    }))
}

// @desc        Show bootcamp
// @route       /api/v1/bootcamps/:id
// @access      Public
exports.getBootcamp = (req, res, next) => {
    res.status(200).json(( {
        success: true,
        message: `Show bootcamp ${req.params.id}`
    }))
}

// @desc        Update bootcamp
// @route       /api/v1/bootcamps
// @access      Private
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json(( {
        success: true,
        message: `Update bootcamp ${req.params.id}`
    }))
}

// @desc        Delete bootcamp
// @route       /api/v1/bootcamps
// @access      Public
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json(( {
        success: true,
        message: `Delete bootcamp ${req.params.id}`
    }))
}