import express from 'express';
import { companyController } from '../controller/CompanyController';
import verifyRoles from '../middleware/verifyRoles';

const companyRouter = express.Router();

companyRouter.get('/', verifyRoles('graduate', 'admin'), companyController.getAllCompanies);
companyRouter.get('/:id', verifyRoles('graduate', 'admin'), companyController.getCompanyById);
companyRouter.post('/', verifyRoles('admin'), companyController.createCompany);
companyRouter.put('/:id', verifyRoles('admin'), companyController.updateCompany);
companyRouter.delete('/:id', verifyRoles('admin'), companyController.deleteCompany);

export default companyRouter;