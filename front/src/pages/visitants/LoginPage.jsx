import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import SystemDescription from "../../components/SystemDescription";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";

import * as jose from 'jose';
import axios from '../../api/axios';
const LOGIN_URL = '/auth';

function LoginPage() {
    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const [user, resetUser, attributeObj] = useInput('user', '');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [check, toggleCheck] = useToggle('persist', false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ login: user, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            //console.log("Resposta do login: ", JSON.stringify(response?.data));

            const accessToken = response?.data?.accessToken;

            const decodedToken = jose.decodeJwt(accessToken);
            console.log("Decoded token: ", JSON.stringify(decodedToken));
            const { role, id } = decodedToken.UserInfo;

            setAuth({ user, pwd, role, accessToken, userId: id });
            resetUser();
            setPwd('');

            if (role === 'admin') {
                navigate('/admin', { replace: true });
            } else {
                navigate('/graduate', { replace: true });
            }

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response.');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing username or password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login failed', err.message);
            }
            errRef.current.focus();
        }
    };

    return (
        <main className="Content">
            <SystemDescription />
            <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live="assertive">
                {errMsg}
            </p>
            <form onSubmit={handleSubmit} className="loginForm">
                <h3>Faça seu login</h3>
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    ref={userRef}
                    autoComplete="off"
                    {...attributeObj}
                    required
                />
                <label htmlFor="password">Senha:</label>
                <input
                    id="password"
                    type="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button type="submit">Entrar</button>
                <div className="persistCheck">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={toggleCheck}
                        checked={check}
                    />
                    <label htmlFor="persist">Manter Login</label>
                </div>
                <span className="LoginLinks">
                    <Link to={'/forgotPassword'}>Esqueci minha senha</Link>
                    <Link to={'/register'}>Solicitar cadastro</Link>
                </span>
            </form>
        </main>
    )
}

export default LoginPage;