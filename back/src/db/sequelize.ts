import { Sequelize } from 'sequelize';
import pg from 'pg';

const { POSTGRES_DATABASE, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT } = process.env;

if (!POSTGRES_DATABASE || !POSTGRES_USER || !POSTGRES_PASSWORD || !POSTGRES_HOST || !POSTGRES_PORT) {
    throw new Error("Missing required environment variables for database connection.");
}

export const sequelize = new Sequelize(POSTGRES_DATABASE, POSTGRES_USER, POSTGRES_PASSWORD, {
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT),
    dialect: 'postgres',
    dialectModule: pg,
    timezone: '+00:00',
});