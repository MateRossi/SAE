import express from 'express';
import { sequelize } from './config/database/sequelize';
import Router from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(Router);
(async () => {
    try {
        await sequelize.sync();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
        console.error('Erro ao conectar com o banco de dados:', error);
    }
})();

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});