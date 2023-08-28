import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../../config/database/sequelize";

class ExternalCourse extends Model {
    public id!: number;
    public description!: string;
};

ExternalCourse.init(
    {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "ExternalCourse",
        tableName: "external_course",
    },
);

export default ExternalCourse;