import { Response } from 'express';
import { NotFoundError } from './NotFoundError';
import { ServerError } from './ServerError';

export  class ErrorResponse {
    static handleErrorResponse(error: any, res: Response) {
        const err = error as Error;
        if (err instanceof NotFoundError) {
            res.status(404).json({ error: err.message });
        } else if (error instanceof ServerError) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
        };
    };
};