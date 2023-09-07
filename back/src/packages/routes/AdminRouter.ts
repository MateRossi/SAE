import express from 'express';
import { adminController } from '../controller/AdminController';
import adminToken from '../middleware/AdminMiddleware';

const adminRouter = express.Router();

adminRouter.get('/', adminToken('admin'), adminController.getAllAdmins);
adminRouter.get('/:id', adminToken('admin'), adminController.getAdminById);
adminRouter.post('/', adminToken('admin'), adminController.createAdmin);
adminRouter.put('/:id', adminToken('admin'), adminController.updateAdmin);
adminRouter.delete('/:id', adminToken('admin'), adminController.deleteAdmin);
adminRouter.post('/login', adminController.loginAdmin);

export default adminRouter;