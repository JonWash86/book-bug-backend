const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  volume: String,
  reviewer: String,
  number: String
});

reviewSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject._v;
  },
});

module.exports = mongoose.model('Review', reviewSchema);
