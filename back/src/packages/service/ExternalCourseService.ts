import ExternalCourse from "../model/ExternalCourse";
import { NotFoundError } from "../utilities/Error/NotFoundError";

export class ExternalCourseService {
    static async getAllExternalCourses() {
        return ExternalCourse.findAll();
    };

    static async getExternalCourseById(id: number) {
        const externalCourse = await this.isExistent(id);
        return externalCourse;
    };

    static async createExternalCourse(externalCourseData: ExternalCourse) {
        const { description } = externalCourseData;
        return ExternalCourse.create({ description });
    };

    static async updateExternalCourse(id: number, updatedData: ExternalCourse) {
        const externalCourse = await this.isExistent(id);
        const { description } = updatedData;
        return externalCourse.update({ description });
    };

    static async deleteExternalCourse(id: number) {
        const externalCourse = await this.isExistent(id);
        await externalCourse.destroy();
    };

    //verifica se o elemento existe. Se existir, retorna o elemento. Se não, retorna um erro.
    static async isExistent(id: number) {
        const externalCourse = await ExternalCourse.findByPk(id);
        if (!externalCourse) {
            throw new NotFoundError('Curso externo não encontrado.');
        };
        return externalCourse;
    };
};