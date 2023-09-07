import { ErrorResponse } from "../utilities/Error/ErrorResponse";
import { DegreeLevelService } from "../service/DegreeLevelService";
import { Request, Response } from 'express';

export const degreeLevelController = {
    async getAllDegreeLevels(req: Request, res: Response) {
        try {
            const degreeLevels = await DegreeLevelService.getAllDegreeLevels();
            res.json(degreeLevels);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async getDegreeLevelById(req: Request, res: Response) {
        try {
            const degreeLevelId = Number(req.params.id);
            const degreeLevel = await DegreeLevelService.getDegreeLevelById(degreeLevelId);
            res.json(degreeLevel);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async createDegreeLevel(req: Request, res: Response) {
        try {
            const degreeLevelData = req.body;
            const newDegreeLevel = await DegreeLevelService.createDegreeLevel(degreeLevelData);
            res.status(201).json({ newDegreeLevel, msg: 'Tipo de nível de escolaridade criado.' });
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async updateDegreeLevel(req: Request, res: Response) {
        try {
            const degreeLevelId = Number(req.params.id);
            const degreeLevelData = req.body;
            const updatedDegreeLevel = await DegreeLevelService.updateDegreeLevel(degreeLevelId, degreeLevelData);
            res.json({ updatedDegreeLevel, msg: 'Tipo de nível de escolaridade atualizado.' });
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async deleteDegreeLevel(req: Request, res: Response) {
        try {
            const degreeLevelId = Number(req.params.id);
            await DegreeLevelService.deleteDegreeLevel(degreeLevelId);
            res.status(200).json({ msg: 'Tipo de nível de escolaridade deletado.' }).end();
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },
};