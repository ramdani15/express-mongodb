const express = require('express');

const router = express.Router();

// include other resource
const courseRouter = require('./courses');
// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

const { getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp } = require('../controllers/bootcamps');

router
    .route('/')
    .get(getBootcamps)
    .post(createBootcamp);

router
    .route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);

module.exports = router;