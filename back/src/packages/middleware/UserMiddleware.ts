import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { environment } from '../../env/env.local';

function userToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido.' });
    };

    const tokenWithoutBearer = token.replace('Bearer ', '');

    jwt.verify(tokenWithoutBearer, environment.jwtSecret, (err: any, decoded: any) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido.' });
        };
        next();
    });
};

export default userToken;