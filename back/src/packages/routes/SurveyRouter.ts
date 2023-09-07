import express from 'express';
import { surveyController } from '../controller/SurveyController';
//import auth token

const surveyRouter = express.Router();

surveyRouter.get('/', surveyController.getAllSurveys);
surveyRouter.get('/:id', surveyController.getSurveyById);
surveyRouter.post('/', surveyController.createSurvey);
surveyRouter.put('/:id', surveyController.updateSurvey);
surveyRouter.delete('/:id', surveyController.deleteSurvey);

export default surveyRouter;