import Course from "../model/Course";
import Modality from "../model/Modality";
import { NotFoundError } from "../errors/NotFoundError";

export class ModalityService {
    static async getAllModalities() {
        return Modality.findAll({ 
            include: [{ 
                model: Course, 
                as: 'courses',
                attributes: ['id', 'name', 'acronym'],
            }]
        });
    };

    static async getModalityById(id: number) {
        const modality = await this.isExistent(id);
        return modality;
    };

    static async createModality(modalityData: Modality) {
        const { description } = modalityData;
        return Modality.create({ description });
    };

    static async updateModality(id: number, updatedData: Modality) {
        const modality = await this.isExistent(id);
        const { description } = updatedData;
        return modality.update({ description });
    };
    
    static async deleteModality(id: number) {
        const modality = await this.isExistent(id);
        await modality.destroy();
    };
    
    //verifica se o elemento existe. Se existir, retorna o elemento. Se não, retorna um erro.
    static async isExistent(id: number) {
        if (!id) {
            throw new Error('Identificador inválido');
        }
        const modality = await Modality.findOne({ 
            where: {id},
            include: [{ 
                model: Course, 
                as: 'courses',
                attributes: ['id', 'name', 'acronym'],
            }]
        });
        if (!modality) {
            throw new NotFoundError('Modalidade não encontrada.');
        };
        return modality;
    };
};