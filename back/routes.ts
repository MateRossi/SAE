import express from 'express';
const router = express.Router();

//USERS
import userRouter from './src/routes/UserRouter';

//COURSES
import modalityRouter from './src/routes/ModalityRouter';
import courseRouter from './src/routes/CourseRouter';

//COMPANIES
import companyRouter from './src/routes/CompanyRouter';

//SURVEYS
import surveyRouter from './src/routes/SurveyRouter';


//Reviews
import reviewRouter from './src/routes/ReviewRouter';

//###################################### - - #############

//USERS
router.use('/users', userRouter);

//COURSES
router.use('/modalities', modalityRouter);
router.use('/courses', courseRouter);

//COMPANIES
router.use('/companies', companyRouter);

//SURVEYS
router.use('/surveys', surveyRouter);

//REVIEWS
router.use('/reviews', reviewRouter);

export default router;