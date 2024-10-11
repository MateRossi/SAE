import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import '../page.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Table from '../../components/Table';

function SameCoursePage() {
    const [graduatesSameCourse, setGraduatesSameCourse] = useState([]);
    const [courseName, setCourseName] = useState('');
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
                }
            } catch (err) {
                console.error(err);
                navigate('/', { state: { from: location }, replace: true });
            }
        }

        getGraduatesSameCourse();

        return () => isMounted = false;
    }, [auth, axiosPrivate, location, navigate]);

    return (
        <div className="page">
            <h1 className='pageTitle'>Egressos do mesmo curso</h1>

            <main className="pageContent">
                <p className='page-subtitle'>
                    Abaixo estão listados os alunos que também se cadastraram como egressos do curso
                    <b> {courseName}</b>
                </p>
                <Table items={graduatesSameCourse} columnLabels={['Matrícula', 'Nome', 'Email', 'Graduação', 'Opções']} />
            </main>
        </div>
    )
}

export default SameCoursePage;