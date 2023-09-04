import express from 'express';
import { adminController } from '../../users/controller/AdminController';
//import auth token

const adminRouter = express.Router();

adminRouter.get('/', adminController.getAllAdmins);
adminRouter.get('/:id', adminController.getAdminById);
adminRouter.post('/', adminController.createAdmin);
adminRouter.put('/:id', adminController.updateAdmin);
adminRouter.delete('/:id', adminController.deleteAdmin);

export default adminRouter;