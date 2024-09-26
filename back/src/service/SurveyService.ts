import Survey from "../model/Survey";
import { UserService } from "./UserService";
import { NotFoundError } from "../errors/NotFoundError";

export class SurveyService {
    static async getAllSurveys() {
        return Survey.findAll();
    };

    static async getSurveyById(id: number) {
        const survey = await this.isExistent(id);
        return survey;
    };

    static async getSurveyByUserId(id: number) {
        const user = await UserService.getUserById(id);

        if (!user) {
            throw new NotFoundError("Usuário não encontrado");
        }

        return Survey.findOne({
            where: { userId: id }
        });
    };

    static async createSurvey(surveyData: Survey) {       
        const {
            situation,
            positionName,
            employmentType,
            worksInArea,
            positionEducationRequirement,
            externalCourseName,
            courseRelationLevel,
            companyName,
            userId,
        } = surveyData;
        await UserService.isExistent(userId);
        return Survey.create({
            situation,
            positionName,
            employmentType,
            worksInArea,
            positionEducationRequirement,
            externalCourseName,
            courseRelationLevel,
            companyName,
            userId,
        });
    };

    static async updateSurvey(id: number, updatedData: Survey) {
        const survey = await this.isExistent(id);
        const {
            situation,
            positionName,
            employmentType,
            worksInArea,
            positionEducationRequirement,
            externalCourseName,
            courseRelationLevel,
            companyName,
            userId,
        } = updatedData;
        await UserService.isExistent(userId);
        return survey.update({
            situation,
            positionName,
            employmentType,
            worksInArea,
            positionEducationRequirement,
            externalCourseName,
            courseRelationLevel,
            companyName,
            userId,
        });
    };

    static async deleteSurvey(id: number) {
        const survey = await this.isExistent(id);
        await survey.destroy();
    };

    //verifica se o elemento existe. Se existir, retorna o elemento. Se não, retorna um erro.
    static async isExistent(id: number) {
        if (!id) {
            throw new Error('Identificador inválido de pesquisa inválido ou não informado');
        }
        const survey = await Survey.findByPk(id);
        if (!survey) {
            throw new NotFoundError('Pesquisa não encontrada.');
        };
        return survey;
    };
};