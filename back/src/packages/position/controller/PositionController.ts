import { PositionService } from "../service/PositionService";
import { Request, Response } from 'express';

//HERE
function errorDetails (error: any) {
    const details = {
        name: error.name,
        message: error.message,
        stack: error.stack,
    }
    return details;
}

export const positionController = {
    async getAllPositions(req: Request, res: Response) {
        try {
            const positions = await PositionService.getAllPositions();
            res.json(positions);
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor', details: JSON.stringify(error) });
        };
    },

    async getPositionById(req: Request, res: Response) {
        const positionId = Number(req.params.id);
        try {
            const position = await PositionService.getPositionById(positionId);
            res.json(position);
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor.', details: JSON.stringify(error) });
        };
    },

    async createPosition(req: Request, res: Response) {
        const positionData = req.body;
        try {
            const newPosition = await PositionService.createPosition(positionData);
            res.status(201).json({ newPosition, msg: 'Cargo criado.' });
        } catch (error: any) {
            //HERE
            res.status(500).json({ error: 'Erro interno do servidor.', details: JSON.stringify(errorDetails(error)) });
        };
    },

    async updatePosition(req: Request, res: Response) {
        const positionId = Number(req.params.id);
        const positionData = req.body;
        try {
            const updatedPosition = await PositionService.updatePosition(positionId, positionData);
            res.json({ updatedPosition, msg: 'Cargo atualizado.' });
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor.', details: JSON.stringify(error) });
        };
    },

    async deletePosition(req: Request, res: Response) {
        const positionId = Number(req.params.id);
        try {
            await PositionService.deletePosition(positionId);
            res.status(200).json({ msg: 'Cargo deletado' }).end();
        } catch (error: any) {
            //HERE
            res.status(500).json({ error: 'Erro interno do servidor.', details: JSON.stringify(errorDetails(error)) });
        };
    },
};