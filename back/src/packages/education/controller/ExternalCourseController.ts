import { ErrorResponse } from "../../utilities/Error/ErrorResponse";
import { ExternalCourseService } from "../service/ExternalCourseService";
import { Request, Response } from 'express';

export const ExternalCourseController = {
    async getAllExternalCourses(req: Request, res: Response) {
        try {
            const externalCourses = await ExternalCourseService.getAllExternalCourses();
            res.json(externalCourses);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async getExternalCourseById(req: Request, res: Response) {
        try {
            const externalCourseId = Number(req.params.id);
            const externalCourse = await ExternalCourseService.getExternalCourseById(externalCourseId);
            res.json(externalCourse);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async createExternalCourse(req: Request, res: Response) {
        try {
            const externalCourseData = req.body;
            const newExternalCourse = await ExternalCourseService.createExternalCourse(externalCourseData);
            res.status(201).json({ newExternalCourse, msg: 'Curso externo criado.' });
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async updateExternalCourse(req: Request, res: Response) {
        try {
            const externalCourseId = Number(req.params.id);
            const externalCourseData = req.body;
            const updatedExternalCourse = await ExternalCourseService.updateExternalCourse(externalCourseId, externalCourseData);
            res.json({ updatedExternalCourse, msg: 'Curso externo atualizado.' });
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async deleteExternalCourse(req: Request, res: Response) {
        try {
            const externalCourseId = Number(req.params.id);
            await ExternalCourseService.deleteExternalCourse(externalCourseId);
            res.status(200).json({ msg: 'Curso externo deletado.' }).end();
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },
};