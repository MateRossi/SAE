import User from "../model/User";
import Review from "../model/Review";
import { UserService }  from "../service/UserService";
import { NotFoundError } from "../errors/NotFoundError";

export class ReviewService {
    static async getAllReviews() {
        return Review.findAll({
            include: [{
                model: User,
                as: 'graduate',
                attributes: ['name', 'graduationYear', 'email', 'allowEmails']
            }]
        });
    };

    static async getReviewById(id: number) {
        const review = await this.isExistent(id);
        return review;
    };

    static async getReviewByUserId(id: number) {
        const user = await UserService.getUserById(id);

        if (!user) {
            throw new NotFoundError("Usuário não encontrado");
        }

        return Review.findOne({
            where: { userId: id }
        });
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
            courseExpectation,
            userId,
        } = reviewData;
        const user = await UserService.isExistent(userId);

        const review = await (user as any).getReview();

        if (review) {
            return await review.update({
                desireToWorkArea,
                learningLevelRating,
                courseRating,
                campusRating,
                infraRating,
                theoKnowledgeRating,
                practKnowledgeRating,
                teachersRating,
                courseExpectation,    
            });
        }

        return Review.create({
            desireToWorkArea,
            learningLevelRating,
            courseRating,
            campusRating,
            infraRating,
            theoKnowledgeRating,
            practKnowledgeRating,
            teachersRating,
            courseExpectation,
            userId    
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
            courseExpectation,
            userId,
        } = updatedData;
        await UserService.isExistent(userId);

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
            courseExpectation,    
        });
    };
    
    static async deleteReview(id: number) {
        const review = await this.isExistent(id);
        await review.destroy();
    };
    
    //verifica se o elemento existe. Se existir, retorna o elemento. Se não, retorna um erro.
    static async isExistent(id: number) {
        if (!id) {
            throw new Error('Identificador inválido de avaliação inválido ou não informado');
        }
        const review = await Review.findOne({
            where: {id},
            include: [{
                model: User,
                as: 'graduate',
                attributes: ['name', 'graduationYear', 'email', 'allowEmails']
            }]
        });
        if (!review) {
            throw new NotFoundError('Avaliações não encontradas.');
        };
        return review;
    };
};