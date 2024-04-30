import express from 'express';
import { reviewController } from '../controller/ReviewController';
//import auth token

const reviewRouter = express.Router();

reviewRouter.get('/', reviewController.getAllReviews);
reviewRouter.get('/:id', reviewController.getReviewById);
reviewRouter.post('/', reviewController.createReview);
reviewRouter.put('/:id', reviewController.updateReview);
reviewRouter.delete('/:id', reviewController.deleteReview);

export default reviewRouter;
