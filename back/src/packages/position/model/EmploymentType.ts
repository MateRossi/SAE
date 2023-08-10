import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../../config/database/sequelize";
// relacionar com a tabela POSITION.

class EmploymentType extends Model {
    public id!: number;
    public description!: string;

    /*static associate() {
        this.has
    }*/
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