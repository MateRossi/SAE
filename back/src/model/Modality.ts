import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize";
import Course from "./Course";

class Modality extends Model {
    public id!: number;
    public description!: string;

    static associate() {
        this.hasMany(Course, {as: 'courses', foreignKey: 'modalityId' });
    };
};

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