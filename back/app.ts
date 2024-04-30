import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { sequelize } from './src/db/sequelize';
import Router from './routes';
import associateModels from './src/middleware/Associations';
import cors from 'cors';
import corsOptions from './src/config/corsOptions';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));

app.use(express.json());

associateModels();

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