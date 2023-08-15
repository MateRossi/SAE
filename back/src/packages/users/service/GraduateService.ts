import Graduate from "../model/Graduate";
import { CourseService }  from "../../course/service/CourseService";
import { NotFoundError } from "../../utilities/Error/NotFoundError"; 

export class GraduateService {
    static async getAllGraduates() {
        return Graduate.findAll();
    };

    static async getGraduateById(id: number) {
        const graduate = await this.isExistent(id);
        return graduate;
    };

    static async createGraduate(graduateData: Graduate) {
        const { name, login, password, courseId } = graduateData;
        await CourseService.isExistent(courseId);
        return Graduate.create({ name, login, password, courseId });
    };

    static async updateGraduate(id: number, updatedData: Graduate) {
        const graduate = await this.isExistent(id);
        const { name, login, password, courseId } = updatedData;
        await CourseService.isExistent(courseId);
        return graduate.update({ name, login, password, courseId });
    };
    
    static async deleteGraduate(id: number) {
        const graduate = await this.isExistent(id);
        await graduate.destroy();
    };
    
    //verifica se o elemento existe. Se existir, retorna o elemento. Se não, retorna um erro.
    static async isExistent(id: number) {
        const graduate = await Graduate.findByPk(id);
        if (!graduate) {
            throw new NotFoundError('Egresso não encontrado.');
        };
        return graduate;
    };
};