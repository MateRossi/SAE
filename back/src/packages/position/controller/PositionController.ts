import { PositionService } from "../service/PositionService";
import { Request, Response } from 'express';
import { ErrorResponse } from '../../utilities/Error/ErrorResponse';

export const positionController = {
    async getAllPositions(req: Request, res: Response) {
        try {
            const positions = await PositionService.getAllPositions();
            res.json(positions);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async getPositionById(req: Request, res: Response) {
        try {
            const positionId = Number(req.params.id);
            const position = await PositionService.getPositionById(positionId);
            res.json(position);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async createPosition(req: Request, res: Response) {
        try {
            const positionData = req.body;
            const newPosition = await PositionService.createPosition(positionData);
            res.status(201).json({ newPosition, msg: 'Cargo criado.' });
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async updatePosition(req: Request, res: Response) {
        try {
            const positionId = Number(req.params.id);
            const positionData = req.body;
            const updatedPosition = await PositionService.updatePosition(positionId, positionData);
            res.json({ updatedPosition, msg: 'Cargo atualizado.' });
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async deletePosition(req: Request, res: Response) {
        try {
            const positionId = Number(req.params.id);
            await PositionService.deletePosition(positionId);
            res.status(200).json({ msg: 'Cargo deletado' }).end();
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },
};