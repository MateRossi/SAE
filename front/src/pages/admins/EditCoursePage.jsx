import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Dropdown from "../../components/Dropdown";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function EditCoursePage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [course, setCourse] = useState(location.state?.course || {});
    const [selected, setSelected] = useState(location.state?.course.modality || {});
    const [loading, setLoading] = useState(true);
    const [modalities, setModalities] = useState([]);

    const axiosPrivate = useAxiosPrivate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedCourse = {
            ...course,
            name: course.name,
            acronym: course.acronym,
            modalityId: selected.id,
        };

        try {
            await axiosPrivate.put(`/courses/${course.id}`, updatedCourse);
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

    if (!course || Object.keys(course).length === 0) {
        return (
            <div className="page">
                <h1 className="pageTitle">Cursos ofertados - Editar Curso</h1>
                <main className="pageContent">
                    <h3>Curso não encontrado.</h3>
                    <Link to='/admin/courses'>Voltar</Link>
                </main>
            </div>
        );
    }

    return (
        <div className="page">
            <h1 className="pageTitle">Cursos ofertados - Editar Curso</h1>
            <main className="pageContent">
                <p className="page-subtitle">
                    Altere as informações do curso.
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
                            name: e.target.value
                        }))}
                        defaultValue={course.name}
                    />
                    <label htmlFor="courseAcronym">Abreviação ou Sigla: </label>
                    <input
                        id="courseAcronym"
                        type="text"
                        required
                        onChange={(e) => setCourse(prevState => ({
                            ...prevState,
                            acronym: e.target.value
                        }))}
                        defaultValue={course.acronym}
                    />
                    <label htmlFor="courseModality">
                        Modalidade do Curso:
                    </label>
                    {!loading && <Dropdown options={modalities} value={selected} onChange={setSelected} />}
                    <button
                        type="submit"
                        disabled={!course?.name || !course?.acronym || !selected ? true : false}>
                        Salvar Mudanças
                    </button>
                </form>
            </main>
        </div>
    )
}

export default EditCoursePage;