import express from 'express';
import { jobPostingController } from '../controller/JobPostingController';
import verifyRoles from '../middleware/verifyRoles';

const jobPostingRouter = express.Router();

jobPostingRouter.get('/', jobPostingController.getAllJobPostings);
jobPostingRouter.get('/:id', jobPostingController.getJobPostingById);
jobPostingRouter.post('/', verifyRoles('admin'), jobPostingController.createJobPosting);

export default jobPostingRouter;