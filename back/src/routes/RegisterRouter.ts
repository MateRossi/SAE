import express from 'express';
import { userController } from '../controller/UserController';

const registerGraduate = express.Router();

registerGraduate.post('/', userController.createGraduate);

export default registerGraduate;