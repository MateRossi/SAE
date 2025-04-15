import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";
import Course from "./Course";

class JobPosting extends Model {
    id!: number;
    jobTitle!: string;
    company!: string;
    logoUrl!: string;
    description!: string;
    jobUrl!: string;
    
    static associate() {
        this.belongsToMany(Course, { through: 'JobPosting_Course' });
    }
}

JobPosting.init(
    {
        jobTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        logoUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        jobUrl: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'JobPosting',
        tableName: 'job_posting'
    }
);

export default JobPosting;