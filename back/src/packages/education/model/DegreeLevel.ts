import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../../config/database/sequelize";

class DegreeLevel extends Model {
    public id!: number;
    public description!: string;
};

DegreeLevel.init(
    {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: "DegreeLevel",
        tableName: "degree_level",
    },
);

export default DegreeLevel;

