import express from 'express';
const router = express.Router();

//COURSES
import modalityRouter from '../packages/course/routes/ModalityRouter';
import courseRouter from '../packages/course/routes/CourseRouter';
//CRM


//GED


//COURSES
router.use('/modalities', modalityRouter);
router.use('/courses', courseRouter);
//CRM


//GED

export default router;