/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
const mongoose = require('mongoose');

mongoose.connect('mongodb://172.17.0.2:27017/photo-gallery', {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
});

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

const gatherPhotos = (restaurantId) => {
  return RestaurantModel.find({ id: restaurantId }).exec();
};

module.exports = {
  RestaurantModel,
  gatherPhotos,
};
