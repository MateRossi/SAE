import nodemailer from 'nodemailer';

const { SYS_MAIL, SYS_PASS, CLIENT_ID, SECRET, REFRESH_TOKEN } = process.env;

if (!SYS_MAIL || !SYS_PASS || !CLIENT_ID || !SECRET || !REFRESH_TOKEN) {
    throw new Error('Missing required environment variables to send emails.')
}

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,               
    secure: true,
    auth: {
        type: 'OAuth2',
        user: SYS_MAIL,
        pass: SYS_PASS,
        clientId: CLIENT_ID,
        clientSecret: SECRET,
        refreshToken: REFRESH_TOKEN,
    },
} as nodemailer.TransportOptions);

export {
    transporter,
    SYS_MAIL,
};
