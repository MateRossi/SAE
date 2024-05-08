import express from 'express';
import { courseController } from '../controller/CourseController';

const courses = express.Router();

courses.get('/', courseController.getAllCourses);

export default courses;