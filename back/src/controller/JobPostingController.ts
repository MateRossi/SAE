import { Request, Response } from "express";
import { ErrorResponse } from "../errors/ErrorResponse";
import { JobPostingService } from "../service/JobPostingService";

export const jobPostingController = {
    async getAllJobPostings(req: Request, res: Response) {
        try {
            const jobPostings = await JobPostingService.getAllJobPostings();
            res.json(jobPostings);
        } catch (err) {
            ErrorResponse.handleErrorResponse(err, res);
        }
    },

    async getJobPostingById(req: Request, res: Response) {
        try {
            const jobPostingId = Number(req.params.id);
            const jobPosting = await JobPostingService.getJobPostingById(jobPostingId);
            res.json(jobPosting);
        } catch (err) {
            ErrorResponse.handleErrorResponse(err, res);
        }
    },

    async createJobPosting(req: Request, res: Response) {
        try {
            const jobPostingData = req.body.jobPosting;
            const courseoIds = req.body.courseIds;
            const newJobPosting = await JobPostingService.createJobPosting(jobPostingData, courseoIds);
            res.json(newJobPosting);
        } catch (err) {
            ErrorResponse.handleErrorResponse(err, res);
        }
    },
}