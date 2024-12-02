import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function EditModalityPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [modality, setModality] = useState(location.state?.modality || {});

    const axiosPrivate = useAxiosPrivate();

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
        e.preventDefault();

        const updatedModality = {
            description: modality?.description
        };

        try {
            await axiosPrivate.put(`/modalities/${modality.id}`, updatedModality);
            setSuccessMsg('Dados alterados');
            successRef.current.focus();
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Sem resposta.');
            } else if (err.response?.status === 400) {
                setErrMsg('Dados faltantes');
            } else if (err.response?.status === 401) {
                setErrMsg('Não autorizado');
            } else {
                setErrMsg('Falha ao alterar dados');
                console.log(err);
            }
            errRef.current.focus();
        }
    };

    if (!modality || Object.keys(modality).length === 0) {
        return (
            <div className="page">
                <h1 className="pageTitle">Modalidades dos cursos ofertados - Editar Modalidade</h1>
                <main className="pageContent">
                    <h3>Modalidade não encontrada.</h3>
                    <Link to='/admin/modalities'>Voltar</Link>
                </main>
            </div>
        );
    }

    const handleCancel = () => {
        navigate(-1);
    }

    return (
        <div className="page">
            <h1 className="pageTitle">Modalidades dos cursos ofertados - Editar Modalidade</h1>
            <main className="pageContent">
                <p className="page-subtitle">
                    Altere o nome da modalidade.
                </p>
                <form className="loginForm" onSubmit={handleSubmit}>
                    <h3 className="FormTitle" style={{ marginBottom: '0.5rem' }}>Informações da Modalidade</h3>
                    <p ref={successRef} className={successMsg ? 'successMsg' : 'offscreen'} aria-live='assertive'>
                        {successMsg}
                    </p>
                    <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live='assertive'>
                        {errMsg}
                    </p>
                    <label htmlFor="modalityName">Nome do Modalidade: </label>
                    <input
                        id="modalityName"
                        type="text"
                        required
                        onChange={(e) => setModality(prevState => ({
                            ...prevState,
                            description: e.target.value
                        }))}
                        defaultValue={modality?.description}
                    />
                    <button
                        type="submit"
                        disabled={!modality?.description ? true : false}>
                        Salvar Mudanças
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
    );
}

export default EditModalityPage;