import express from 'express';
const router = express.Router();

//COURSES
import modalityRouter from './src/routes/ModalityRouter';
import courseRouter from './src/routes/CourseRouter';

//GRADUATES
import graduateRouter from './src/routes/GraduateRouter';

//COMPANIES
import companyRouter from './src/routes/CompanyRouter';

//SURVEYS
import surveyRouter from './src/routes/SurveyRouter';

//ADMINS
import adminRouter from './src/routes/AdminRouter';

//ZIPCODE
import zipCodeRouter from './src/routes/ZipCodeRouter';

//Reviews
import reviewRouter from './src/routes/ReviewRouter';

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