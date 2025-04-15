import { useMemo, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import '../page.css';

function SendGraduateMessage() {
    const [loading, setLoading] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();

    const mailData = useMemo(() => location.state || {}, [location.state]);
    const [message, setMessage] = useState('');

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    const successRef = useRef();
    const [successMsg, setSuccessMsg] = useState('');

    const handleCancel = () => {
        navigate(-1);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const mail = {
            to: mailData?.graduate?.email,
            text: message,
            senderEmail: auth.email,
            senderName: auth.name,
            senderCourse: mailData?.courseName,        
        }

        try {
            const response = await axiosPrivate.post(`/users/${auth.id}/send-message`, mail);
            setSuccessMsg('Mensagem enviada.');
            setLoading(false);
            console.log(response);
        } catch (error) {
            setLoading(false);
            if (!error?.response) {
                setErrMsg('Sem resposta.');
            } else if (error.response?.status === 400) {
                setErrMsg('Dados faltantes.');
            } else if (error.response?.status === 401) {
                setErrMsg('Não autorizado.');
            } else {
                setErrMsg('Falha ao enviar mensagem.');
            }
        }
    }

    return (
        <div className="page">
            <h1 className="pageTitle">Enviar Mensagem</h1>
            <main className="pageContent">
                <p className="page-subtitle">
                    Envie uma mensagem para {mailData?.graduate?.name}.
                </p>
                {
                    loading ? <div>Enviando...</div> : null
                }
                <form className="loginForm" onSubmit={handleSubmit}>
                    <h3 className="FormTitle" style={{ marginBottom: '0.5rem' }}>Conteúdo da Mensagem</h3>
                    <p ref={successRef} className={successMsg ? 'successMsg' : 'offscreen'} aria-live='assertive'>
                        {successMsg}
                    </p>
                    <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live='assertive'>
                        {errMsg}
                    </p>
                    <textarea
                        name="message"
                        id="message-text"
                        onChange={(e) => setMessage(e.target.value)}
                        className="mail-text-area"
                    >
                    </textarea>
                    <button
                        type="submit"
                        disabled={!message ? true : false}>
                        Enviar!
                    </button>
                    <button
                        className="button-back"
                        onClick={handleCancel}
                    >
                        Voltar
                    </button>
                </form>
            </main>
        </div>
    )
}

export default SendGraduateMessage;