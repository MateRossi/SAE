import express from 'express';
import { modalityController } from '../controller/ModalityController';
import adminToken from '../middleware/AdminMiddleware';

const modalityRouter = express.Router();

modalityRouter.get('/', modalityController.getAllModalities);
modalityRouter.get('/:id', modalityController.getModalityById);
modalityRouter.post('/', adminToken('admin'), modalityController.createModality);
modalityRouter.put('/:id', adminToken('admin'), modalityController.updateModality);
modalityRouter.delete('/:id', adminToken('admin'), modalityController.deleteModality);

export default modalityRouter;