import express from 'express';
import { userController } from '../controller/UserController';
import verifyRoles from '../middleware/verifyRoles';
//import userToken from '../middleware/userMiddleware';
//import auth token

const userRouter = express.Router();

//ALTERAR PARA QUE O ADMIN TAMBÉM POSSA ALTERAR, OBTER E DELETAR.

//rotas básicas
userRouter.patch('/update-password', verifyRoles('graduate', 'admin'), userController.updateUserPassword);

userRouter.get('/graduates/:id', verifyRoles('admin'), userController.getGraduateById);

//graduates
userRouter.post('/admins', verifyRoles('admin'), userController.createAdmin);

userRouter.get('/graduates', verifyRoles('admin'), userController.getAllGraduates);
userRouter.get('/admins', verifyRoles('admin'), userController.getAllAdmins);

userRouter.put('/graduates/:id', verifyRoles('graduate', 'admin'), userController.updateGraduate);
userRouter.put('/admins/:id', verifyRoles('admin'), userController.updateAdmin);

userRouter.delete('/graduates/:id', verifyRoles('graduate', 'admin'), userController.deleteGraduate);
userRouter.delete('/admins/:id', verifyRoles('admin'), userController.deleteAdmin);

//all users
userRouter.get('/', verifyRoles('admin'), userController.getAllUsers);
userRouter.get('/:id', verifyRoles('admin'), userController.getUserById);

//rotas específicas de um unico egresso
userRouter.get('/:id/same-course', verifyRoles('admin'), userController.getGraduatesSameCourse);

export default userRouter;