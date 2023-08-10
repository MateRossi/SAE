import express from 'express';
const router = express.Router();

//COURSES
import modalityRouter from '../packages/course/routes/ModalityRouter';
import courseRouter from '../packages/course/routes/CourseRouter';

//GRADUATES
import graduateRouter from '../packages/users/routes/GraduateRouter';

//POSITIONS
import employmentTypeRouter from '../packages/position/routes/EmploymentTypeRoute';

//COURSES
router.use('/modalities', modalityRouter);
router.use('/courses', courseRouter);

//GRADUATES
router.use('/graduates', graduateRouter);

//POSITIONS
router.use('/employmentTypes', employmentTypeRouter);

export default router;