import Graduate from "../model/Graduate";
import { CourseService } from "./CourseService";
import { NotFoundError } from "../errors/NotFoundError";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Course from "../model/Course";
import Review from "../model/Review";

export class GraduateService {
    static async getAllGraduates() {
        return Graduate.findAll({
            include: [{
                model: Course,
                as: 'course',
                attributes: ['name', 'acronym'],
            }],
            attributes: ['id', 'enrollment', 'name', 'email', 'allowEmails', 'graduationYear'],
        });
    };

    static async getGraduateById(id: number) {
        const graduate = await this.isExistent(id);
        return graduate;
    };

    static async createGraduate(graduateData: Graduate) {
        const {
            enrollment,
            name,
            email,
            password,
            graduationYear,
            courseId,
        } = graduateData;
        await CourseService.isExistent(courseId);
        return Graduate.create({ enrollment, name, email, password, graduationYear, courseId });
    };

    static async updateGraduate(id: number, updatedData: Graduate) {
        const graduate = await this.isExistent(id);
        const {
            enrollment,
            name,
            email,
            password,
            graduationYear,
            courseId
        } = updatedData;
        await CourseService.isExistent(courseId);
        return graduate.update({ enrollment, name, email, password, graduationYear, courseId });
    };

    static async deleteGraduate(id: number) {
        const graduate = await this.isExistent(id);
        await graduate.destroy();
    };

    static async loginGraduate(login: string, password: string) {
        const graduate = await Graduate.findOne({ where: { email: login } });
        console.log('User' + graduate?.name)

        if (!graduate) {
            throw new NotFoundError('Usuário não encontrado.');
        };

        const isPasswordValid = await bcrypt.compare(password, graduate.password);

        if (!isPasswordValid) {
            throw new Error('Senha incorreta.');
        };

        const token = jwt.sign({
            id: graduate.id,
            login: graduate.email,
            role: graduate.role
        },
            process.env.JWT_SECRET || 'SEAG@2024TTCCMR',
            { expiresIn: '1h' });

        return { id: graduate.id, login, token, role: graduate.role };
    };

    //verifica se o elemento existe. Se existir, retorna o elemento. Se não, retorna um erro.
    static async isExistent(id: number) {
        if (!id) {
            throw new Error('Identificador inválido');
        }
        const graduate = await Graduate.findOne({
            where: { id },
            include: [
                {
                    model: Course,
                    as: 'course',
                    attributes: ['name', 'acronym'],
                },
                {
                    model: Review,
                    as: 'review',
                },
            ],
        });
        if (!graduate) {
            throw new NotFoundError('Egresso não encontrado.');
        };
        return graduate;
    };

    //rotas personalizadas
    static async getGraduatesSameCourse(id: number) {
        const graduate = await this.isExistent(id);
        
        return Graduate.findAll({
            include: [{
                model: Course,
                as: 'course',
                attributes: ['id'],
                where: {
                    id: graduate.courseId
                }
            }],
            attributes: ['id', 'enrollment', 'name', 'email', 'allowEmails', 'graduationYear'],
        });
    };
};