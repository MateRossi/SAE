import { EmploymentTypeService } from "../service/EmploymentTypeService";
import { Request, Response } from 'express';

export const employmentTypeController = {
    async getAllEmploymentTypes(req: Request, res: Response) {
        try {
            const employmentTypes = await EmploymentTypeService.getAllEmploymentTypes();
            res.json(employmentTypes);
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
        };
    },

    async getEmploymentTypeById(req: Request, res: Response) {
        const employmentTypeId = Number(req.params.id);
        try {
            const employmentType = await EmploymentTypeService.getEmploymentTypeById(employmentTypeId);
            res.json(employmentType);
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor.', details: error.message });
        };
    },

    async createEmploymentType(req: Request, res: Response) {
        const employmentTypeData = req.body;
        try {
            const newEmploymentType = await EmploymentTypeService.createEmploymentType(employmentTypeData);
            res.status(201).json(newEmploymentType);
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor.', details: error.message });
        };
    },

    async updateEmploymentType(req: Request, res: Response) {
        const employmentTypeId = Number(req.params.id);
        const employmentTypeData = req.body;
        try {
            const updatedEmploymentType = await EmploymentTypeService.updateEmploymentType(employmentTypeId, employmentTypeData);
            res.json(updatedEmploymentType);
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor.', details: error.message });
        };
    },

    async deleteEmploymentType(req: Request, res: Response) {
        const employmentTypeId = Number(req.params.id);
        try {
            await EmploymentTypeService.deleteEmploymentType(employmentTypeId);
            res.status(204).end();
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor.', details: error.message });
        };
    },
};