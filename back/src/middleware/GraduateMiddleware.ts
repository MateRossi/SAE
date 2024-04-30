import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

function graduateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido.' });
    };

    const tokenWithoutBearer = token.replace('Bearer ', '');

    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET || 'SEAG@2024TTCCMR', (err: any, decoded: any) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido.' });
        };

        const graduateId = decoded.id;
        const requestedGraduateId = req.params.id;

        if (graduateId != requestedGraduateId) {
            return res.status(403).json({ message: 'Acesso não autorizado.' });
        }
        next();
    });
};

export default graduateToken;