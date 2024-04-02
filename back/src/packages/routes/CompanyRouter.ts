import express from 'express';
import { companyController } from '../controller/CompanyController';
import userToken from '../middleware/UserMiddleware';
import adminToken from '../middleware/AdminMiddleware';

const companyRouter = express.Router();

companyRouter.get('/', userToken, companyController.getAllCompanies);
companyRouter.get('/:id', userToken, companyController.getCompanyById);
companyRouter.post('/', companyController.createCompany);
companyRouter.put('/:id', companyController.updateCompany);
companyRouter.delete('/:id', companyController.deleteCompany);

export default companyRouter;