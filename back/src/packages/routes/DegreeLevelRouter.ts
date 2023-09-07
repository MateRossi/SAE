import express from 'express';
import { degreeLevelController } from '../controller/DegreeLevelController';
import userToken from '../middleware/UserMiddleware';
import adminToken from '../middleware/AdminMiddleware';

const degreeLevelRouter = express.Router();

degreeLevelRouter.get('/', userToken, degreeLevelController.getAllDegreeLevels);
degreeLevelRouter.get('/:id', userToken, degreeLevelController.getDegreeLevelById);
degreeLevelRouter.post('/', adminToken('admin'), degreeLevelController.createDegreeLevel);
degreeLevelRouter.put('/:id', adminToken('admin'), degreeLevelController.updateDegreeLevel);
degreeLevelRouter.delete('/:id', adminToken('admin'), degreeLevelController.deleteDegreeLevel);

export default degreeLevelRouter;