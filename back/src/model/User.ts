import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize";
import Course from "./Course";
import Review from "./Review";

class User extends Model {
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
    
    public role!: string;
    public refreshToken!: string;
    
    static associate() {
        this.belongsTo(Course, { as: "course", foreignKey: {allowNull: false} });
        this.hasOne(Review, { as: "review", foreignKey: 'userId' });
    };

    static validateRole(value: number | null, role: string) {
        if (!value && role === 'graduate') {
            throw new Error('É necessario informar o ano de graduação');
        };
    };
};

User.init(
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
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'graduate',
        },
        graduationYear: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                is: {
                    args: [/19[5-9][0-9]|2[0-9]{3}/],
                    msg: 'Ano de graduação inválido',
                },
            },
        },
        refreshToken: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'user',
    },
);

User.beforeValidate((user: User) => {
    User.validateRole(user.graduationYear, user.role);
});

export default User;