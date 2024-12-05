import Course from "../model/Course";
import { NotFoundError } from "../errors/NotFoundError";
import Modality from "../model/Modality";
import User from "../model/User";
import { col, fn } from "sequelize";

export class CourseService {
    static async getAllCourses() {
        return Course.findAll({
            attributes: {
                include: [
                    [fn('COUNT', col('users.id')), 'usersCount']
                ]
            },
            include: [
                {
                    model: Modality,
                    as: 'modality',
                },
                {
                    model: User,
                    as: 'users',
                    attributes: [],
                    required: false,
                }
            ],
            group: ['Course.id', 'modality.id'],
        });
    };

    static async getCourseById(id: number) {
        const course = await this.isExistent(id);
        return course;
    };

    static async createCourse(courseData: Course) {
        const { name, acronym, modalityId } = courseData;
        const modality = await Modality.findByPk(modalityId);
        if (!modality) {
            throw new NotFoundError('Não foi possível adicionar este curso. Modalidade inválida');
        }
        return Course.create({ name, acronym, modalityId });
    };

    static async updateCourse(id: number, updatedData: Course) {
        const course = await this.isExistent(id);
        const { name, acronym, modalityId } = updatedData;
        const modality = await Modality.findByPk(modalityId);
        if (!modality) {
            throw new NotFoundError('Não foi possível alterar este curso. Modalidade inválida');
        }
        return course.update({ name, acronym, modalityId });
    };

    static async deleteCourse(id: number) {
        const course = await this.isExistent(id);
        await course.destroy();
    };

    //verifica se o elemento existe. Se existir, retorna o elemento. Se não, retorna um erro.
    static async isExistent(id: number) {
        if (!id) {
            throw new Error('Identificador de curso inválido ou não informado');
        }
        const course = await Course.findOne({
            where: { id },
            include: [
                {
                    model: Modality,
                    as: 'modality',
                    attributes: ['description']
                },
                {
                    model: User,
                    as: 'users',
                    attributes: ['enrollment', 'name']
                }
            ]
        });
        if (!course) {
            throw new NotFoundError('Curso não encontrado.');
        };
        return course;
    };
};