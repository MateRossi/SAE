import { sequelize } from "../db/sequelize";
import Course from "../model/Course";
import JobPosting from "../model/JobPosting";

export class JobPostingService {
    static async getAllJobPostings() {
        return await JobPosting.findAll({
            include: {
                model: Course,
            },
        });
    };

    static async getJobPostingById(id: number) {
        return await JobPosting.findByPk(id, {
            include: {
                model: Course,
            },
        });
    };

    static async createJobPosting(jobPostingData: JobPosting, courseIds: number[]) {
        const {
            jobTitle,
            company, 
            logoUrl, 
            description, 
            jobUrl 
        } = jobPostingData;

        const transaction = await sequelize.transaction();
        
        try {
            const jobPosting = await JobPosting.create(
                { jobTitle, company, logoUrl, description, jobUrl }, 
                { transaction }
            );

            await (jobPosting as any).addCourses(courseIds, { transaction });
            
            await transaction.commit();

            return jobPosting;
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
}