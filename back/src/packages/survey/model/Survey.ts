import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../../config/database/sequelize";
import Position from "../../position/model/Position";
import ExternalCourse from "../../education/model/ExternalCourse";
import DegreeLevel from "../../education/model/DegreeLevel";
import Company from "../../company/model/Company";

class Survey extends Model {
    public id!: number;
    public situation!: string;
    public courseRelationshipLevel!: number;
    public educationRequirement!: number;
    public worksInArea!: boolean;
    public positionId!: number;
    public externalCourseId!: number;
    public degreeLevelId!: number;
    public companyId!: number;

    static associate() {
        this.belongsTo(Position, { as: 'surveyPosition', foreignKey: 'positionId' });
        this.belongsTo(ExternalCourse, { as: 'surveyExternalCourse', foreignKey: 'externalCourseId' });
        this.belongsTo(DegreeLevel, { as: 'surveyDegreeLevel', foreignKey: 'degreeLevelId' });
        this.belongsTo(Company, { as: 'surveyCompany', foreignKey: 'companyId' });
    };
};

Survey.init(
    {
        situation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        courseRelationshipLevel: {
            type: DataTypes.INTEGER,
        },
        educationRequirement: {
            type: DataTypes.INTEGER,
        },
        worksInArea: {
            type: DataTypes.BOOLEAN,
        },
        positionId: {
            type: DataTypes.INTEGER,
        },
        externalCourseId: {
            type: DataTypes.INTEGER,
        },
        degreeLevelId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        companyId: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        modelName: "Survey",
        tableName: "survey",
    },
);

export default Survey;