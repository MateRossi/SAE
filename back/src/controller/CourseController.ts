import { CourseService } from "../service/CourseService";
import { Request, Response } from 'express';
import { ErrorResponse } from '../errors/ErrorResponse';

export const courseController = {
    async getAllCourses(req: Request, res: Response) {
        try {
            const courses = await CourseService.getAllCourses();
            res.json(courses);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async getCourseById(req: Request, res: Response) {
        try {
            const courseId = Number(req.params.id);
            const course = await CourseService.getCourseById(courseId);
            res.json(course);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async createCourse(req: Request, res: Response) {
        try {
            const courseData = req.body;
            const newCourse = await CourseService.createCourse(courseData);
            res.status(201).json(newCourse);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async updateCourse(req: Request, res: Response) {
        try {
            const courseId = Number(req.params.id);
            const courseData = req.body;
            const updatedCourse = await CourseService.updateCourse(courseId, courseData);
            res.json({ updatedCourse, msg: 'Curso atualizado.' });
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async deleteCourse(req: Request, res: Response) {
        try {
            const courseId = Number(req.params.id);
            await CourseService.deleteCourse(courseId);
            res.status(200).json({ msg: 'Curso deletado' }).end();
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },
};