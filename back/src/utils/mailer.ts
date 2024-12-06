import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,               
    secure: true,
    auth: {
        type: 'OAuth2',
        user: SYS_MAIL,
        pass: SYS_PASS,
        clientId: clientId,
        clientSecret: secret,
        refreshToken: refreshToken,
    },
} as nodemailer.TransportOptions);

export {
    transporter,
    SYS_MAIL,
};
