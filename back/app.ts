import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { sequelize } from './src/db/sequelize';
import Router from './routes';
import associateModels from './src/middleware/Associations';
import cors from 'cors';
import corsOptions from './src/config/corsOptions';
import credentials from './src/middleware/Credentials';
import cookieParser from 'cookie-parser';
import verifyJwt from './src/middleware/verifyJWT';
import auth from './src/routes/AuthRouter';
import logout from './src/routes/LogoutRouter';
import refresh from './src/routes/RefreshRouter';
import zipCode from './src/routes/ZipCodeRouter';
import registerGraduate from './src/routes/RegisterRouter';
import courses from './src/routes/PublicRouter';
import admin from './src/routes/AdminRouter';
import changeMail from './src/routes/ChangePwdRouter';

const app = express();
const port = process.env.PORT || 3000;

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

associateModels();

app.use('/admin', admin);
app.use('/auth', auth);
app.use('/register', registerGraduate);
app.use('/refresh', refresh);
app.use('/logout', logout);
app.use("/zipcode", zipCode);
app.use("/courses", courses);
app.use("/change-pwd", changeMail);

app.use(verifyJwt);

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