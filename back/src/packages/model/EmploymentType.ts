import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/database/sequelize";
import Position from "./Position";
// relacionar com a tabela POSITION.

class EmploymentType extends Model {
    public id!: number;
    public description!: string;

    static associate() {
        this.hasMany(Position, { as: 'positionEmploymentType', foreignKey: 'employmentTypeId' });
    };
};

EmploymentType.init(
    {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: "EmploymentType",
        tableName: "employment_type",
    },
);

export default EmploymentType;