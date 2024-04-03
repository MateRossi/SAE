import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/database/sequelize";
import Course from "../model/Course";
import Review from "./Review";

class Graduate extends Model {
    public id!: number;
    public enrollment!: string;
    public name!: string;
    public email!: string;
    public password!: string;
    public allowEmails!: boolean;
    public phoneNumber!: string;
    public tellTrajectory!: boolean;
    public workedBefore!: boolean;
    public degreeLevel!: string; 
    public commentary!: string;
    public graduationYear!: number;
    
    public courseId!: number;
    public reviewId!: number;
    
    public role: string = 'graduate';
    
    static associate() {
        this.belongsTo(Course, { as: "course", foreignKey: {allowNull: false} });
        this.hasOne(Review, { as: "review", foreignKey: 'graduateId' });
    };
};

Graduate.init(
    {
        //matricula
        enrollment: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        allowEmails: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        tellTrajectory: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        workedBefore: {
            type: DataTypes.BOOLEAN,
            allowNull: true, 
        },
        degreeLevel: {
            type: DataTypes.ENUM(
                'Técnico Completo', 
                'Superior Completo',
                'Pós graduação lato sensu incompleta',
                'Pós graduação lato sensu completa',
                'Pós graduação stricto sensu incompleta',
                'Pós graduação stricto sensu completa',
                'Não sabe / prefere não opinar', 
            ),
            allowNull: true,
        },
        commentary: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        graduationYear: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                is: /19[5-9][0-9]|2[0-9]{3}/,
            }
        },
    },
    {
        sequelize,
        modelName: 'Graduate',
        tableName: 'graduate',
    },
);

export default Graduate;