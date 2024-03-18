import express from 'express';
const router = express.Router();

//COURSES
import modalityRouter from './packages/routes/ModalityRouter';
import courseRouter from './packages/routes/CourseRouter';

//GRADUATES
import graduateRouter from './packages/routes/GraduateRouter';

//COMPANIES
import companyRouter from './packages/routes/CompanyRouter';

//SURVEYS
import surveyRouter from './packages/routes/SurveyRouter';

//ADMINS
import adminRouter from './packages/routes/AdminRouter';

//ZIPCODE
import zipCodeRouter from './packages/routes/ZipCodeRouter';

//Reviews
import reviewRouter from './packages/routes/ReviewRouter';

//###################################### - - #############

//COURSES
router.use('/modalities', modalityRouter);
router.use('/courses', courseRouter);

//GRADUATES
router.use('/graduates', graduateRouter);

//COMPANIES
router.use('/companies', companyRouter);

//SURVEYS
router.use('/surveys', surveyRouter);

//ADMINS
router.use('/admins', adminRouter);

//ZIPCODE
router.use("/zipCode", zipCodeRouter);

//REVIEWS
router.use('/reviews', reviewRouter);

export default router;