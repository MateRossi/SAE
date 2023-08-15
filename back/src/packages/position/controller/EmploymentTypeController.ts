import { ErrorResponse } from "../../utilities/Error/ErrorResponse";
import { EmploymentTypeService } from "../service/EmploymentTypeService";
import { Request, Response } from 'express';

export const employmentTypeController = {
    async getAllEmploymentTypes(req: Request, res: Response) {
        try {
            const employmentTypes = await EmploymentTypeService.getAllEmploymentTypes();
            res.json(employmentTypes);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async getEmploymentTypeById(req: Request, res: Response) {
        try {
            const employmentTypeId = Number(req.params.id);
            const employmentType = await EmploymentTypeService.getEmploymentTypeById(employmentTypeId);
            res.json(employmentType);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async createEmploymentType(req: Request, res: Response) {
        try {
            const employmentTypeData = req.body;
            const newEmploymentType = await EmploymentTypeService.createEmploymentType(employmentTypeData);
            res.status(201).json({ newEmploymentType, msg: 'Tipo de vínculo empregatício criado.' });
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async updateEmploymentType(req: Request, res: Response) {
        try {
            const employmentTypeId = Number(req.params.id);
            const employmentTypeData = req.body;
            const updatedEmploymentType = await EmploymentTypeService.updateEmploymentType(employmentTypeId, employmentTypeData);
            res.json({ updatedEmploymentType, msg: 'Tipo de vínculo empregatício atualizado.' });
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async deleteEmploymentType(req: Request, res: Response) {
        try {
            const employmentTypeId = Number(req.params.id);
            await EmploymentTypeService.deleteEmploymentType(employmentTypeId);
            res.status(200).json({ msg: 'Tipo de vínculo empregatício deletado.' }).end();
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },
};