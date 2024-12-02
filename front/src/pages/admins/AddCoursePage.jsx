import { useEffect, useRef, useState } from "react";
import Dropdown from "../../components/Dropdown";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";

function AddCoursePage() {
    const [course, setCourse] = useState({});
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalities, setModalities] = useState([]);

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    const successRef = useRef();
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [course]);

    useEffect(() => {
        setSuccessMsg('');
    }, [course]);

    useEffect(() => {
        let isMounted = true;
        const getModalities = async () => {
            try {
                const response = await axiosPrivate.get(`/modalities`);
                if (isMounted) {
                    setModalities(response.data);
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
                navigate('/', { state: { from: location }, replace: true })
            }
        }

        getModalities();

        return () => isMounted = false;
    }, [axiosPrivate, location, navigate]);

    //handle submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        const newCourse = {
            name: course?.courseName,
            acronym: course?.courseAcronym,
            modalityId: selected?.id,
        }

        try {
            await axiosPrivate.post('/courses', newCourse);
            setSuccessMsg('Curso adicionado com sucesso.');
        } catch (error) {
            if (!error?.response) {
                setErrMsg('Sem resposta.');
            } else if (error.response?.status === 400) {
                setErrMsg('Dados faltantes.');
            } else if (error.response?.status === 401) {
                setErrMsg('Não autorizado.');
            } else if (error.response?.status === 409) {
                setErrMsg('Conflito. Curso já está cadastrado.')
            } else {
                setErrMsg('Falha ao adicionar curso.');
            }
        }
    }

    const handleCancel = () => {
        navigate(-1);
    }

    return (
        <div className="page">
            <h1 className="pageTitle">Cursos ofertados - Adicionar Curso</h1>
            <main className="pageContent">
                <p className="page-subtitle">
                    Adicione os cursos ofertados pela sua instituição de ensino.
                </p>
                <form className="loginForm" onSubmit={handleSubmit}>
                    <h3 className="FormTitle" style={{ marginBottom: '0.5rem' }}>Informações do Curso</h3>
                    <p ref={successRef} className={successMsg ? 'successMsg' : 'offscreen'} aria-live='assertive'>
                        {successMsg}
                    </p>
                    <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live='assertive'>
                        {errMsg}
                    </p>
                    <label htmlFor="courseName">Nome do Curso: </label>
                    <input
                        id="courseName"
                        type="text"
                        required
                        onChange={(e) => setCourse(prevState => ({
                            ...prevState,
                            courseName: e.target.value
                        }))}
                        onFocus={(e) => e.target.value = ''}
                    />
                    <label htmlFor="courseAcronym">Abreviação ou Sigla: </label>
                    <input
                        id="courseAcronym"
                        type="text"
                        required
                        onChange={(e) => setCourse(prevState => ({
                            ...prevState,
                            courseAcronym: e.target.value
                        }))}
                        onFocus={(e) => e.target.value = ''}
                    />
                    <label htmlFor="courseModality">
                        Modalidade do Curso:
                    </label>
                    {!loading && <Dropdown options={modalities} value={selected} onChange={setSelected} />}
                    <button
                        type="submit"
                        disabled={!course?.courseName || !course?.courseAcronym || !selected ? true : false}>
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

export default AddCoursePage;