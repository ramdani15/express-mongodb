const express = require('express');

const router = express.Router();

// include other resource
const courseRouter = require('./courses');
// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

const { getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp, bootcampPhotoUplaod } = require('../controllers/bootcamps');

const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middlewares/advancedResults')

router.use('/:id/photo', bootcampPhotoUplaod);

router
    .route('/')
    .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
    .post(createBootcamp);

router
    .route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);

module.exports = router;