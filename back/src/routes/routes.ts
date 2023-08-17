import express from 'express';
const router = express.Router();

//COURSES
import modalityRouter from '../packages/course/routes/ModalityRouter';
import courseRouter from '../packages/course/routes/CourseRouter';

//GRADUATES
import graduateRouter from '../packages/users/routes/GraduateRouter';

//POSITIONS
import employmentTypeRouter from '../packages/position/routes/EmploymentTypeRoute';
import positionRouter from '../packages/position/routes/PositionRouter';

//COMPANIES
import companyRouter from '../packages/company/routes/CompanyRouter';

//COURSES
router.use('/modalities', modalityRouter);
router.use('/courses', courseRouter);

//GRADUATES
router.use('/graduates', graduateRouter);

//POSITIONS
router.use('/employmentTypes', employmentTypeRouter);
router.use('/positions', positionRouter);

//COMPANIES
router.use('/companies', companyRouter);

export default router;