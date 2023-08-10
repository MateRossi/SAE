import express from 'express';
import { modalityController } from '../controller/ModalityController';
//import auth token

const modalityRouter = express.Router();

modalityRouter.get('/', modalityController.getAllModalities);
modalityRouter.get('/:id', modalityController.getModalityById);
modalityRouter.post('/', modalityController.createModality);
modalityRouter.put('/:id', modalityController.updateModality);
modalityRouter.delete('/:id', modalityController.deleteModality);

export default modalityRouter;