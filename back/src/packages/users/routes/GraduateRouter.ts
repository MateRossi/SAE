import express from 'express';
import { graduateController } from '../../users/controller/GraduateController';
import authenticateToken from '../middleware/GraduateMiddleware';
//import auth token

const graduateRouter = express.Router();

graduateRouter.get('/', authenticateToken, graduateController.getAllGraduates);
graduateRouter.get('/:id', authenticateToken, graduateController.getGraduateById);
graduateRouter.post('/', graduateController.createGraduate);
graduateRouter.put('/:id', authenticateToken, graduateController.updateGraduate);
graduateRouter.delete('/:id', authenticateToken, graduateController.deleteGraduate);
graduateRouter.post('/login', graduateController.loginGraduate);

export default graduateRouter;