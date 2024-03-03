const express = require('express')
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const catchAsync = require('../Utils/catchAsync')
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware.js')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })

const ExpressError = require('../Utils/ExpressError')
const Campground = require('../models/campground')

// router (express) helps us define prefixes elsewhere
// router.route alows us to group different verbs (get,post) for the same route
router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))


router.get('/new', isLoggedIn, campgrounds.renderNewForm)

// order matters, first /campgrounds/new, then /campgrounds/:id

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))



module.exports = router


