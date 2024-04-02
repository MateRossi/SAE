import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/database/sequelize';
import Graduate from './Graduate';

class Review extends Model {
    public id!: number;
    public desireToWorkArea!: number;
    public learningLevelRating!: number;
    public courseRating!: number;
    public campusRating!: number;
    public infraRating!: number;
    public theoKnowledgeRating!: number;
    public practKnowledgeRating!: number;
    public teachersRating!: number;
    public expectationSatisfaction!: string;

    public graduateId!: number;

    static associate() {
        this.belongsTo(Graduate, { as: 'graduateReview', foreignKey: 'graduateId' });
    };
};

Review.init(
    {
        desireToWorkArea: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5,
            },
            allowNull: false,
        },
        learningLevelRating: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5,
            },
            allowNull: false,
        },
        courseRating: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5,
            },
            allowNull: false,
        },
        campusRating: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5,
            },
            allowNull: false,
        },
        infraRating: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5,
            },
            allowNull: false,
        },
        theoKnowledgeRating: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5,
            },
            allowNull: false,
        },
        practKnowledgeRating: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5,
            },
            allowNull: false,
        },
        teachersRating: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5,
            },
            allowNull: false,
        },
        courseExpectation: {
            type: DataTypes.ENUM(
                'Superou as expectativas', 
                'Atendeu as expectativas',
                'Não atendeu as expectativas',
                'Não sabe / prefere não opinar',
            ),
            allowNull: true,
        },
        graduateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'Review',
        tableName: 'review',
    },
);

export default Review;