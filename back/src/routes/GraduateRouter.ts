import express from 'express';
import { graduateController } from '../controller/GraduateController';
import graduateToken from '../middleware/GraduateMiddleware';
//import auth token

const graduateRouter = express.Router();

//ALTERAR PARA QUE O ADMIN TAMBÉM POSSA ALTERAR, OBTER E DELETAR.

graduateRouter.get('/', graduateController.getAllGraduates);
graduateRouter.get('/:id', graduateController.getGraduateById);
graduateRouter.post('/', graduateController.createGraduate);
graduateRouter.put('/:id', graduateToken, graduateController.updateGraduate);
graduateRouter.delete('/:id', graduateToken, graduateController.deleteGraduate);
graduateRouter.post('/login', graduateController.loginGraduate);
graduateRouter.get('/:id/same-course', graduateController.getGraduatesSameCourse);

export default graduateRouter;