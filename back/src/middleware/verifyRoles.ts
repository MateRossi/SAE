import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
    role?: string;
}

const verifyRoles = (...allowedRoles: Array<String>) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        console.log("REQUEST ROLE", req.role);
        console.log(allowedRoles);
        if (!req.role) {
            return res.sendStatus(403);
        }
        if (!allowedRoles.includes(req.role)) {
            console.log(allowedRoles.includes(req.role));
            return res.sendStatus(403);
        }
        next();
    };
};

export default verifyRoles;