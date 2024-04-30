import { Response } from 'express';
import { NotFoundError } from './NotFoundError';
import { ServerError } from './ServerError';
import { UniqueConstraintError, ValidationError } from 'sequelize';

export  class ErrorResponse {
    static handleErrorResponse(error: any, res: Response) {
        const err = error as Error;
        if (err instanceof NotFoundError) {
            res.status(404).json({ error: err.message });
        } else if (error instanceof ServerError) {
            res.status(500).json({ error: err.message });
        } else if (error instanceof UniqueConstraintError) {
            const table = error.message.match(/[A-Za-z]+(?:_)/);
            const field = error.message.match(/(?:_)[A-Za-z]+(?:_)/);
            res.status(409).json({ error: `O valor ${field} providenciado já existe em ${table}` })
        } else if (error instanceof ValidationError) {
            res.status(409).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
        };
    };
};