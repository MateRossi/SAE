import { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

function AddModalityPage() {
    const [modality, setModality] = useState('');

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    const successRef = useRef();
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [modality]);

    useEffect(() => {
        setSuccessMsg('');
    }, [modality]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newModality = {
            description: modality,
        }

        try {
            await axiosPrivate.post('/modalities', newModality);
            setSuccessMsg('Modalidade adicionada com sucesso.');
        } catch (error) {
            if (!error?.response) {
                setErrMsg('Sem resposta.');
            } else if (error.response?.status === 400) {
                setErrMsg('Dados faltantes.');
            } else if (error.response?.status === 401) {
                setErrMsg('Não autorizado.');
            } else if (error.response?.status === 409) {
                setErrMsg('Conflito. Modalidade já está cadastrada.')
            } else {
                setErrMsg('Falha ao adicionar modalidade.');
            }
        }
    }

    const handleCancel = () => {
        navigate(-1);
    }

    return (
        <div className="page">
            <h1 className="pageTitle">Modalidades - Adicionar Modalidade</h1>
            <main className="pageContent">
                <p className="page-subtitle">
                    Adicione as modalidades dos cursos ofertados pela sua instituição de ensino.
                </p>
                <form className="loginForm" onSubmit={handleSubmit}>
                    <h3 className="FormTitle" style={{ marginBottom: '0.5rem' }}>Informações da Modalidade</h3>
                    <p ref={successRef} className={successMsg ? 'successMsg' : 'offscreen'} aria-live='assertive'>
                        {successMsg}
                    </p>
                    <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live='assertive'>
                        {errMsg}
                    </p>
                    <label htmlFor="courseName">Nome do Modalidade: </label>
                    <input
                        id="courseName"
                        type="text"
                        required
                        onChange={(e) => setModality(e.target.value)}
                        onFocus={(e) => e.target.value = ''}
                    />
                    <button
                        type="submit"
                        disabled={!modality ? true : false}>
                        Confirmar
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

export default AddModalityPage;