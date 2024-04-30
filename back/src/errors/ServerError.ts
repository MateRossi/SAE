export class ServerError extends Error {
    constructor(message = 'Erro interno do servidor.') {
        super(message);
        this.name = 'ServerError';
    };
};