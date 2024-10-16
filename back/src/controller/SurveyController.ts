import { SurveyService } from "../service/SurveyService";
import { Request, Response } from 'express';
import { ErrorResponse } from '../errors/ErrorResponse';

export const surveyController = {
    async getAllSurveys(req: Request, res: Response) {
        try {
            const surveys = await SurveyService.getAllSurveys();
            res.json(surveys);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async getSurveyById(req: Request, res: Response) {
        try {
            const surveyId = Number(req.params.id);
            const survey = await SurveyService.getSurveyById(surveyId);
            res.json(survey);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async getSurveyByUserId(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);
            const survey = await SurveyService.getSurveyByUserId(userId);
            res.json(survey);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async createSurvey(req: Request, res: Response) {
        try {
            const surveyData = req.body;
            console.log(surveyData);
            const newSurvey = await SurveyService.createSurvey(surveyData);
            console.log(newSurvey);
            res.status(201).json(newSurvey);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async updateSurvey(req: Request, res: Response) {
        try {
            const surveyId = Number(req.params.id);
            const surveyData = req.body;
            const updatedSurvey = await SurveyService.updateSurvey(surveyId, surveyData);
            res.json({ updatedSurvey, msg: 'A pesquisa foi atualizada.' });
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async deleteSurvey(req: Request, res: Response) {
        try {
            const surveyId = Number(req.params.id);
            await SurveyService.deleteSurvey(surveyId);
            res.status(200).json({ msg: 'A pesquisa foi deletada.' }).end();
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },
};