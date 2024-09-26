import express from 'express';
import { surveyController } from '../controller/SurveyController';
import verifyRoles from '../middleware/verifyRoles';
//import auth token

const surveyRouter = express.Router();

surveyRouter.get('/', verifyRoles('admin'), surveyController.getAllSurveys);
surveyRouter.get('/:id', verifyRoles('graduate', 'admin'), surveyController.getSurveyById);
surveyRouter.post('/', verifyRoles('graduate'), surveyController.createSurvey);
surveyRouter.put('/:id', verifyRoles('graduate'), surveyController.updateSurvey);
surveyRouter.delete('/:id', verifyRoles('admin'), surveyController.deleteSurvey);
surveyRouter.get("/graduates/:id", verifyRoles('graduate', 'admin'), surveyController.getSurveyByUserId);

export default surveyRouter;