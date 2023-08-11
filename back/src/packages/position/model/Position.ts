import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../config/database/sequelize';
import EmploymentType from './EmploymentType';

class Position extends Model {
    public id!: number;
    public description!: string;
    public employmentTypeId!: number;

    static associate() {
        this.belongsTo(EmploymentType, { as: 'positionEmploymentType', foreignKey: 'employmentTypeId' });
    };
};

Position.init(
    {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        employmentTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Position',
        tableName: 'position',
    },
);

export default Position;
