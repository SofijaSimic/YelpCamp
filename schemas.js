const BaseJoi = require('joi')
const sanitizeHtml = require('sanitize-html')
// joi is a javascript validator tool; you define a schema for some data; 
// so we can validate data through our schema (if campground 
// is there as an object, or title is a string...)
//  it is validation on the server side



const extension = (joi) => ({
type: 'string',
base: joi.string(),
messages: {
'string.escapeHTML': '{{#label}} must not include HTML!'},
rules: {
escapeHTML: {
validate(value, helpers){
const clean = sanitizeHtml(value, {
allowedTags: [],
allowedAttributes: {},

});
if(clean!== value) return helpers.error('string.escapeHTML',{ value })
return clean;
}
}
}
})


const Joi = BaseJoi.extend(extension)

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required().escapeHTML(),
        price: Joi.number().required().min(0),
        // image: Joi.string().required(),
        location: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML()


    }).required(),
    // we're saying, we expect it to be an object, and a string, and a number,
    //  and to be required
    deleteImages: Joi.array()
})

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required().escapeHTML()
    }).required()
})