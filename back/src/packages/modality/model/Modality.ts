import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../../config/database/sequelize";

class Modality extends Model {
    public id!: number;
    public description!: string;
}

Modality.init(
    {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: "Modality",
        tableName: "modality",
    },
);

export default Modality;