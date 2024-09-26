import express from 'express';
import { userController } from '../controller/UserController';

const registerGraduate = express.Router();

registerGraduate.post('/', userController.register);

export default registerGraduate;