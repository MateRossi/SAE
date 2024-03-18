import Graduate from "../model/Graduate";
import { CourseService }  from "../service/CourseService";
import { NotFoundError } from "../utilities/Error/NotFoundError"; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { environment } from "../../env/env.local";

export class GraduateService {
    static async getAllGraduates() {
        return Graduate.findAll();
    };

    static async getGraduateById(id: number) {
        const graduate = await this.isExistent(id);
        return graduate;
    };

    static async createGraduate(graduateData: Graduate) {
        const { name, email, password, graduationYear, courseId } = graduateData;
        await CourseService.isExistent(courseId);
        return Graduate.create({ name, email, password, graduationYear, courseId });
    };

    static async updateGraduate(id: number, updatedData: Graduate) {
        const graduate = await this.isExistent(id);
        const { name, email, password, graduationYear, courseId } = updatedData;
        await CourseService.isExistent(courseId);
        return graduate.update({ name, email, password, graduationYear, courseId });
    };
    
    static async deleteGraduate(id: number) {
        const graduate = await this.isExistent(id);
        await graduate.destroy();
    };

    static async loginGraduate(login: string, password: string) {
        const graduate = await Graduate.findOne({ where: { login } });
        console.log('User' + graduate)

        if (!graduate) {
            throw new NotFoundError('Usuário não encontrado.');
        };

        const isPasswordValid = await bcrypt.compare(password, graduate.password);

        if (!isPasswordValid) {
            throw new Error('Senha incorreta.');
        };

        const token = jwt.sign({ id: graduate.id, login: graduate.email, role: graduate.role }, environment.jwtSecret, {expiresIn: '1h'});

        return { login, token };
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