import { EmploymentTypeService } from "../service/EmploymentTypeService";
import { Request, Response } from 'express';

export const employmentTypeController = {
    async getAllEmploymentTypes(req: Request, res: Response) {
        try {
            const employmentTypes = await EmploymentTypeService.getAllEmploymentTypes();
            res.json(employmentTypes);
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor', details: JSON.stringify(error) });
        };
    },

    async getEmploymentTypeById(req: Request, res: Response) {
        const employmentTypeId = Number(req.params.id);
        try {
            const employmentType = await EmploymentTypeService.getEmploymentTypeById(employmentTypeId);
            res.json(employmentType);
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor.', details: JSON.stringify(error) });
        };
    },

    async createEmploymentType(req: Request, res: Response) {
        const employmentTypeData = req.body;
        try {
            const newEmploymentType = await EmploymentTypeService.createEmploymentType(employmentTypeData);
            res.status(201).json({ newEmploymentType, msg: 'Tipo de vínculo empregatício criado.' });
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor.', details: JSON.stringify(error) });
        };
    },

    async updateEmploymentType(req: Request, res: Response) {
        const employmentTypeId = Number(req.params.id);
        const employmentTypeData = req.body;
        try {
            const updatedEmploymentType = await EmploymentTypeService.updateEmploymentType(employmentTypeId, employmentTypeData);
            res.json({ updatedEmploymentType, msg: 'Tipo de vínculo empregatício atualizado.' });
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor.', details: JSON.stringify(error) });
        };
    },

    async deleteEmploymentType(req: Request, res: Response) {
        const employmentTypeId = Number(req.params.id);
        try {
            await EmploymentTypeService.deleteEmploymentType(employmentTypeId);
            res.status(200).json({ msg: 'Tipo de vínculo empregatício deletado.' }).end();
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor.', details: JSON.stringify(error) });
        };
    },
};