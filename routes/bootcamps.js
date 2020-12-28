const express = require('express');

const router = express.Router();

const { protect } = require('../middlewares/auth');

// include other resource
const courseRouter = require('./courses');
// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

const { getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp, bootcampPhotoUplaod } = require('../controllers/bootcamps');

const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middlewares/advancedResults')

router.route('/:id/photo').put(protect, bootcampPhotoUplaod);
// router.use('/:id/photo', bootcampPhotoUplaod);

router
    .route('/')
    .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
    .post(protect, createBootcamp);

router
    .route('/:id')
    .get(getBootcamp)
    .put(protect, updateBootcamp)
    .delete(protect, deleteBootcamp);

module.exports = router;