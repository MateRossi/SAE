import { Request, Response } from "express";
import { transporter } from "../utils/mailer";
import { SYS_MAIL } from "../utils/mailer";

export const mailController = {
    async sendEmail(req: Request, res: Response) {
        const { to, subject, text } = req.body;

        if (!to || !subject || !text) {
            return res.status(400).json('Erro ao enviar email. Dados insuficientes.')
        }

        const mailOptions = {
            from: SYS_MAIL,
            to: to,
            subject: subject,
            text: text,
        };

        transporter.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {
                return res.status(500).json({ msg: 'Erro ao enviar email.', err: error })
            } else {
                return res.status(200).json({ msg: 'Email enviado.', info });
            }
        });
    }
}