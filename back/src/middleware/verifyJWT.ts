import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    email?: string;
    role?: string;
}

const verifyJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || req.headers.Authorization as string;

    console.log("Auth header", authHeader);

    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.JWT_SECRET as string,
        (err: any, decoded: any) => {
            if (err) return res.sendStatus(403);
            if (decoded?.UserInfo) {
                req.email = decoded.UserInfo.email;
                req.role = decoded.UserInfo.role;
            }
            next();
        }
    );
}

export default verifyJWT;