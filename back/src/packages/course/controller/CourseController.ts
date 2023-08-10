import { CourseService } from "../service/CourseService";
import { Request, Response } from 'express';

export const courseController = {
    async getAllCourses(req: Request, res: Response) {
        try {
            const courses = await CourseService.getAllCourses();
            res.json(courses);
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor', details: JSON.stringify(error) });
        };
    },

    async getCourseById(req: Request, res: Response) {
        const courseId = Number(req.params.id);
        try {
            const course = await CourseService.getCourseById(courseId);
            res.json(course);
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor.', details: JSON.stringify(error) });
        };
    },

    async createCourse(req: Request, res: Response) {
        const courseData = req.body;
        try {
            const newCourse = await CourseService.createCourse(courseData);
            res.status(201).json({ newCourse, msg: 'Curso criado.' });
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor.', details: JSON.stringify(error) });
        };
    },

    async updateCourse(req: Request, res: Response) {
        const courseId = Number(req.params.id);
        const courseData = req.body;
        try {
            const updatedCourse = await CourseService.updateCourse(courseId, courseData);
            res.json({ updatedCourse, msg: 'Curso atualizado.' });
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor.', details: JSON.stringify(error) });
        };
    },

    async deleteCourse(req: Request, res: Response) {
        const courseId = Number(req.params.id);
        try {
            await CourseService.deleteCourse(courseId);
            res.status(200).json({ msg: 'Curso deletado' }).end();
        } catch (error: any) {
            res.status(500).json({ error: 'Erro interno do servidor.', details: JSON.stringify(error) });
        };
    },
};