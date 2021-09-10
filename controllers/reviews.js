const reviewsRouter = require('express').Router();
const Review = require('../models/review');

reviewsRouter.get('/', async (req, res) => {
  const auth = req.currentUser;
  if (auth){
    const reviews = await Review.find({});
    return res.json(reviews.map((review) => review.toJSON()));
  }
  return res.status(403).send('Not Authorized!');
});

reviewsRouter.post('/', (req, res) => {
  auth = req.currentUser;
  if (auth){
    const review = new Review(res.body);
    const savedReview = review.save();

    // console.log('authenticated!', auth)
    // return res.status('Hi, from within the reviews router POST');
    return res.status(201).json(savedReview);

  }
  return res.status(403).send('Not Authorized');
});

module.exports = reviewsRouter;
