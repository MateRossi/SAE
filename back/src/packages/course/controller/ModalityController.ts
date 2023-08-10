import { ModalityService } from "../service/ModalityService";
import { Request, Response } from 'express';

export const modalityController = {
    async getAllModalities(req: Request, res: Response) {
        try {
            const modalities = await ModalityService.getAllModalities();
            res.json(modalities);
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
        };
    },

    async getModalityById(req: Request, res: Response) {
        const modalityId = Number(req.params.id);
        try {
            const modality = await ModalityService.getModalityById(modalityId);
            res.json(modality);
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor.', details: error.message });
        };
    },

    async createModality(req: Request, res: Response) {
        const modalityData = req.body;
        try {
            const newModality = await ModalityService.createModality(modalityData);
            res.status(201).json(newModality);
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor.', details: error.message });
        };
    },

    async updateModality(req: Request, res: Response) {
        const modalityId = Number(req.params.id);
        const modalityData = req.body;
        try {
            const updatedModality = await ModalityService.updateModality(modalityId, modalityData);
            res.json(updatedModality);
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor.', details: error.message });
        };
    },

    async deleteModality(req: Request, res: Response) {
        const modalityId = Number(req.params.id);
        try {
            await ModalityService.deleteModality(modalityId);
            res.status(204).end();
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor.', details: error.message });
        };
    },
};