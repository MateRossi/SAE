import { GraduateService } from "../service/GraduateService";
import { Request, Response } from 'express';

export const graduateController = {
    async getAllGraduates(req: Request, res: Response) {
        try {
            const graduates = await GraduateService.getAllGraduates();
            res.json(graduates);
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
        };
    },

    async getGraduateById(req: Request, res: Response) {
        const graduateId = Number(req.params.id);
        try {
            const graduate = await GraduateService.getGraduateById(graduateId);
            res.json(graduate);
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor.', details: error.message });
        };
    },

    async createGraduate(req: Request, res: Response) {
        const graduateData = req.body;
        try {
            const newGraduate = await GraduateService.createGraduate(graduateData);
            res.status(201).json(newGraduate);
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor.', details: error.message });
        };
    },

    async updateGraduate(req: Request, res: Response) {
        const graduateId = Number(req.params.id);
        const graduateData = req.body;
        try {
            const updatedGraduate = await GraduateService.updateGraduate(graduateId, graduateData);
            res.json(updatedGraduate);
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor.', details: error.message });
        };
    },

    async deleteGraduate(req: Request, res: Response) {
        const graduateId = Number(req.params.id);
        try {
            await GraduateService.deleteGraduate(graduateId);
            res.status(204).end();
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor.', details: error.message });
        };
    },
};