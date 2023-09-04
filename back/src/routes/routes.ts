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

//EDUCATION
import degreeLevelRouter from '../packages/education/routes/DegreeLevelRouter';
import externalCourseRouter from '../packages/education/routes/ExternalCourseRouter';

//SURVEYS
import surveyRouter from '../packages/survey/routes/SurveyRouter';

//ADMINS
import adminRouter from '../packages/users/routes/AdminRouter';

//###################################### - - #############

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

//EDUCATION
router.use('/degreeLevels', degreeLevelRouter);
router.use('/externalCourses', externalCourseRouter);

//SURVEYS
router.use('/surveys', surveyRouter);

//ADMINS
router.use('/admins', adminRouter);

export default router;