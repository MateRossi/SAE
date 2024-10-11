import express from 'express';
import { modalityController } from '../controller/ModalityController';
import verifyRoles from '../middleware/verifyRoles';

const modalityRouter = express.Router();

modalityRouter.get('/', verifyRoles('graduate', 'admin'), modalityController.getAllModalities);
modalityRouter.get('/:id', verifyRoles('graduate', 'admin'), modalityController.getModalityById);
modalityRouter.post('/', verifyRoles('admin'), modalityController.createModality);
modalityRouter.put('/:id', verifyRoles('admin'), modalityController.updateModality);
modalityRouter.delete('/:id', verifyRoles('admin'), modalityController.deleteModality);

export default modalityRouter;