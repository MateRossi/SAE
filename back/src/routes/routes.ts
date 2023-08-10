import express from 'express';
const router = express.Router();

//COURSES
import modalityRouter from '../packages/course/routes/ModalityRouter';
import courseRouter from '../packages/course/routes/CourseRouter';

//GRADUATES
import graduateRouter from '../packages/users/routes/GraduateRouter';

//GED


//COURSES
router.use('/modalities', modalityRouter);
router.use('/courses', courseRouter);
router.use('/graduates', graduateRouter);

//CRM


//GED

export default router;