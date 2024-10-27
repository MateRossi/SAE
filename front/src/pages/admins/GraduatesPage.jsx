import { useEffect, useState } from 'react';
import Table from '../../components/Table';
import '../page.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useLocation, useNavigate } from 'react-router-dom';

function GraduatesPage() {
    const [graduates, setGraduates] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const getGraduates = async () => {
            try {
                const response = await axiosPrivate.get(`/users/graduates`);
                if (isMounted) {
                    setGraduates(response.data);
                }
            } catch (err) {
                console.error(err);
                navigate('/', { state: { from: location }, replace: true })
            }
        }

        getGraduates();

        return () => isMounted = false;
    }, [axiosPrivate, location, navigate]);

    return (
        <div className="page">
            <h1 className='pageTitle'>Egressos cadastrados</h1>
            <main className="pageContent">
                <p className='page-subtitle'>
                    Abaixo estão listados os alunos que se declaram egressos do IF Sudeste MG - Campus Juiz de Fora
                </p>
                <Table items={graduates} columnLabels={['Matrícula', 'Nome']}/>
            </main>
        </div>
    );
}

export default GraduatesPage;