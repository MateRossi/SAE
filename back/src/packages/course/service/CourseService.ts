import Course from "../model/Course";
import { ModalityService } from "./ModalityService";

export class CourseService {
    static async getAllCourses() {
        return Course.findAll();
    };

    static async getCourseById(id: number) {
        const course = await this.isExistent(id);
        return course;
    };

    static async createCourse(courseData: Course) {
        const { name, acronym, modalityId } = courseData;
        await ModalityService.isExistent(modalityId);
        return Course.create({ name, acronym, modalityId });
    };

    static async updateCourse(id: number, updatedData: Course) {
        const course = await this.isExistent(id);
        const { name, acronym, modalityId } = updatedData;
        await ModalityService.isExistent(modalityId);
        return course.update({ name, acronym, modalityId });
    };
    
    static async deleteCourse(id: number) {
        const course = await this.isExistent(id);
        await course.destroy();
    };
    
    //verifica se o elemento existe. Se existir, retorna o elemento. Se não, retorna um erro.
    static async isExistent(id: number) {
        const course = await Course.findByPk(id);
        if (!course) {
            throw new Error('Curso não encontrado.');
        };
        return course;
    };

    
};