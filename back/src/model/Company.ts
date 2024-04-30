import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize";

class Company extends Model {
    public id!: number;
    public name!: string;
    public zipCode!: string;
    public street!: string;
    public neighborhood!: string;
    public city!: string;
    public state!: string;
    public country!: string;
};

Company.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zipCode: {
            type: DataTypes.STRING,
        },
        street: {
            type: DataTypes.STRING,
        },
        neighborhood: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        state: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Company',
        tableName: "company",
    },
);

export default Company;