import express from 'express';
import { ExternalCourseController } from '../controller/ExternalCourseController';
//import auth token

const externalCourseRouter = express.Router();

externalCourseRouter.get('/', ExternalCourseController.getAllExternalCourses);
externalCourseRouter.get('/:id', ExternalCourseController.getExternalCourseById);
externalCourseRouter.post('/', ExternalCourseController.createExternalCourse);
externalCourseRouter.put('/:id', ExternalCourseController.updateExternalCourse);
externalCourseRouter.delete('/:id', ExternalCourseController.deleteExternalCourse);

export default externalCourseRouter;