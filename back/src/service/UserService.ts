import User from "../model/User";
import { CourseService } from "./CourseService";
import { NotFoundError } from "../errors/NotFoundError";
import bcrypt from "bcrypt";
import Course from "../model/Course";
import Review from "../model/Review";
import { Unauthorized } from "../errors/Unauthorized";
import Survey from "../model/Survey";
import { Op } from "sequelize";
import Modality from "../model/Modality";
import { Parser } from "json2csv";
import {
  followUpFields,
  reviewFields,
  bothFields,
} from "../utils/csvParserFields";

const BATCH_SIZE = 50;
const BOM = "\uFEFF";

export class UserService {
  static async getAllGraduates(filters: any) {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const whereConditions: any = {
      role: "graduate",
      ...(filters.confirmed &&
        !filters.notConfirmed && {
          enrollment: { [Op.not]: null },
        }),
      ...(filters.notConfirmed &&
        !filters.confirmed && {
          enrollment: { [Op.is]: null },
        }),
      ...(filters.outdated && {
        updatedAt: { [Op.lte]: sixMonthsAgo },
      }),
    };

    const graduates = await User.findAll({
      where: whereConditions,
      include: [
        {
          model: Course,
          as: "course",
          attributes: ["name", "acronym"],
          ...(filters.course
            ? { where: { name: { [Op.iLike]: `%${filters.course}%` } } }
            : {}),
        },
        {
          model: Survey,
          as: "survey",
          attributes: { exclude: ["createdAt"] },
        },
        {
          model: Review,
          as: "review",
          attributes: { exclude: ["createdAt"] },
        },
      ],
      attributes: { exclude: ["refreshToken", "role", "password", "courseId"] },
    });

    const parsedGraduates = graduates.map((graduate) => ({
      id: graduate.id,
      matricula: graduate.enrollment,
      nome: graduate.name,
      email: graduate.email,
      recebeEmails: graduate.allowEmails,
      anoIngresso: graduate.entryYear,
      anoFormatura: graduate.graduationYear,
      numeroContato: graduate.phoneNumber,
      contarTrajetoria: graduate.tellTrajectory,
      trabalhavaAntes: graduate.workedBefore,
      nivelAcademico: graduate.degreeLevel,
      comentarios: graduate.commentary,
      atualizadoEm: (graduate as any).updatedAt,
      curso: (graduate as any)?.course?.name,
      siglaCurso: (graduate as any)?.course?.acronym,
      situacaoAtual: (graduate as any)?.survey?.situation,
      cargoAtual: (graduate as any)?.survey?.positionName,
      nomeEmpresa: (graduate as any)?.survey?.companyName,
      tipoContrato: (graduate as any)?.survey?.employmentType,
      trabalhaArea: (graduate as any)?.survey?.worksInArea,
      requerimentoFormacaoNoCargo: (graduate as any)?.survey
        ?.positionEducationRequirement,
      cursoExternoAtual: (graduate as any)?.survey?.externalCourseName,
      relacaoCursoExternoEFormacao: (graduate as any)?.survey
        ?.courseRelationLevel,
      desejoTrabalharArea: (graduate as any)?.review?.desireToWorkArea,
      nivelAprendizado: (graduate as any)?.review?.learningLevelRating,
      avaliacaoCurso: (graduate as any)?.review?.courseRating,
      avalicaoCampus: (graduate as any)?.review?.campusRating,
      avalicaoInfraestrutura: (graduate as any)?.review?.infraRating,
      avaliacaoConhecimentosTeoricos: (graduate as any)?.review
        ?.theoKnowledgeRating,
      avaliacaoConhecimentosPraticos: (graduate as any)?.review
        ?.practKnowledgeRating,
      avaliacaoDocentes: (graduate as any)?.review?.teachersRating,
      expectativaCurso: (graduate as any)?.review?.courseExpectation,
    }));

    return parsedGraduates;
  }

