import { ModalityService } from "../service/ModalityService";
import { Request, Response } from 'express';

export const modalityController = {
    async getAllModalities(req: Request, res: Response) {
        try {
            const modalities = await ModalityService.getAllModalities();
            res.json(modalities);
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor', details: JSON.stringify(error) });
        };
    },

    async getModalityById(req: Request, res: Response) {
        const modalityId = Number(req.params.id);
        try {
            const modality = await ModalityService.getModalityById(modalityId);
            res.json(modality);
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor.', details: JSON.stringify(error) });
        };
    },

    async createModality(req: Request, res: Response) {
        const modalityData = req.body;
        try {
            const newModality = await ModalityService.createModality(modalityData);
            res.status(201).json({ newModality, msg: 'Modalidade criada.' });
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor.', details: JSON.stringify(error) });
        };
    },

    async updateModality(req: Request, res: Response) {
        const modalityId = Number(req.params.id);
        const modalityData = req.body;
        try {
            const updatedModality = await ModalityService.updateModality(modalityId, modalityData);
            res.json({ updatedModality, msg: 'Modalidade atualizada.' });
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor.', details: JSON.stringify(error) });
        };
    },

    async deleteModality(req: Request, res: Response) {
        const modalityId = Number(req.params.id);
        try {
            await ModalityService.deleteModality(modalityId);
            res.status(200).json({ msg: 'Modalidade deletada.' }).end();
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor.', details: JSON.stringify(error) });
        };
    },
};