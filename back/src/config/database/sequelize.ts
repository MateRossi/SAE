import { Sequelize } from 'sequelize';
import { environment } from '../env/env.local';

export const sequelize = new Sequelize(environment.dbName, environment.dbUser, environment.dbPass, {
    host: environment.dbHost,
    port: environment.dbPort,
    dialect: 'postgres'}
);