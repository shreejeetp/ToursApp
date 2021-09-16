const express = require('express');

const {
  getAllTours,
  getTour,
  postTour,
  deleteTour,
} = require('./../controllers/tourController');

const tourRouter = express.Router();
tourRouter.route('/').get(getAllTours).post(postTour);
tourRouter.route('/:id').get(getTour).delete(deleteTour);

module.exports = tourRouter;
