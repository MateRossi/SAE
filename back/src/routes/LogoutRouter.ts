import express from 'express';
import { userController } from '../controller/UserController';

const logout = express.Router();

logout.get('/', userController.logout);

export default logout;