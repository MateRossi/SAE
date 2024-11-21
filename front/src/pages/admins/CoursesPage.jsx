import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import '../page.css';
import SortableTable from "../../components/sortableTable/SortableTable";
import deleteIcon from '../../img/deleteIcon.svg';
import editIcon from '../../img/editIcon.svg';

function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const getCourses = async () => {
            try {
                const response = await axiosPrivate.get(`/courses`);
                if (isMounted) {
                    setCourses(response.data);
                    setLoading(false);
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
            label: 'Opções',
            render: (course) => {
                return <div className='table-options'>
                    <button className='info-button' onClick={() => console.log(course.id)}>
                        <img className="table-options-icon" src={editIcon} alt="icone de editar" />
                    </button>
                    <button className='msg-button' onClick={() => console.log(course.id)}>
                        <img className="table-options-icon" src={deleteIcon} alt='iconde de excluir' />
                    </button>
                </div>
            }
        },
    ]

    return (
        <div className="page">
            <h1 className='pageTitle'>Cursos ofertados</h1>
            <main className="pageContent">
                <p className='page-subtitle'>
                    Abaixo estão listados os cursos ofertados pelo IF Sudeste MG - Campus Juiz de Fora
                </p>
                <div className="search-bar">
                    <input 
                        type="text"
                        placeholder="Pesquisar por curso, modalidade ou sigla."
                    />
                    <button className="add-button">
                        Adicionar Curso
                    </button>
                </div>
                <div className='table-overflow-container'>
                    <SortableTable data={courses} keyFn={keyFn} config={config} />
                </div>
            </main>
        </div>
    )
}

export default CoursesPage;