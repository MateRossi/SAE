import express from 'express';
const router = express.Router();

//COURSES
import modalityRouter from './packages/routes/ModalityRouter';
import courseRouter from './packages/routes/CourseRouter';

//GRADUATES
import graduateRouter from './packages/routes/GraduateRouter';

//POSITIONS
import employmentTypeRouter from './packages/routes/EmploymentTypeRoute';
import positionRouter from './packages/routes/PositionRouter';

//COMPANIES
import companyRouter from './packages/routes/CompanyRouter';

//EDUCATION
import degreeLevelRouter from './packages/routes/DegreeLevelRouter';
import externalCourseRouter from './packages/routes/ExternalCourseRouter';

//SURVEYS
import surveyRouter from './packages/routes/SurveyRouter';

//ADMINS
import adminRouter from './packages/routes/AdminRouter';

//ZIPCODE
import zipCodeRouter from './packages/routes/ZipCodeRouter';

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

//ZIPCODE
router.use("/zipCode", zipCodeRouter);

export default router;