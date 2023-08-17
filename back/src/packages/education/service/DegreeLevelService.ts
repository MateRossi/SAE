import DegreeLevel from "../model/DegreeLevel";
import { NotFoundError } from "../../utilities/Error/NotFoundError";

export class DegreeLevelService {
    static async getAllDegreeLevels() {
        return DegreeLevel.findAll();
    };

    static async getDegreeLevelById(id: number) {
        const degreeLevel = await this.isExistent(id);
        return degreeLevel;
    };

    static async createDegreeLevel(degreeLevelData: DegreeLevel) {
        const { description } = degreeLevelData;
        return DegreeLevel.create({ description });
    };

    static async updateDegreeLevel(id: number, updatedData: DegreeLevel) {
        const degreeLevel = await this.isExistent(id);
        const { description } = updatedData;
        return degreeLevel.update({ description });
    };

    static async deleteDegreeLevel(id: number) {
        const degreeLevel = await this.isExistent(id);
        await degreeLevel.destroy();
    };

    //verifica se o elemento existe. Se existir, retorna o elemento. Se não, retorna um erro.
    static async isExistent(id: number) {
        const degreeLevel = await DegreeLevel.findByPk(id);
        if (!degreeLevel) {
            throw new NotFoundError('Nível de escolaridade não encontrado.');
        };
        return degreeLevel;
    };
};