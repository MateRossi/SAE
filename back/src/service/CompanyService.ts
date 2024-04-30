import Company from "../model/Company";
import { NotFoundError } from "../errors/NotFoundError";

export class CompanyService {
    static async getAllCompanies() {
        return Company.findAll();
    };

    static async getCompanyById(id: number) {
        const company = await this.isExistent(id);
        return company;
    };

    static async createCompany(companyData: Company) {
        const { name, zipCode, street, neighborhood, city, state, country } = companyData;
        return Company.create({ name, zipCode, street, neighborhood, city, state, country });
    };

    static async updateCompany(id: number, updatedData: Company) {
        const company = await this.isExistent(id);
        const { name, zipCode, street, neighborhood, city, state, country } = updatedData;
        return company.update({ name, zipCode, street, neighborhood, city, state, country });
    };
    
    static async deleteCompany(id: number) {
        const company = await this.isExistent(id);
        await company.destroy();
    };
    
    //verifica se o elemento existe. Se existir, retorna o elemento. Se não, retorna um erro.
    static async isExistent(id: number) {
        if (!id) {
            throw new Error('Identificador inválido');
        }
        const company = await Company.findByPk(id);
        if (!company) {
            throw new NotFoundError('Empresa não encontrada.');
        };
        return company;
    };
};