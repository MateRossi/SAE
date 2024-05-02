import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/User';

async function handleLogin (req: Request, res: Response) {
    const { login, password } = req.body;
    if (!login || password) return res
        .status(400)
        .json({ 'message': 'Login e senha são necessários' });
    
    const foundUser = await User.findOne({ where: { email: login } });
    if (!foundUser) return res.sendStatus(401); //Unauthorized.
    //evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        //create JWT -> token and refresh token
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.email,
                    "role": foundUser.role,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        //Saving refresh token with current user.
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

export default handleLogin;