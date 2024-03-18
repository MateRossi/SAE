import Admin from "../model/Admin";
import { NotFoundError } from "../utilities/Error/NotFoundError"; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { environment } from "../../env/env.local";

export class AdminService {
    static async getAllAdmins() {
        return Admin.findAll();
    };

    static async getAdminById(id: number) {
        const admin = await this.isExistent(id);
        return admin;
    };

    static async createAdmin(adminData: Admin) {
        const { login, password } = adminData;
        return Admin.create({ login, password });
    };

    static async updateAdmin(id: number, updatedData: Admin) {
        const admin = await this.isExistent(id);
        const { login, password } = updatedData;
        return admin.update({ login, password });
    };
    
    static async deleteAdmin(id: number) {
        const admin = await this.isExistent(id);
        await admin.destroy();
    };

    static async loginAdmin(login: string, password: string) {
        const admin = await Admin.findOne({ where: { login } });
        console.log('User' + admin)
        
        if (!admin) {
            throw new NotFoundError('Usuário não encontrado.');
        };

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            throw new Error('Senha incorreta ou nome de usuário incorretos.');
        };

        const token = jwt.sign({ id: admin.id, login: admin.login, role: admin.role }, environment.jwtSecret, {expiresIn: '1h'});

        return { login, token };
    }
    
    //verifica se o elemento existe. Se existir, retorna o elemento. Se não, retorna um erro.
    static async isExistent(id: number) {
        const admin = await Admin.findByPk(id);
        if (!admin) {
            throw new NotFoundError('Admin não encontrado.');
        };
        return admin;
    };
};