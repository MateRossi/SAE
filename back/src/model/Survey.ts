import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize";
import Company from "./Company";
import Graduate from "./Graduate";

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
    public companyId!: number;
    public graduateId!: number;

    static validatePosition(value: string|boolean, situation: string) {
        if ((situation === 'Trabalhando' || situation === 'Trabalhando e estudando') && !value) {
            throw new Error('Se você está trabalhando, por favor preencha as informações referentes ao cargo!');
        };
    }; 
    
    static validateExternalCourse(value: string, situation: string) {
        if ((situation === 'Apenas estudando' || situation === 'Trabalhando e estudando') && !value) {
            throw new Error('Se você está estudando, por favor preencha as informações referentes ao curso!');
        };
    };

    static associate() {
        this.belongsTo(Company, { as: 'surveyCompany', foreignKey: 'companyId' });
        this.belongsTo(Graduate, { as: 'surveyGraduate', foreignKey: 'graduateId' });
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
            validate: {
                validatePositionName(value: string, situation: string) {
                    Survey.validatePosition(value, situation);
                }   
            },
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
            validate: {
                validateEmploymentType(value: string, situation: string) {
                    Survey.validatePosition(value, situation);
                }   
            },
            allowNull: true,
        },
        worksInArea: {
            type: DataTypes.BOOLEAN,
            validate: {
                validateWorksInArea(value: boolean, situation: string) {
                    Survey.validatePosition(value, situation);
                }   
            },
            allowNull: true,
        },
        positionEducationRequirement: {
            type: DataTypes.INTEGER,
            validate: {
                validatePositionEducationRequirement(value: string, situation: string) {
                    Survey.validatePosition(value, situation);
                },
                min: 1,
                max: 5,   
            },
            allowNull: true,
        },
        externalCourseName: {
            type: DataTypes.STRING,
            validate: {
                validateExternalCourseName(value: string, situation: string) {
                    Survey.validateExternalCourse(value, situation);
                },   
            },
            allowNull: true,
        },
        courseRelationLevel: {
            type: DataTypes.INTEGER,
            validate: {
                validateExternalCourseName(value: string, situation: string) {
                    Survey.validateExternalCourse(value, situation);
                },
                min: 1,
                max: 5,   
            },
            allowNull: true,
        },
        companyId: {
            type: DataTypes.INTEGER,
            validate: {
                validateCompanyId(value: string, situation: string) {
                    Survey.validatePosition(value, situation);
                }   
            },
            allowNull: true,
        },
        graduateId: {
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