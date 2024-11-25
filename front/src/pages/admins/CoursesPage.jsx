import { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import '../page.css';
import SortableTable from "../../components/sortableTable/SortableTable";
import deleteIcon from '../../img/deleteIcon.svg';
import editIcon from '../../img/editIcon.svg';

function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    const successRef = useRef();
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        let isMounted = true;
        const getCourses = async () => {
            try {
                const response = await axiosPrivate.get(`/courses`);
                if (isMounted) {
                    setCourses(response.data);
                    setLoading(false);
                    console.log(response.data);
                }
            } catch (err) {
                console.error(err);
                navigate('/', { state: { from: location }, replace: true })
            }
        }

        getCourses();

        return () => isMounted = false;
    }, [axiosPrivate, location, navigate]);

    const keyFn = (course) => {
        return course.id;
    }

    if (loading) {
        return <div className="page">
            <h2>Carregando...</h2>
        </div>
    }

    if (courses.length === 0) {
        return <div className="page">
            <h3>Sem dados para mostrar.</h3>
        </div>
    }

    const handleDelete = async (courseId) => {
        const isConfirmed = window.confirm('Tem certeza que deseja deletar este curso?');

        if (isConfirmed) {
            try {
                await axiosPrivate.delete(`/courses/${courseId}`);
                setSuccessMsg('Curso excluído com sucesso.');
                successRef.current.focus();
                setCourses((prevCourses) => prevCourses.filter(course => course.id !== courseId));
            } catch (error) {
                setErrMsg('Erro ao deletar curso.');
                errRef.current.focus();
            }
        }
    }

    const handleEdit = (course) => {
        navigate(`/admin/courses/${course.id}/edit-course`, { state: { course } });
    }

    const config = [
        {
            label: 'Curso',
            render: (course) => course.name,
        },
        {
            label: 'Sigla',
            render: (course) => course.acronym,
        },
        {
            label: 'Modalidade',
            render: (course) => course.modality.description
        },
        {
            label: 'Egressos Cadastrados',
            render: (course) => course.usersCount,
            sortValue: (course) => course.usersCount,
        },
        {
            label: 'Opções',
            render: (course) => {
                return <div className='table-options'>
                    <button className='info-button' onClick={() => handleEdit(course)}>
                        <img className="table-options-icon" src={editIcon} alt="icone de editar" />
                    </button>
                    <button className='msg-button' onClick={() => handleDelete(course.id)}>
                        <img className="table-options-icon" src={deleteIcon} alt='icone de de excluir' />
                    </button>
                </div>
            }
        },
    ]

    const handleClick = () => {
        navigate('/admin/add-course');
    }

    const filteredCourses = courses.filter(course =>
        course.name.toLowerCase().includes(search.toLowerCase()) ||
        course.acronym.toLowerCase().includes(search.toLocaleLowerCase()) ||
        course.usersCount.toLowerCase().includes(search.toLocaleLowerCase()) ||
        course.modality.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="page">
            <h1 className='pageTitle'>Cursos ofertados</h1>
            <main className="pageContent">
                <p className='page-subtitle'>
                    Abaixo estão listados os cursos ofertados pelo IF Sudeste MG - Campus Juiz de Fora
                </p>
                <p ref={successRef} className={successMsg ? 'successMsg' : 'offscreen'} aria-live='assertive'>
                    {successMsg}
                </p>
                <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live='assertive'>
                    {errMsg}
                </p>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Pesquisar por curso, modalidade ou sigla."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="add-button" onClick={handleClick}>
                        Adicionar Curso
                    </button>
                </div>
                <div className='table-overflow-container'>
                    <SortableTable data={!search ? courses : filteredCourses} keyFn={keyFn} config={config} />
                </div>
            </main>
        </div>
    )
}

export default CoursesPage;