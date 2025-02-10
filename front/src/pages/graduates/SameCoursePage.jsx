import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import '../page.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import SortableTable from '../../components/sortableTable/SortableTable';
import PageTemplate from '../PageTemplate';
import { RiMailFill } from 'react-icons/ri';

function SameCoursePage() {
    const [graduatesSameCourse, setGraduatesSameCourse] = useState([]);
    const [courseName, setCourseName] = useState('');
    const [loading, setLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();

    useEffect(() => {
        let isMounted = true;
        const getGraduatesSameCourse = async () => {
            try {
                const response = await axiosPrivate.get(`/users/${auth.id}/same-course`);
                if (isMounted) {
                    setGraduatesSameCourse(response.data.users);
                    setCourseName(response.data.course);
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
                navigate('/', { state: { from: location }, replace: true });
            }
        }

        getGraduatesSameCourse();

        return () => isMounted = false;
    }, [auth, axiosPrivate, location, navigate]);

    const keyFn = (graduate) => {
        return graduate.id;
    }

    if (loading) {
        return <PageTemplate pageTitle={'Ex-Colegas de Curso'} subtitle={`Abaixo estão listados os alunos que também se formaram no curso ${courseName}.`}>
            <h3>Carregando...</h3>
        </PageTemplate>
    }

    if (graduatesSameCourse.length === 0) {
        return <PageTemplate pageTitle={'Cursos ofertados'} subtitle={`Abaixo estão listados os alunos que também se formaram no curso ${courseName}.`}>
            <h3>Ainda não há egressos cadastrados.</h3>
        </PageTemplate>
    }

    const config = [
        {
            label: 'Nome',
            render: (graduate) => graduate.name,
        },
        {
            label: 'Ano de Graduação',
            render: (graduate) => graduate.graduationYear || 'Não informado',
            sortValue: (graduate) => graduate.graduationYear,
        },
        {
            label: 'Opções',
            render: (graduate) => {
                return (
                    graduate.allowEmails && auth.id !== graduate.id ? 
                    <button className="tableOptionButton" onClick={() => navigate(`/graduate/${auth.id}/send-message`, { state: { graduate, courseName } })}><RiMailFill size={25}/></button>
                    : <span style={{ fontWeight: '600' }}>--</span>
                );
            },
            sortValue: (graduate) => graduate.allowEmails,
        }
    ];

    return (
        <div className="page">
            <h1 className='pageTitle'>Ex-Colegas de Curso</h1>

            <main className="pageContent">
                <p className='page-subtitle'>
                    Abaixo estão listados os alunos que também se cadastraram como egressos do curso
                    <b> {courseName || ''}</b>
                </p>
                <div className='table-overflow-container'>
                    <SortableTable data={graduatesSameCourse} keyFn={keyFn} config={config} />
                </div>
            </main>
        </div>
    )
}

export default SameCoursePage;