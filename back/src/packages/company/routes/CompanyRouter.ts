import express from 'express';
import { companyController } from '../controller/CompanyController';
//import auth token

const companyRouter = express.Router();

companyRouter.get('/', companyController.getAllCompanies);
companyRouter.get('/:id', companyController.getCompanyById);
companyRouter.post('/', companyController.createCompany);
companyRouter.put('/:id', companyController.updateCompany);
companyRouter.delete('/:id', companyController.deleteCompany);

export default companyRouter;