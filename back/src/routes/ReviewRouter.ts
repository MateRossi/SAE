import express from 'express';
import { reviewController } from '../controller/ReviewController';
import verifyRoles from '../middleware/verifyRoles';
//import auth token

const reviewRouter = express.Router();

reviewRouter.get('/', verifyRoles('admin'), reviewController.getAllReviews);
reviewRouter.get('/:id', verifyRoles('graduate', 'admin'), reviewController.getReviewById);
reviewRouter.post('/', verifyRoles('graduate'), reviewController.createReview);
reviewRouter.put('/:id', verifyRoles('graduate'), reviewController.updateReview);
reviewRouter.delete('/:id', verifyRoles('admin'), reviewController.deleteReview);
reviewRouter.get("/graduates/:id", verifyRoles('graduate', 'admin'), reviewController.getReviewByUserId);

export default reviewRouter;
