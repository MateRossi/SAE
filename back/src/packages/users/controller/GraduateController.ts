import { GraduateService } from "../service/GraduateService";
import { Request, Response } from 'express';
import { ErrorResponse } from '../../utilities/Error/ErrorResponse';

export const graduateController = {
    async getAllGraduates(req: Request, res: Response) {
        try {
            const graduates = await GraduateService.getAllGraduates();
            res.json(graduates);
        } catch (error) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async getGraduateById(req: Request, res: Response) {
        try {
            const graduateId = Number(req.params.id);
            const graduate = await GraduateService.getGraduateById(graduateId);
            res.json(graduate);
        } catch (error) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async createGraduate(req: Request, res: Response) {
        const graduateData = req.body;
        try {
            const newGraduate = await GraduateService.createGraduate(graduateData);
            res.status(201).json({ newGraduate , msg: 'Egresso criado.'});
        } catch (error) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async updateGraduate(req: Request, res: Response) {
        try {
            const graduateId = Number(req.params.id);
            const graduateData = req.body;
            const updatedGraduate = await GraduateService.updateGraduate(graduateId, graduateData);
            res.json({ updatedGraduate, msg: 'Egresso atualizado.' });
        } catch (error) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async deleteGraduate(req: Request, res: Response) {
        try {
            const graduateId = Number(req.params.id);
            await GraduateService.deleteGraduate(graduateId);
            res.status(200).json({ msg: 'Egresso deletado.' }).end();
        } catch (error) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },
};