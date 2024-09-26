import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize";
import User from "./User";

class Survey extends Model {
    public id!: number;
    public situation!: string;
    
    //atributos do trabalho
    public positionName!: string;
    public employmentType!: string;
    public worksInArea!: boolean;
    public positionEducationRequirement!: number;

    //atributos do curso externo
    public externalCourseName!: string;
    public courseRelationLevel!: number;

    //foreign keys
    public companyName!: string;
    public userId!: number;

    static associate() {
        this.belongsTo(User, { as: 'surveyUser', foreignKey: 'userId' });
    };
};

Survey.init(
    {
        situation: {
            type: DataTypes.ENUM(
                'Trabalhando', 
                'Trabalhando e estudando',
                'Apenas estudando',
                'Não está trabalhando e nem estudando',
            ),
            allowNull: false,
        },
        positionName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        employmentType: {
            type: DataTypes.ENUM(
                'Empregado com carteira assinada',
                'Funcionário público concursado',
                'Autônomo / prestador de serviço',
                'Em contrato temporário',
                'Estagiário',
                'Proprietário de empresa / negócio',
                'Outros',
            ),
            allowNull: true,
        },
        worksInArea: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        positionEducationRequirement: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5,   
            },
            allowNull: true,
        },
        externalCourseName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        courseRelationLevel: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5,   
            },
            allowNull: true,
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Survey",
        tableName: "survey",
    },
);

export default Survey;