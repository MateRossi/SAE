import express from 'express';
import { courseController } from '../controller/CourseController';
import verifyRoles from '../middleware/verifyRoles';

const courseRouter = express.Router();

//courseRouter.get('/', verifyRoles('graduate', 'admin'),  courseController.getAllCourses);
courseRouter.get('/:id', verifyRoles('graduate', 'admin'),  courseController.getCourseById);
courseRouter.post('/', courseController.createCourse);
courseRouter.put('/:id', verifyRoles('admin'), courseController.updateCourse);
courseRouter.delete('/:id', verifyRoles('admin'), courseController.deleteCourse);

export default courseRouter;