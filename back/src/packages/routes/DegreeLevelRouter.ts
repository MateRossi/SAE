import express from 'express';
import { degreeLevelController } from '../controller/DegreeLevelController';
//import auth token

const degreeLevelRouter = express.Router();

degreeLevelRouter.get('/', degreeLevelController.getAllDegreeLevels);
degreeLevelRouter.get('/:id', degreeLevelController.getDegreeLevelById);
degreeLevelRouter.post('/', degreeLevelController.createDegreeLevel);
degreeLevelRouter.put('/:id', degreeLevelController.updateDegreeLevel);
degreeLevelRouter.delete('/:id', degreeLevelController.deleteDegreeLevel);

export default degreeLevelRouter;