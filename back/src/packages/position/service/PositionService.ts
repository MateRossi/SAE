import Position from "../model/Position";
import { EmploymentTypeService } from "./EmploymentTypeService";
import { NotFoundError } from "../../utilities/Error/NotFoundError";

export class PositionService {
    static async getAllPositions() {
        return Position.findAll();
    };

    static async getPositionById(id: number) {
        const position = await this.isExistent(id);
        return position;
    };

    static async createPosition(positionData: Position) {
        const { description, employmentTypeId } = positionData;
        await EmploymentTypeService.isExistent(employmentTypeId);
        return Position.create({ description, employmentTypeId });
    };

    static async updatePosition(id: number, updatedData: Position) {
        const position = await this.isExistent(id);
        const { description, employmentTypeId } = updatedData;
        await EmploymentTypeService.isExistent(employmentTypeId);
        return position.update({ description, employmentTypeId });
    };
    
    static async deletePosition(id: number) {
        const position = await this.isExistent(id);
        await position.destroy();
    };
    
    //verifica se o elemento existe. Se existir, retorna o elemento. Se não, retorna um erro.
    static async isExistent(id: number) {
        const position = await Position.findByPk(id);
        if (!position) {
            throw new NotFoundError('Cargo não encontrado.');
        };
        return position;
    };
};