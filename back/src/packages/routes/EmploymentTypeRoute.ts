import express from 'express';
import { employmentTypeController } from '../controller/EmploymentTypeController';
//import auth token

const employmentTypeRouter = express.Router();

employmentTypeRouter.get('/', employmentTypeController.getAllEmploymentTypes);
employmentTypeRouter.get('/:id', employmentTypeController.getEmploymentTypeById);
employmentTypeRouter.post('/', employmentTypeController.createEmploymentType);
employmentTypeRouter.put('/:id', employmentTypeController.updateEmploymentType);
employmentTypeRouter.delete('/:id', employmentTypeController.deleteEmploymentType);

export default employmentTypeRouter;