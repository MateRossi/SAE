import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/database/sequelize';
import Modality from './Modality';
import Graduate from './Graduate';

class Course extends Model {
    public id!: number;
    public name!: string;
    public acronym!: string;
    public modalityId!: number;

    static associate() {
        this.belongsTo(Modality, { as: 'modality', foreignKey: {allowNull: false} });
        this.hasMany(Graduate, {as: 'graduates', foreignKey: 'courseId' });
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