  static async downloadGraduatesInfo(filter: unknown) {
    // filter might be: followUp, ratings, both or none
    if (filter === "followUp") {
      const graduates = await User.findAll({
        where: { role: "graduate" },
        attributes: {
          exclude: [
            "password",
            "refreshToken",
            "courseId",
            "createdAt",
            "role",
          ],
        },
        include: [
          {
            model: Survey,
            as: "survey",
            required: true,
            attributes: { exclude: ["userId", "createdAt", "updatedAt", "id"] },
          },
          {
            model: Course,
            as: "course",
            attributes: ["name"],
          },
        ],
        raw: true,
        nest: false,
      });

      const json2csvParser = new Parser({
        fields: followUpFields,
        delimiter: ";",
      });
      const csv = json2csvParser.parse(graduates);

      const csvWithBOM = BOM + csv;

      return csvWithBOM;
    }

    // ratings
    if (filter === "ratings") {
      const graduates = await User.findAll({
        where: { role: "graduate" },
        attributes: {
          exclude: [
            "password",
            "refreshToken",
            "courseId",
            "createdAt",
            "role",
          ],
        },
        include: [
          {
            model: Review,
            as: "review",
            required: true,
            attributes: { exclude: ["userId", "createdAt", "updatedAt", "id"] },
          },
          {
            model: Course,
            as: "course",
            attributes: ["name"],
          },
        ],
        raw: true,
        nest: false,
      });

      const json2csvParser = new Parser({
        fields: reviewFields,
        delimiter: ";",
      });
      const csv = json2csvParser.parse(graduates);

      const csvWithBOM = BOM + csv;

      return csvWithBOM;
    }

    // both ratings and reviews
    if (filter === "both") {
      const graduates = await User.findAll({
        where: { role: "graduate" },
        attributes: {
          exclude: [
            "password",
            "refreshToken",
            "courseId",
            "createdAt",
            "role",
          ],
        },
        include: [
          {
            model: Survey,
            as: "survey",
            required: true,
            attributes: { exclude: ["userId", "createdAt", "updatedAt", "id"] },
          },
          {
            model: Review,
            as: "review",
            required: true,
            attributes: { exclude: ["userId", "createdAt", "updatedAt", "id"] },
          },
          {
            model: Course,
            as: "course",
            attributes: ["name"],
          },
        ],
        raw: true,
        nest: false,
      });

      const json2csvParser = new Parser({
        fields: bothFields,
        delimiter: ";",
      });
      const csv = json2csvParser.parse(graduates);

      const csvWithBOM = BOM + csv;

      return csvWithBOM;
    }

    // none
    if (filter === "none") {
      const graduates = await User.findAll({
        where: { role: "graduate" },
        attributes: {
          exclude: [
            "password",
            "refreshToken",
            "courseId",
            "createdAt",
            "role",
          ],
        },
        include: [
          {
            model: Survey,
            as: "survey",
            attributes: { exclude: ["userId", "createdAt", "updatedAt", "id"] },
          },
          {
            model: Review,
            as: "review",
            attributes: { exclude: ["userId", "createdAt", "updatedAt", "id"] },
          },
          {
            model: Course,
            as: "course",
            attributes: ["name"],
          },
        ],
        raw: true,
        nest: false,
      });

      const json2csvParser = new Parser({
        fields: bothFields,
        delimiter: ";",
      });
      const csv = json2csvParser.parse(graduates);

      const csvWithBOM = BOM + csv;

      return csvWithBOM;
    }

    throw new Error("Escolha um dos filtros disponíveis.");
  }

  static async getAllAdmins() {
    return User.findAll({
      where: { role: "admin" },
      attributes: ["id", "name", "email"],
    });
  }

  static async getAllUsers() {
    return User.findAll({
      attributes: ["id", "name", "email", "role"],
    });
  }

  static async getUserById(id: number) {
    const user = await this.isExistent(id);
    return user;
  }

  static async getGraduateById(id: number) {
    const graduate = await User.findOne({
      where: {
        id,
        role: "graduate",
      },
      include: [
        {
          model: Course,
          as: "course",
          attributes: ["name", "acronym"],
        },
      ],
      attributes: { exclude: ["password"] },
    });
    if (!graduate) {
      throw new NotFoundError("Egresso não encontrado.");
    }
    return graduate;
  }

  static async getGraduateDetailsById(id: number) {
    const graduate = await User.findOne({
      where: {
        id,
        role: "graduate",
      },
      include: [
        {
          model: Course,
          as: "course",
          attributes: ["name", "acronym"],
        },
        {
          model: Survey,
          as: "survey",
          attributes: { exclude: ["createdAt"] },
        },
        {
          model: Review,
          as: "review",
          attributes: { exclude: ["createdAt"] },
        },
      ],
      attributes: { exclude: ["password"] },
    });
    if (!graduate) {
      throw new NotFoundError("Egresso não encontrado.");
    }
    return graduate;
  }

