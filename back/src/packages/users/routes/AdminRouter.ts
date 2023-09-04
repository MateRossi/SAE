import express from 'express';
import { adminController } from '../../users/controller/AdminController';
import authenticateToken from '../middleware/AdminMiddleware';

const adminRouter = express.Router();

adminRouter.get('/', authenticateToken('admin'), adminController.getAllAdmins);
adminRouter.get('/:id', authenticateToken, adminController.getAdminById);
adminRouter.post('/', authenticateToken, adminController.createAdmin);
adminRouter.put('/:id', authenticateToken, adminController.updateAdmin);
adminRouter.delete('/:id', authenticateToken, adminController.deleteAdmin);
adminRouter.post('/login', adminController.loginAdmin);

export default adminRouter;