import express from 'express';
import { userController } from '../controller/UserController';

const admin = express.Router();

admin.post('/', userController.createAdmin);

export default admin;