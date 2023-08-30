import Survey from "../model/Survey";
import situations from "../../utilities/labelMapping/situation";

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
        if(!this.validateSituation(surveyData)) {
            throw new Error("Verifique se os campos " + this.validateSituation(surveyData).missingFields + "foram preenchidos corretamente.");
        };
        
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
        this.validateSituation(updatedData);
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
    
        const requiredFields = situations[situation] || [];
        const missingFields = requiredFields.filter(field => data[field as keyof Survey] == null);
    
        return {
            isValid: missingFields.length === 0,
            missingFields: missingFields,
        };
    };
};