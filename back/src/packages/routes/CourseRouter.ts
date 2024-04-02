import express from 'express';
import { courseController } from '../controller/CourseController';
import adminToken from '../middleware/AdminMiddleware';

const courseRouter = express.Router();

courseRouter.get('/', courseController.getAllCourses);
courseRouter.get('/:id', courseController.getCourseById);
courseRouter.post('/', courseController.createCourse);
courseRouter.put('/:id', courseController.updateCourse);
courseRouter.delete('/:id', courseController.deleteCourse);

export default courseRouter;