  static async confirmGraduate(userId: number, enrollment: string) {
    const graduate = await User.findOne({
      where: {
        id: userId,
        role: "graduate",
      },
      include: [
        {
          model: Course,
          as: "course",
          attributes: ["name", "acronym"],
        },
        {
          model: Survey,
          as: "survey",
          attributes: { exclude: ["createdAt"] },
        },
        {
          model: Review,
          as: "review",
          attributes: { exclude: ["createdAt"] },
        },
      ],
      attributes: { exclude: ["password"] },
    });

    if (!graduate) {
      throw new NotFoundError("Egresso não encontrado.");
    }

    await graduate.update({ enrollment });
    await graduate.reload();
    return graduate;
  }

  static async getUserByRefreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new Error("Token inválido");
    }

    const user = await User.findOne({
      where: { refreshToken },
    });

    return user;
  }

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
    return User.create({
      enrollment,
      name,
      email,
      password,
      entryYear,
      graduationYear,
      courseId,
    });
  }

  static async createGraduateByAdmin(userData: User) {
    const {
      name,
      enrollment,
      email,
      courseId,
      entryYear,
      graduationYear,
      phoneNumber,
    } = userData;

    const password = await bcrypt.hash(userData.email, 10);

    await CourseService.isExistent(courseId);
    return User.create({
      enrollment,
      name,
      password,
      email,
      entryYear,
      graduationYear,
      courseId,
      phoneNumber,
    });
  }

  static async createAdmin(userData: User) {
    const { name, email, password } = userData;
    return User.create({ name, email, password, role: "admin" });
  }

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
    return user.update({
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
    });
  }

  static async updateAdmin(id: number, updatedData: User) {
    const user = await this.isExistent(id);
    const { name, email } = updatedData;
    return user.update({ name, email });
  }

  static async deleteGraduate(id: number) {
    const user = await this.isExistent(id);
    await user.destroy();
  }

  static async deleteAdmin(id: number) {
    const user = await this.isExistent(id);
    await user.destroy();
  }

  static async register(
    enrollment: string,
    name: string,
    email: string,
    password: string,
    matchPassword: string,
    entryYear: number,
    graduationYear: number,
    phoneNumber: string,
    courseId?: number
  ) {
    //console.log(password, matchPassword);

    if (password !== matchPassword) {
      throw new Unauthorized("As senhas devem coincidir");
    }

    const [course, hashedPassword] = await Promise.all([
      Course.findByPk(courseId),
      bcrypt.hash(password, 10),
    ]);

    if (!course) {
      throw new NotFoundError("Curso não encontrado");
    }

    if (!hashedPassword) {
      throw new Error("Falha ao encriptar senha");
    }

    return await User.create({
      enrollment,
      name,
      email,
      password: hashedPassword,
      entryYear,
      graduationYear,
      phoneNumber,
      courseId,
    });
  }

  static async login(login: string, password: string) {
    const user = await User.findOne({ where: { email: login } });

    if (!user) {
      throw new Unauthorized(
        "Acesso não autorizado. Verifique seu login ou senha."
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Unauthorized(
        "Acesso não autorizado. Verifique seu login ou senha."
      );
    }

    return user;
  }

  //verifica se o elemento existe. Se existir, retorna o elemento. Se não, retorna um erro.
  static async isExistent(id: number) {
    if (!id) {
      throw new Error("Identificador de usuário inválido ou não informado");
    }
    const user = await User.findOne({
      where: { id },
      include: [
        {
          model: Course,
          as: "course",
          attributes: ["name", "acronym"],
        },
        {
          model: Review,
          as: "review",
        },
      ],
    });
    if (!user) {
      throw new NotFoundError("Egresso não encontrado.");
    }
    return user;
  }

  //rotas personalizadas
  static async getGraduatesSameCourse(id: number) {
    const user = await User.findByPk(id, {
      include: [
        {
          model: Course,
          as: "course",
          attributes: ["name", "acronym"],
        },
      ],
    });

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const users = await User.findAll({
      where: {
        role: "graduate",
      },
      include: [
        {
          model: Course,
          as: "course",
          attributes: [],
          where: {
            id: user.courseId,
          },
        },
      ],
      attributes: [
        "id",
        "enrollment",
        "name",
        "email",
        "graduationYear",
        "allowEmails",
      ],
    });

    return { users, course: (user as any).course.name };
  }

  static async updateUserPassword(
    id: number,
    oldPassword: string,
    newPassword: string
  ) {
    const user = await this.isExistent(id);

    if (!newPassword || !oldPassword) {
      throw new Error("As senhas não podem ser nulas.");
    }

    if (newPassword === user.password) {
      throw new Error(
        "A sua nova senha não pode ser igual à sua antiga senha."
      );
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new Error("Senha incorreta.");
    }

    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    } catch (err: any) {
      throw new Error(`Erro ao encriptar senha ${err.message}`);
    }

    return user.save({ fields: ["password"] });
  }

  private static gerarSenhaAleatoria(tamanho: number) {
    const caracteres =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&.";
    let senha = "";
    for (let i = 0; i < tamanho; i++) {
      const indexAleatorio = Math.floor(Math.random() * caracteres.length);
      senha += caracteres[indexAleatorio];
    }
    return senha;
  }

  static async passwordChangeMail(mail: string) {
    const user = await User.findOne({
      where: { email: mail },
    });

    if (!user) {
      throw new NotFoundError("Este email não está cadastrado no sistema.");
    }

    const novaSenha = this.gerarSenhaAleatoria(8);

    try {
      const hashedPassword = await bcrypt.hash(novaSenha, 10);
      user.password = hashedPassword;
    } catch (err: any) {
      throw new Error(`Erro ao encriptar senha ${err.message}`);
    }

    await user.save({ fields: ["password"] });

    return { userName: user.name, newPwd: novaSenha };
  }

  static async createBulkGraduatesOfSingleModality(
    graduates: Array<{
      matricula: string;
      nome: string;
      email: string;
      curso: string;
    }>,
    modalityId: number
  ) {
    try {
      const modality = await Modality.findOne({
        where: { id: modalityId },
      });

      if (!modality) {
        throw new NotFoundError("Modalidade não encontrada.");
      }

      //agrupa os egressos pelo nome do curso
      const graduatesByCourse = graduates.reduce((map, graduate) => {
        if (!map.has(graduate.curso)) {
          map.set(graduate.curso, []);
        }
        map.get(graduate.curso)!.push(graduate);
        return map;
      }, new Map<string, typeof graduates>());

      //procura no banco todos os cursos que estão no array
      const courseNames = Array.from(graduatesByCourse.keys());
      const existingCourses = await Course.findAll({
        where: { name: { [Op.in]: courseNames } },
      });

      //cria um map de cursos existentes
      const courseMap = new Map<string, number>();
      for (const course of existingCourses) {
        courseMap.set(course.name, course.id);
      }

      //cria os cursos que ainda não existem
      const newCourses: { name: string; modalityId: number }[] = [];
      for (const courseName of courseNames) {
        if (!courseMap.has(courseName)) {
          newCourses.push({
            name: courseName,
            modalityId: modality.id,
          });
        }
      }

      //se houver cursos que não existiam, cria-os no banco de dados de uma vez
      if (newCourses.length > 0) {
        const createdCourses = await Course.bulkCreate(newCourses);
        for (const course of createdCourses) {
          courseMap.set(course.name, course.id);
        }
      }

      //Prepara os egressos para inserção no banco
      const treatedGraduates: {
        enrollment: string;
        name: string;
        email: string;
        courseId: number | undefined;
        password: string;
      }[] = [];
      for (const [courseName, students] of graduatesByCourse.entries()) {
        const courseId = courseMap.get(courseName);
        for (const graduate of students) {
          treatedGraduates.push({
            enrollment: graduate.matricula,
            name: graduate.nome,
            email: graduate.email,
            courseId,
            password: await bcrypt.hash(graduate.email, 10),
          });
        }
      }

      const createdGraduates = await User.bulkCreate(treatedGraduates, {
        ignoreDuplicates: true,
        fields: ["enrollment", "name", "email", "password", "courseId"],
        returning: ["id", "enrollment", "name", "email"],
      });

      const attGrad = createdGraduates.map((graduate) => {
        return {
          id: graduate.id,
          enrollment: graduate.enrollment,
          name: graduate.name,
          email: graduate.email,
        };
      });

      const newGraduates = attGrad.filter((graduate) => graduate.id);
      return {
        newGraduates,
        existingGraduatesLength: createdGraduates.length,
      };
    } catch (err) {
      throw err;
    }
  }
}
