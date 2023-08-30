// Cada tipo de situação dá acesso a certos tipos de cadastro.
// Se a pessoa apenas trabalha, ela deve ter preenchumento obrigatório dos campos relacionados ao seu emprego e assim por diante.

/*  Trabalhando
    Trabalhando e estudando
    Apenas estudando
    Não está trabalhando e nem estudando
    Outros
*/

const situations: Record<string, string[]> = {
    'Trabalhando': ['educationRequirement', 'worksInArea', 'positionId', 'companyId'],
    'Trabalhando e estudando': ['courseRelationshipLevel', 'educationRequirement', 'worksInArea', 'positionId', 'externalCourseId', 'companyId'],
    'Apenas estudando': ['courseRelationshipLevel', 'externalCourseId'],
    'Não está trabalhando e nem estudando': [],
}

export default situations; 