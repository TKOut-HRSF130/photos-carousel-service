/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
const mongoose = require('mongoose');
const faker = require('faker');

mongoose.connect('mongodb://localhost/photo-gallery');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Successful connection to MongoDB!');
});

const RestaurantSchema = mongoose.Schema({
  name: String,
  id: Number,
  photos: [Object],
}, { versionKey: false });

const RestaurantModel = mongoose.model('Restaurant', RestaurantSchema);

const myWordList = [
  'Tristan Lobster Tails', 'Seared Pork Belly', 'Ahi Tuna Tartare',
  'Delmonico Steak', 'Baby Lobster', 'Bombay Sapphire Martini',
  'Fresh Diver Scallops', 'Carrot Cake', 'Prime Beef Sliders',
  'Alaskan King Crab Legs', 'Cajun Ribeye', 'Iceberg Wedge Salad', 'Key Lime Pie', 'Grouper Sandwich',
  'Creme Brulee', 'Brussel sprouts', 'Fresh Shucked Corn', 'Prime Rib Philly Cheesesteak',
  'Stone Crab Claws', 'Carpaccio di Bresaola', 'Lamb Chop Casserole',
];

const restaurantNames = [
  'Grill', 'Bar', 'Steakhouse',
  'Villa', 'Seafood', 'Pizza',
];

const categories = ['Food', 'Drink', 'Interior', 'Exterior', 'Atmosphere'];

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomPhotoUrl = () => {
  const bucketUrl = 'https://hrsf130-tkout-photo-gallery.s3.us-east-2.amazonaws.com/';
  const photoEndpoint = getRandomIntInclusive(1, 40).toString();
  return `${bucketUrl}${photoEndpoint}.png`;
};

const getRandomAvatarUrl = () => {
  const bucketUrl = 'https://hrsf130-tkout-photo-gallery.s3.us-east-2.amazonaws.com/Avatar_Images/';
  const photoEndpoint = getRandomIntInclusive(0, 12).toString();
  return `${bucketUrl}${photoEndpoint}.png`;
};

const generatePhotosArray = () => {
  const result = [];
  const length = 41;
  for (let i = 1; i < length; i += 1) {
    const photosObj = {};
    photosObj.photo_id = i;
    photosObj.description = faker.random.arrayElement(myWordList);
    photosObj.date = faker.date.past();
    photosObj.category = faker.random.arrayElement(categories);
    photosObj.user_id = faker.random.number();
    photosObj.user_avatar_path = getRandomAvatarUrl();
    const randomUrlPath = getRandomPhotoUrl();
    if (photosObj[randomUrlPath] === undefined) {
      photosObj.url_path = randomUrlPath;
    }
    result.push(photosObj);
  }
  return result;
};

const generateSeedData = () => {
  const seedData = [];
  for (let i = 1; i <= 100; i += 1) {
    const restaurant = {};
    restaurant.id = i;
    restaurant.name = `${faker.name.firstName()}'s ${faker.random.arrayElement(restaurantNames)}`;
    restaurant.photos = generatePhotosArray();
    seedData.push(restaurant);
  }
  return seedData;
};

// eslint-disable-next-line no-unused-vars
const seedData = () => {
  const dataArray = generateSeedData();
  RestaurantModel.insertMany(dataArray, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Successfully inserted Restaurants into MongoDB');
    }
  });
};

// seedData();

const gatherPhotos = () => {
  return RestaurantModel.find({}).exec();
};

module.exports = {
  RestaurantModel,
  gatherPhotos,
  db,
};
