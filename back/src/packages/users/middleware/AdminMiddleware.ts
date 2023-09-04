import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { environment } from '../../../env/env.local';

function authenticateToken(role: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ error: 'Token não fornecido.' });
        };

        const tokenWithoutBearer = token.replace('Bearer ', '');

        jwt.verify(tokenWithoutBearer, environment.jwtSecret, (err: any, decoded: any) => {
            if (err) {
                return res.status(403).json({ error: 'Token inválido.' });
            };

            const userRole = decoded.role;

            if (userRole !== role) {
                return res.status(403).json({ error: 'Acesso não autorizado.' });
            }
            next();
        });
    }
};

export default authenticateToken;