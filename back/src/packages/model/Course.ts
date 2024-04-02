import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/database/sequelize';
import Modality from './Modality';

class Course extends Model {
    public id!: number;
    public name!: string;
    public acronym!: string;
    public modalityId!: number;

    static associate() {
        this.belongsTo(Modality, { as: 'modality', foreignKey: {allowNull: false} });
    };
};

Course.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        acronym: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: 'Course',
        tableName: 'course',
    },
);

export default Course;