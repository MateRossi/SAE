import express from 'express';
import { mailController } from '../controller/MailController';

const mailRouter = express.Router();

mailRouter.post('/single', mailController.sendEmail);

export default mailRouter;