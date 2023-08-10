import express from 'express';
import { graduateController } from '../../users/controller/GraduateController';
//import auth token

const graduateRouter = express.Router();

graduateRouter.get('/', graduateController.getAllGraduates);
graduateRouter.get('/:id', graduateController.getGraduateById);
graduateRouter.post('/', graduateController.createGraduate);
graduateRouter.put('/:id', graduateController.updateGraduate);
graduateRouter.delete('/:id', graduateController.deleteGraduate);

export default graduateRouter;