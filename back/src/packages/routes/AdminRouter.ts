import express from 'express';
import { adminController } from '../controller/AdminController';
import authenticateToken from '../middleware/AdminMiddleware';

const adminRouter = express.Router();

adminRouter.get('/', authenticateToken('admin'), adminController.getAllAdmins);
adminRouter.get('/:id', authenticateToken('admin'), adminController.getAdminById);
adminRouter.post('/', authenticateToken('admin'), adminController.createAdmin);
adminRouter.put('/:id', authenticateToken('admin'), adminController.updateAdmin);
adminRouter.delete('/:id', authenticateToken('admin'), adminController.deleteAdmin);
adminRouter.post('/login', adminController.loginAdmin);

export default adminRouter;