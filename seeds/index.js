const mongoose = require('mongoose')
const cities = require('./cities')
// require cities
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground')
// .. - the two dots mean you go one directory back
const axios = require('axios')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"))
db.once('open', () => {
    console.log('Database connected')
})


const sample = (array) => array[Math.floor(Math.random() * array.length)]

// array[Math.floor(Math.random() * array.length)]
// to pick a random element from an array 

// call unsplash and return small image
async function seedImg() {
    try {
        const resp = await axios.get('https://api.unsplash.com/photos/random', {
            params: {
                client_id: '1cuohfzBQ3-lRNb37gfH7-OInYW30MeW7YNBQNTtWMc',
                collections: 1114848,
            },
        })
        return resp.data.urls.small
    } catch (err) {
        console.error(err)
    }
}

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        // we're using a random number to pick a city/ to make 50 new campgrounds
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // this is your user ID:
            author: '659dbebfdf69d104d7e9718c',
            location: `${cities[random1000].city}, ${cities[random1000].state} `,
            title: `${sample(descriptors)} ${sample(places)}`,

            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In sequi labore possimus? Hic, cum? Fuga cum inventore qui, atque eveniet cumque porro saepe? Illum, consectetur eius quis labore dolores odit!",
            price,
            geometry: { 
                type: 'Point', 
                coordinates: [ cities[random1000].longitude,
                               cities[random1000].latitude ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dscm4uflh/image/upload/v1705599303/YelpCamp/yo3scavqziwk0ofe0vcv.jpg',
                    filename: 'YelpCamp/yo3scavqziwk0ofe0vcv',
                },
                {
                    url: 'https://res.cloudinary.com/dscm4uflh/image/upload/v1705599304/YelpCamp/ps5w0s0fdkqxyggc2bme.jpg',
                    filename: 'YelpCamp/ps5w0s0fdkqxyggc2bme',
                }
            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
// you need to execute it
// and then, it is convenient to close the
// database connection right after it get connected, you don't really need it
// running, you just need the execution