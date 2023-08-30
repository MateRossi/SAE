import Survey from "../model/Survey";
import { PositionService } from "../../position/service/PositionService";
import { ExternalCourseService } from "../../education/service/ExternalCourseService";
import { DegreeLevelService } from "../../education/service/DegreeLevelService";
import { CompanyService } from "../../company/service/CompanyService";
import { NotFoundError } from "../../utilities/Error/NotFoundError";

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
        await PositionService.isExistent(positionId);
        await ExternalCourseService.isExistent(externalCourseId);
        await DegreeLevelService.isExistent(degreeLevelId);
        await CompanyService.isExistent(companyId);
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
        await PositionService.isExistent(positionId);
        await ExternalCourseService.isExistent(externalCourseId);
        await DegreeLevelService.isExistent(degreeLevelId);
        await CompanyService.isExistent(companyId);
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

    //verificar elementos com base na resposta de "situação atual". Possívelmente, verificar na controller.
    static validateSituation(data: Survey) {
        const { situation } = data;
    
        const validationRequirements = {
            'trabalhando e estudando': ['courseRelationshipLevel', 'educationRequirement', 'worksInArea', 'positionId', 'externalCourseId', 'companyId'],
            'apenas trabalhando': ['educationRequirement', 'worksInArea', 'positionId', 'companyId'],
            'apenas estudando': ['courseRelationshipLevel', 'externalCourseId'],
        };
    
        const requiredFields = validationRequirements[situation] || [];
        const missingFields = requiredFields.filter(field => data[field] == null);
    
        return {
            isValid: missingFields.length === 0,
            missingFields: missingFields,
        };
    }
};