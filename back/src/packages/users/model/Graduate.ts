import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../../config/database/sequelize";
import Course from "../../course/model/Course";

class Graduate extends Model {
    public id!: number;
    public name!: string;
    public login!: string;
    public password!: string;
    public courseId!: number;

    public role: string = 'graduate';

    //demais dados do egresso.
    
    static associate() {
        this.belongsTo(Course, { as: "courseGraduate", foreignKey: 'courseId' });
    };
};

Graduate.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Graduate',
        tableName: 'graduate',
    },
);

export default Graduate;