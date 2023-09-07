import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/database/sequelize";

class Admin extends Model {
    public id!: number;
    public login!: string;
    public password!: string;
    public role: string = 'admin';
};

Admin.init(
    {
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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