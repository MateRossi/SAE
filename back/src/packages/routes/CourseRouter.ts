import express from 'express';
import { courseController } from '../controller/CourseController';
import adminToken from '../middleware/AdminMiddleware';

const courseRouter = express.Router();

courseRouter.get('/', courseController.getAllCourses);
courseRouter.get('/:id', courseController.getCourseById);
courseRouter.post('/', courseController.createCourse);
courseRouter.put('/:id', courseController.updateCourse);
courseRouter.delete('/:id', courseController.deleteCourse);

/*
courseRouter.post('/', adminToken('admin'), courseController.createCourse);
courseRouter.put('/:id', adminToken('admin'), courseController.updateCourse);
courseRouter.delete('/:id', adminToken('admin'), courseController.deleteCourse);
*/

export default courseRouter;