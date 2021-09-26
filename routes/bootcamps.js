const express = require('express');

const router = express.Router();

const { authorize, protect } = require('../middlewares/auth');

// include other resource
const courseRouter = require('./courses');
const reviewRouter = require('./reviews');
// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);
router.use('/:bootcampId/reviews', reviewRouter);

const { getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp, bootcampPhotoUpload } = require('../controllers/bootcamps');

const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middlewares/advancedResults')

router.route('/:id/photo').put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);
// router.use('/:id/photo', bootcampPhotoUpload);

router
    .route('/')
    .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
    .post(protect, authorize('publisher', 'admin'), createBootcamp);

router
    .route('/:id')
    .get(getBootcamp)
    .put(protect, authorize('publisher', 'admin'), updateBootcamp)
    .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);

module.exports = router;