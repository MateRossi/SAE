import express from 'express';
import { ExternalCourseController } from '../controller/ExternalCourseController';
import userToken from '../middleware/UserMiddleware';
import adminToken from '../middleware/AdminMiddleware';

const externalCourseRouter = express.Router();

externalCourseRouter.get('/', userToken, ExternalCourseController.getAllExternalCourses);
externalCourseRouter.get('/:id', userToken, ExternalCourseController.getExternalCourseById);
externalCourseRouter.post('/', userToken, ExternalCourseController.createExternalCourse);
externalCourseRouter.put('/:id', adminToken('admin'), ExternalCourseController.updateExternalCourse);
externalCourseRouter.delete('/:id', adminToken('admin'), ExternalCourseController.deleteExternalCourse);

export default externalCourseRouter;