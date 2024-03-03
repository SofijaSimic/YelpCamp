const express = require('express')
const router = express.Router({ mergeParams: true });
// mergeParams, all the params from app.js are going to merge with params from
// this file, so we'll have access to the id ( prefix defined in app.js:
// (app.use('/campgrounds/:id/reviews', reviews)) 
// you don't need this in campground.js 

const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')
const Campground = require('../models/campground')
const Review = require('../models/review')
const reviews = require('../controllers/reviews')
const ExpressError = require('../Utils/ExpressError')
const catchAsync = require('../Utils/catchAsync')



router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router