import express from 'express';
import { userController } from '../controller/UserController';
import verifyRoles from '../middleware/verifyRoles';
import { mailController } from '../controller/MailController';
import multer from 'multer';
import { uploadDir } from '../../app';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

//import userToken from '../middleware/userMiddleware';
//import auth token

const userRouter = express.Router();

//ALTERAR PARA QUE O ADMIN TAMBÉM POSSA ALTERAR, OBTER E DELETAR.

//rotas básicas
userRouter.patch('/update-password', verifyRoles('graduate', 'admin'), userController.updateUserPassword);

//admin confirma egresso passando a matrícula
userRouter.patch('/graduates/:id/confirm-graduate', verifyRoles('admin'), userController.confirmGraduate);

//cria vários egressos de uma mesma modalidade:
userRouter.post(
    '/graduates/upload-graduates/:modalityId', 
    verifyRoles('admin'),
    upload.single("file"),
    userController.createBulkGraduatesOfSingleModality
);

//envio de email: egresso para egresso e admin para egresso.  
userRouter.post('/:id/send-message', verifyRoles('graduate', 'admin'), mailController.sendEmail);

//envio de emails: admin para vários egressos
userRouter.post('/:id/send-bulk-emails', verifyRoles('admin'), mailController.sendBulkEmails);

userRouter.get('/graduates/:id', verifyRoles('graduate', 'admin'), userController.getGraduateById);

//busca todas as informações relevantes de um egresso, para que o admin possa confirmar
userRouter.get('/admin/graduates/:id', verifyRoles('admin'), userController.getGraduateDetailsById);

//donwload das informações em formato de arquivo .csv
userRouter.get('/admin/download-csv', verifyRoles('admin'), userController.downloadGraduatesInfo);

userRouter.post('/admins', verifyRoles('admin'), userController.createAdmin);
userRouter.post('/admins/add-graduate', verifyRoles('admin'), userController.createGraduateByAdmin);

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
userRouter.get('/:id/same-course', verifyRoles('graduate'), userController.getGraduatesSameCourse);
userRouter.delete('/:id/delete-account', verifyRoles('graduate'), userController.deleteMyAccount);

export default userRouter;