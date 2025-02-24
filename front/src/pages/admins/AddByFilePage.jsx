import { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Dropdown from "../../components/Dropdown";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import Report from "../../components/reportComp/Report";
import csvModel from '../../img/csvModel.png';

function AddByFilePage() {
    const errRef = useRef();
    const successRef = useRef();

    const axiosPrivate = useAxiosPrivate();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const [selected, setSelected] = useState(null);
    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const [file, setFile] = useState(null);

    const [modalities, setModalities] = useState([]);

    const [result, setResult] = useState({});

    useEffect(() => {
        let isMounted = true;
        const getModalities = async () => {
            try {
                const response = await axiosPrivate.get(`/modalities`);
                if (isMounted) {
                    setModalities(response.data);
                    setIsLoading(false);
                }
            } catch (err) {
                console.error(err);
                if (!err?.response) {
                    setErrMsg('Sem resposta.');
                } else if (err.response?.status === 400) {
                    setErrMsg('Dados faltantes.');
                } else if (err.response?.status === 401) {
                    setErrMsg('Não autorizado.');
                } else {
                    setErrMsg('Falha ao adicionar curso.');
                }
            }
        }

        getModalities();

        return () => isMounted = false;
    }, [axiosPrivate]);

    useEffect(() => {
        setErrMsg('');
        setSuccessMsg('');
    }, [selected, file])

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrMsg('');

        if (!file) {
            alert("Por favor, selecione um arquivo antes de enviar!");
            return;
        }

        setIsLoading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axiosPrivate.post(`/users/graduates/upload-graduates/${selected.id}`, formData, {
                headers: {
                    "Content-Type": "multpart/form-data"
                }
            });
            if (response.data.newGraduates.length === 0) {
                setSuccessMsg("Nada foi adicionado. Todos já estão cadastrados.");
            } else {
                setSuccessMsg("Cadastro realizado com sucesso. ");
            }
            setIsLoading(false);
            setResult(response.data);
        } catch (err) {
            console.error(err)
            setIsLoading(false);
            setErrMsg("Erro ao enviar arquivo.");
        }
    };

    let content;
    if (!isLoading) {
        content = (
            <>
                <form onSubmit={handleSubmit} className="Form" style={{ minWidth: '400px' }} encType="multipart/form-data">
                    <h3 className="FormTitle" style={{ marginBottom: '0.5rem' }}>Cadastro Automático</h3>
                    <div className="mainInput">
                        <label htmlFor="select_modality">
                            Modalidade:
                        </label>
                        {<Dropdown options={modalities} value={selected} onChange={setSelected} />}
                    </div>
                    <div className="mainInput" style={{ marginBottom: '20px' }}>
                        <label htmlFor="file">Arquivo: </label>
                        <input
                            type="file"
                            name="file"
                            accept=".csv"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button type="submit" disabled={!selected || !file ? true : false}>
                        Confirmar
                    </button>
                </form>
                <div className="flex-buttons">
                    <button onClick={() => navigate("/admin/add-graduates")} className="back-button">Voltar</button>
                </div>
                <div>
                    <h2>Instruções</h2>
                    <ol>
                        <li>
                        Selecione dentre as modalidades disponíveis aquela a qual os egressos a serem adicionados pertencem.
                        </li>
                        <li>Escolha um arquivo .csv (com valores separados por ponto e vírgula)</li>
                        <li>
                            Certifique-se de que o arquivo escolhido tenha os seguinte formato:<br />
                            <img src={csvModel} alt="Modelo do arquivo .csv a ser enviado." width="100%" height="230px"/>
                        </li>
                        <li>Envie o arquivo.</li>
                        <li>Os cursos que não existiam serão criados automaticamente, não se preocupe!</li>
                        <li>A resposta da requisição serão os novos egresos adicionados juntamente com o número de egressos que já existiam no banco de dados.</li>
                    </ol>
                </div>
            </>
        )
    } else {
        content = <>
            <Spinner />
            Processando arquivo...
        </>
    }

    return (
        <div className="page">
            <h1 className='pageTitle'>Cadastro Com Arquivo CSV</h1>
            <section className="centerContent pageContent">
                <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live="assertive">
                    {errMsg}
                </p>
                <p ref={successRef} className={successMsg ? 'successMsg' : 'offscreen'} aria-live="assertive">
                    {successMsg}
                </p>
                {content}
                <Report
                    list={result.newGraduates}
                    duplicatedLength={result.existingGraduatesLength}
                />
            </section>
        </div >
    );
}

export default AddByFilePage;