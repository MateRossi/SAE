import express from 'express';
import { userController } from '../controller/UserController';
//import userToken from '../middleware/userMiddleware';
//import auth token

const userRouter = express.Router();

//ALTERAR PARA QUE O ADMIN TAMBÉM POSSA ALTERAR, OBTER E DELETAR.

//rotas básicas
userRouter.patch('/update-password', userController.updateUserPassword);

//graduates
userRouter.post('/graduates', userController.createGraduate);
userRouter.post('/admins', userController.createAdmin);

userRouter.get('/graduates', userController.getAllGraduates);
userRouter.get('/admins', userController.getAllAdmins);

userRouter.put('/graduates/:id', userController.updateGraduate);
userRouter.put('/admins/:id', userController.updateAdmin);

userRouter.delete('/graduates/:id', userController.deleteGraduate);
userRouter.delete('/admins/:id', userController.deleteAdmin);

userRouter.post('/login', userController.login);
userRouter.get('/logout', userController.logout);

//all users
userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);

//rotas específicas de um unico egresso
userRouter.get('/:id/same-course', userController.getGraduatesSameCourse);

export default userRouter;