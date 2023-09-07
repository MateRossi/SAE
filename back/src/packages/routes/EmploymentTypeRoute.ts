import express from 'express';
import { employmentTypeController } from '../controller/EmploymentTypeController';
import adminToken from '../middleware/AdminMiddleware';

const employmentTypeRouter = express.Router();

employmentTypeRouter.get('/', employmentTypeController.getAllEmploymentTypes);
employmentTypeRouter.get('/:id', employmentTypeController.getEmploymentTypeById);
employmentTypeRouter.post('/', adminToken('admin'), employmentTypeController.createEmploymentType);
employmentTypeRouter.put('/:id', adminToken('admin'), employmentTypeController.updateEmploymentType);
employmentTypeRouter.delete('/:id', adminToken('admin'), employmentTypeController.deleteEmploymentType);

export default employmentTypeRouter;