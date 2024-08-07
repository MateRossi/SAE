import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

function userToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido.' });
    };

    const tokenWithoutBearer = token.replace('Bearer ', '');

    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET || 'SEAG@2024TTCCMR', (err: any, decoded: any) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido.' });
        };
        next();
    });
};

export default userToken;