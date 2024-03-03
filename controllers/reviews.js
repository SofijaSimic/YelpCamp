const Campground = require('../models/campground')
const Review = require('../models/review')

module.exports.createReview = async (req, res) => {
    // To access the value of the “:id” parameter, you can use req.params.id 
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    // when auth succeeds (isLoggedIn), the req.user property is set (by passport)
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Created new review!')
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    // $pull operator pulls from the reviews array where you have reviewId
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    // To access the value of the “:reviewId” parameter, you can use req.params.reviewId 
    // which is destructured above
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review!')
    res.redirect(`/campgrounds/${id}`)
}