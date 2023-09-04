import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../../config/database/sequelize";

class Admin extends Model {
    public id!: number;
    public login!: string;
    public password!: string;
};

Admin.init(
    {
        login: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Admin',
        tableName: 'admin',
    },
);

export default Admin;