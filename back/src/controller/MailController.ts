import { Request, Response } from "express";
import { transporter } from "../utils/mailer";
import { SYS_MAIL } from "../utils/mailer";
import createGraduateEmailHtml from "../utils/graduateEmailTemplate";
import updateInfoEmailTemplate from "../utils/updateInfoEmailTemplate";

export const mailController = {
    async sendEmail(req: Request, res: Response) {
        const { to, text, senderEmail, senderName, senderCourse } = req.body;

        if (!to || !text || !senderEmail || !senderName || !senderCourse) {
            return res.status(400).json('Erro ao enviar email. Dados insuficientes.')
        }

        const mailOptions = {
            from: SYS_MAIL,
            to: to,
            subject: '[SAEG] Você recebeu uma mensagem de um(a) ex-colega de curso!',
            html: createGraduateEmailHtml(text, senderEmail, senderName, senderCourse)
        };

        transporter.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {
                return res.status(500).json({ msg: 'Erro ao enviar email.', err: error })
            } else {
                return res.status(200).json({ msg: 'Email enviado.', info });
            }
        });
    },

    async sendBulkEmails(req: Request, res: Response) {
        const { subject, bcc, text } = req.body;

        if (!bcc || !text || !subject) {
            return res.status(400).json('Erro ao enviar emails. Dados insuficientes.');
        }

        console.log(bcc);

        const bccEmails = bcc
            .filter((graduate: { email: string; recebeEmails: boolean }) => graduate.recebeEmails)
            .map((graduate: { email: string }) => graduate.email);  

        const mailOptions = {
            from: SYS_MAIL,
            bcc: bccEmails,
            subject: `[SAEG] - ${subject}`,
            html: updateInfoEmailTemplate(text),
        };

        transporter.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {
                return res.status(500).json({ msg: 'Erro ao enviar emails.', err: error })
            } else {
                return res.status(200).json({ msg: 'Emails enviados.', info });
            }
        });
    }
}