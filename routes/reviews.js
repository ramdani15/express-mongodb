const express = require('express');
const router = express.Router({ mergeParams: true });
const { authorize, protect } = require('../middlewares/auth');
const { getReviews } = require('../controllers/reviews');

const Review = require('../models/Review');
const advancedResults = require('../middlewares/advancedResults')

router
    .route('/')
    .get(advancedResults(Review, {
        path: 'review',
        select: 'title rating'
    }), getReviews);

module.exports = router;