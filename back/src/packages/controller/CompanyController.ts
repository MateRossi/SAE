import { ErrorResponse } from "../utilities/Error/ErrorResponse";
import { CompanyService } from "../service/CompanyService";
import { Request, Response } from 'express';

export const companyController = {
    async getAllCompanies(req: Request, res: Response) {
        try {
            const companies = await CompanyService.getAllCompanies();
            res.json(companies);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async getCompanyById(req: Request, res: Response) {
        try {
            const companyId = Number(req.params.id);
            const company = await CompanyService.getCompanyById(companyId);
            res.json(company);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async createCompany(req: Request, res: Response) {
        try {
            const companyData = req.body;
            const newCompany = await CompanyService.createCompany(companyData);
            res.status(201).json({ newCompany, msg: 'Empresa criada.' });
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async updateCompany(req: Request, res: Response) {
        try {
            const companyId = Number(req.params.id);
            const companyData = req.body;
            const updatedCompany = await CompanyService.updateCompany(companyId, companyData);
            res.json({ updatedCompany, msg: 'Empresa atualizada.' });
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async deleteCompany(req: Request, res: Response) {
        try {
            const companyId = Number(req.params.id);
            await CompanyService.deleteCompany(companyId);
            res.status(200).json({ msg: 'Empresa deletada.' }).end();
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },
};