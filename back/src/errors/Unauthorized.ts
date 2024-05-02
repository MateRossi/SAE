export class Unauthorized extends Error {
    constructor(message = 'Accesso não autorizado') {
        super(message);
        this.name = 'AuthError';
    };
};