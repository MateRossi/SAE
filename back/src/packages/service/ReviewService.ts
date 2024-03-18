import Review from "../model/Review";
import { GraduateService }  from "../service/GraduateService";
import { NotFoundError } from "../utilities/Error/NotFoundError";

export class ReviewService {
    static async getAllReviews() {
        return Review.findAll();
    };

    static async getReviewById(id: number) {
        const review = await this.isExistent(id);
        return review;
    };

    static async createReview(reviewData: Review) {
        const {
            desireToWorkArea,
            learningLevelRating,
            courseRating,
            campusRating,
            infraRating,
            theoKnowledgeRating,
            practKnowledgeRating,
            teachersRating,
            expectationSatisfaction,
            graduateId,
        } = reviewData;
        await GraduateService.isExistent(graduateId);
        return Review.create({
            desireToWorkArea,
            learningLevelRating,
            courseRating,
            campusRating,
            infraRating,
            theoKnowledgeRating,
            practKnowledgeRating,
            teachersRating,
            expectationSatisfaction,
            graduateId    
        });
    };

    static async updateReview(id: number, updatedData: Review) {
        const review = await this.isExistent(id);
        const {
            desireToWorkArea,
            learningLevelRating,
            courseRating,
            campusRating,
            infraRating,
            theoKnowledgeRating,
            practKnowledgeRating,
            teachersRating,
            expectationSatisfaction,
            graduateId,
        } = updatedData;
        await GraduateService.isExistent(graduateId);

        //não passo o id do egresso para não editar a informação de qual egresso fez qual review.
        return review.update({
            desireToWorkArea,
            learningLevelRating,
            courseRating,
            campusRating,
            infraRating,
            theoKnowledgeRating,
            practKnowledgeRating,
            teachersRating,
            expectationSatisfaction,    
        });
    };
    
    static async deleteReview(id: number) {
        const review = await this.isExistent(id);
        await review.destroy();
    };
    
    //verifica se o elemento existe. Se existir, retorna o elemento. Se não, retorna um erro.
    static async isExistent(id: number) {
        const review = await Review.findByPk(id);
        if (!review) {
            throw new NotFoundError('Avaliações não encontradas.');
        };
        return review;
    };
};