import express from 'express';
import { userController } from '../controller/UserController';

const auth = express.Router();

auth.post('/', userController.login);

export default auth;