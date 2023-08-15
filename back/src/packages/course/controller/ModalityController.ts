import { ErrorResponse } from "../../utilities/Error/ErrorResponse";
import { ModalityService } from "../service/ModalityService";
import { Request, Response } from 'express';

export const modalityController = {
    async getAllModalities(req: Request, res: Response) {
        try {
            const modalities = await ModalityService.getAllModalities();
            res.json(modalities);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async getModalityById(req: Request, res: Response) {
        try {
            const modalityId = Number(req.params.id);
            const modality = await ModalityService.getModalityById(modalityId);
            res.json(modality);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async createModality(req: Request, res: Response) {
        try {
            const modalityData = req.body;
            const newModality = await ModalityService.createModality(modalityData);
            res.status(201).json({ newModality, msg: 'Modalidade criada.' });
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async updateModality(req: Request, res: Response) {
        try {
            const modalityId = Number(req.params.id);
            const modalityData = req.body;
            const updatedModality = await ModalityService.updateModality(modalityId, modalityData);
            res.json({ updatedModality, msg: 'Modalidade atualizada.' });
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async deleteModality(req: Request, res: Response) {
        try {
            const modalityId = Number(req.params.id);
            await ModalityService.deleteModality(modalityId);
            res.status(200).json({ msg: 'Modalidade deletada.' }).end();
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },
};