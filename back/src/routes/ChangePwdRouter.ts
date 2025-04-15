import express from 'express';
import { mailController } from '../controller/MailController';

const changeMail = express.Router();

changeMail.post("/send-mail", mailController.sendPasswordChangeMail);

export default changeMail;