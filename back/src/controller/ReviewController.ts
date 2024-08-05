import { ErrorResponse } from '../errors/ErrorResponse';
import { ReviewService } from "../service/ReviewService";
import { Request, Response } from 'express';

export const reviewController = {
    async getAllReviews(req: Request, res: Response) {
        try {
            const reviews = await ReviewService.getAllReviews();
            res.json(reviews);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async getReviewById(req: Request, res: Response) {
        try {
            const reviewId = Number(req.params.id);
            const review = await ReviewService.getReviewById(reviewId);
            res.json(review);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async getReviewByUserId(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);
            const review = await ReviewService.getReviewByUserId(userId);
            res.json(review);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async createReview(req: Request, res: Response) {
        try {
            const reviewData = req.body;
            const newReview = await ReviewService.createReview(reviewData);
            res.status(201).json({ newReview, msg: 'Avaliação feita.' });
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async updateReview(req: Request, res: Response) {
        try {
            const reviewId = Number(req.params.id);
            const reviewData = req.body;
            const updatedReview = await ReviewService.updateReview(reviewId, reviewData);
            res.json({ updatedReview, msg: 'Avaliação atualizada.' });
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async deleteReview(req: Request, res: Response) {
        try {
            const reviewId = Number(req.params.id);
            await ReviewService.deleteReview(reviewId);
            res.status(200).json({ msg: 'Avaliação deletada.' }).end();
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },
};