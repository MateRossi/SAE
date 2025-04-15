import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import axios from '../../api/axios';
const PWD_URL = '/change-pwd/send-mail';

function ForgotPassword() {
    const errRef = useRef();
    const userRef = useRef();
    const succesRef = useRef();

    const [errMsg, setErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const [loading, setLoading] = useState(false);

    const [mail, setMail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(PWD_URL,
                JSON.stringify({ mail: mail }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response);
            setLoading(false);
            setMail('');
            setSuccessMsg("Uma nova senha foi gerada. Verifique seu email.");
        } catch (err) {
            setLoading(false);
            setMail('');
            if (!err?.response) {
                setErrMsg('Sem resposta do servidor');
            } else if (err.response?.status === 400) {
                setErrMsg('Email é necessário');
            } else if (err.response?.status === 401) {
                setErrMsg('Solicitação falhou. Verifique sua conexão.');
            } else {
                setErrMsg('Request failed', err.message);
            }
            errRef.current.focus();
        }
    }

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [mail]);

    if (loading) {
        return (
            <main className="Content">
                <p>Enviando...</p>
            </main>
        )
    }

    return (
        <main className="Content">
            <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live="assertive">
                {errMsg}
            </p>
            <p ref={succesRef} className={successMsg ? 'successMsg' : 'offscreen'} aria-live="assertive">
                {successMsg}
            </p>
            <form onSubmit={handleSubmit} className="loginForm" style={{ marginTop: 'auto', marginBottom: 'auto' }}>
                <h3>Gerar nova senha</h3>
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    ref={userRef}
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    autoComplete="off"
                    required
                />
                <button type="submit">Enviar</button>
                <span className="LoginLinks">
                    <Link to={'/'}>Entrar</Link>
                    <Link to={'/register'}>Solicitar cadastro</Link>
                </span>
            </form>
        </main>
    )
}

export default ForgotPassword;