import User from "../model/User";
import { CourseService } from "./CourseService";
import { NotFoundError } from "../errors/NotFoundError";
import bcrypt from 'bcrypt';
import Course from "../model/Course";
import Review from "../model/Review";
import { Unauthorized } from "../errors/Unauthorized";

export class UserService {
    static async getAllGraduates() {
        console.log('get all graduates service')
        return User.findAll({
            where: { role: 'graduate' },
            include: [{
                model: Course,
                as: 'course',
                attributes: ['name', 'acronym'],
            }],
            attributes: ['id', 'enrollment', 'name', 'email', 'allowEmails', 'entryYear', 'graduationYear'],
        });
    };

    static async getAllAdmins() {
        return User.findAll({
            where: { role: 'admin' },
            attributes: ['id', 'name', 'email'],
        });
    };

    static async getAllUsers() {
        return User.findAll({
            attributes: ['id', 'name', 'email', 'role'],
        });
    };

    static async getUserById(id: number) {
        const user = await this.isExistent(id);
        return user;
    };

    static async getGraduateById(id: number) {
        const graduate = await User.findOne({
            where: {
                id,
                role: 'graduate',
            },
            include: [{
                model: Course,
                as: 'course',
                attributes: ['name', 'acronym'],
            }],
            attributes: { exclude: ['password'] }
        });
        if (!graduate) {
            throw new NotFoundError('Egresso não encontrado.');
        }
        return graduate;
    };

    static async getUserByRefreshToken(refreshToken: string) {
        if (!refreshToken) {
            throw new Error('Token inválido');
        }

        const user = await User.findOne({
            where: { refreshToken },
        });

        return user;
    };

    static async createGraduate(userData: User) {
        const {
            enrollment,
            name,
            email,
            password,
            entryYear,
            graduationYear,
            courseId,
        } = userData;
        await CourseService.isExistent(courseId);
        return User.create({ enrollment, name, email, password, entryYear, graduationYear, courseId });
    };

    static async createAdmin(userData: User) {
        const {
            name,
            email,
            password,
        } = userData;
        return User.create({ name, email, password, role: 'admin' });
    };

    static async updateGraduate(id: number, updatedData: User) {
        const user = await this.isExistent(id);
        const {
            enrollment,
            name,
            email,
            entryYear,
            graduationYear,
            allowEmails,
            tellTrajectory,
            phoneNumber,
            workedBefore,
            degreeLevel,
            commentary,
        } = updatedData;
        return user.update({ enrollment, name, email, entryYear, graduationYear, allowEmails, tellTrajectory, phoneNumber, workedBefore, degreeLevel, commentary });
    };

    static async updateAdmin(id: number, updatedData: User) {
        const user = await this.isExistent(id);
        const {
            name,
            email,
        } = updatedData;
        return user.update({ name, email });
    };

    static async deleteGraduate(id: number) {
        const user = await this.isExistent(id);
        await user.destroy();
    };

    static async deleteAdmin(id: number) {
        const user = await this.isExistent(id);
        await user.destroy();
    };

    static async register(
        enrollment: string,
        name: string,
        email: string,
        password: string,
        matchPassword: string,
        entryYear: number,
        graduationYear: number,
        phoneNumber: string,
        courseId?: number,
    ) {
        console.log(password, matchPassword);

        if (password !== matchPassword) {
            throw new Unauthorized('As senhas devem coincidir');
        }

        const [course, hashedPassword] = await Promise.all([
            Course.findByPk(courseId),
            bcrypt.hash(password, 10)
        ])

        if (!course) {
            throw new NotFoundError('Curso não encontrado');
        }

        if (!hashedPassword) {
            throw new Error('Falha ao encriptar senha');
        }

        return await User.create({
            enrollment,
            name,
            email,
            password: hashedPassword,
            entryYear,
            graduationYear,
            phoneNumber,
            courseId
        });
    }

    static async login(login: string, password: string) {
        const user = await User.findOne({ where: { email: login } });

        if (!user) {
            throw new Unauthorized('Acesso não autorizado. Verifique seu login ou senha.');
        };

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Unauthorized('Acesso não autorizado. Verifique seu login ou senha.');
        }

        return user;
    };

    //verifica se o elemento existe. Se existir, retorna o elemento. Se não, retorna um erro.
    static async isExistent(id: number) {
        if (!id) {
            throw new Error('Identificador de usuário inválido ou não informado');
        }
        const user = await User.findOne({
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
        if (!user) {
            throw new NotFoundError('Egresso não encontrado.');
        };
        return user;
    };

    //rotas personalizadas
    static async getGraduatesSameCourse(id: number) {
        const user = await User.findByPk(id, {
            include: [
                {
                    model: Course,
                    as: 'course',
                    attributes: ['name', 'acronym'],
                }
            ]
        })

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        const users = await User.findAll({
            where: {
                role: 'graduate'
            },
            include: [{
                model: Course,
                as: 'course',
                attributes: [],
                where: {
                    id: user.courseId
                }
            }],
            attributes: ['enrollment', 'name', 'email', 'graduationYear', 'allowEmails'],
        });

        return { users, course: (user as any).course.name }
    };

    static async updateUserPassword(id: number, oldPassword: string, newPassword: string) {
        const user = await this.isExistent(id);

        if (!newPassword || !oldPassword) {
            throw new Error('As senhas não podem ser nulas.');
        }

        if (newPassword === user.password) {
            throw new Error('A sua nova senha não pode ser igual à sua antiga senha.');
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            throw new Error('Senha incorreta.');
        }

        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
        } catch (err: any) {
            throw new Error(`Erro ao encriptar senha ${err.message}`);
        }

        return user.save({ fields: ['password'] });
    };
};