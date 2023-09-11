import express from 'express';
import { positionController } from '../controller/PositionController';
import userToken from '../middleware/UserMiddleware';

const positionRouter = express.Router();

positionRouter.get('/', userToken, positionController.getAllPositions);
positionRouter.get('/:id', userToken, positionController.getPositionById);
positionRouter.post('/', userToken, positionController.createPosition);

//egresso poderá alterar apenas o seu próprio cargo.
positionRouter.put('/:id', positionController.updatePosition);
positionRouter.delete('/:id', positionController.deletePosition);

export default positionRouter;