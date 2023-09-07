import EmploymentType from "../model/EmploymentType";
import { NotFoundError } from "../utilities/Error/NotFoundError";

export class EmploymentTypeService {
    static async getAllEmploymentTypes() {
        return EmploymentType.findAll();
    };

    static async getEmploymentTypeById(id: number) {
        const employmentType = await this.isExistent(id);
        return employmentType;
    };

    static async createEmploymentType(employmentTypeData: EmploymentType) {
        const { description } = employmentTypeData;
        return EmploymentType.create({ description });
    };

    static async updateEmploymentType(id: number, updatedData: EmploymentType) {
        const employmentType = await this.isExistent(id);
        const { description } = updatedData;
        return employmentType.update({ description });
    };

    static async deleteEmploymentType(id: number) {
        const employmentType = await this.isExistent(id);
        await employmentType.destroy();
    };

    //verifica se o elemento existe. Se existir, retorna o elemento. Se não, retorna um erro.
    static async isExistent(id: number) {
        const employmentType = await EmploymentType.findByPk(id);
        if (!employmentType) {
            throw new NotFoundError('Tipo de vínculo empregatício não encontrado.');
        };
        return employmentType;
    };
};