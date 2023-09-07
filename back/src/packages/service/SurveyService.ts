import Survey from "../model/Survey";

import { PositionService } from "../service/PositionService";
import { ExternalCourseService } from "../service/ExternalCourseService";
import { DegreeLevelService } from "../service/DegreeLevelService";
import { CompanyService } from "../service/CompanyService";
import { NotFoundError } from "../utilities/Error/NotFoundError";

export class SurveyService {
    static async getAllSurveys() {
        return Survey.findAll();
    };

    static async getSurveyById(id: number) {
        const survey = await this.isExistent(id);
        return survey;
    };

    static async createSurvey(surveyData: Survey) {       
        const {
            situation,
            courseRelationshipLevel,
            educationRequirement,
            worksInArea,
            positionId,
            externalCourseId,
            degreeLevelId,
            companyId,
        } = surveyData;
        await this.validateIdNotEmpty(positionId, externalCourseId, degreeLevelId, companyId);
        return Survey.create({
            situation,
            courseRelationshipLevel,
            educationRequirement,
            worksInArea,
            positionId,
            externalCourseId,
            degreeLevelId,
            companyId,
        });
    };

    static async updateSurvey(id: number, updatedData: Survey) {
        const survey = await this.isExistent(id);
        const {
            situation,
            courseRelationshipLevel,
            educationRequirement,
            worksInArea,
            positionId,
            externalCourseId,
            degreeLevelId,
            companyId,
        } = updatedData;
        await this.validateIdNotEmpty(positionId, externalCourseId, degreeLevelId, companyId);
        return survey.update({
            situation,
            courseRelationshipLevel,
            educationRequirement,
            worksInArea,
            positionId,
            externalCourseId,
            degreeLevelId,
            companyId,
        });
    };

    static async deleteSurvey(id: number) {
        const survey = await this.isExistent(id);
        await survey.destroy();
    };

    //verifica se o elemento existe. Se existir, retorna o elemento. Se não, retorna um erro.
    static async isExistent(id: number) {
        const survey = await Survey.findByPk(id);
        if (!survey) {
            throw new NotFoundError('Pesquisa não encontrada.');
        };
        return survey;
    };

    //validar para quando os campos não obrigatórios da pesquisa são não-nulos.
    //se uma pessoa enviar algum valor no ID de empresa, verificar se essa empresa existe e assim por diante.

    private static async validateIdNotEmpty(positionId: number, externalCourseId: number, degreeLevelId: number, companyId: number) {
        if (positionId) {
            await PositionService.isExistent(positionId);
        };
        if (externalCourseId) {
            await ExternalCourseService.isExistent(externalCourseId);
        };
        if (degreeLevelId) {
            await DegreeLevelService.isExistent(degreeLevelId);
        };
        if (companyId) {
            await CompanyService.isExistent(companyId);
        };
    };
};