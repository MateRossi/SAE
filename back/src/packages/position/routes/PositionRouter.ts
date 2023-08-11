import express from 'express';
import { positionController } from '../controller/PositionController';
//import auth token

const positionRouter = express.Router();

positionRouter.get('/', positionController.getAllPositions);
positionRouter.get('/:id', positionController.getPositionById);
positionRouter.post('/', positionController.createPosition);
positionRouter.put('/:id', positionController.updatePosition);
positionRouter.delete('/:id', positionController.deletePosition);

export default positionRouter;