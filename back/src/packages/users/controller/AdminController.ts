import { AdminService } from "../service/AdminService";
import { Request, Response } from 'express';
import { ErrorResponse } from '../../utilities/Error/ErrorResponse';

export const adminController = {
    async getAllAdmins(req: Request, res: Response) {
        try {
            const admins = await AdminService.getAllAdmins();
            res.json(admins);
        } catch (error) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async getAdminById(req: Request, res: Response) {
        try {
            const adminId = Number(req.params.id);
            const admin = await AdminService.getAdminById(adminId);
            res.json(admin);
        } catch (error) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async createAdmin(req: Request, res: Response) {
        const adminData = req.body;
        try {
            const newAdmin = await AdminService.createAdmin(adminData);
            res.status(201).json({ newAdmin , msg: 'Admin criado.'});
        } catch (error) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async updateAdmin(req: Request, res: Response) {
        try {
            const adminId = Number(req.params.id);
            const adminData = req.body;
            const updatedAdmin = await AdminService.updateAdmin(adminId, adminData);
            res.json({ updatedAdmin, msg: 'Admin atualizado.' });
        } catch (error) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async deleteAdmin(req: Request, res: Response) {
        try {
            const adminId = Number(req.params.id);
            await AdminService.deleteAdmin(adminId);
            res.status(200).json({ msg: 'Admin deletado.' }).end();
        } catch (error) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },
};