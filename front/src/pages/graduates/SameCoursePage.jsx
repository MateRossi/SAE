import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import '../page.css';

function SameCoursePage() {
    const { auth } = useAuth();
    const [graduatesSameCourse, setGraduatesSameCourse] = useState([]);

    useEffect(() => {
        axios.get(`/graduates/${auth?.id}/same-course`)
            .then(response => {
                setGraduatesSameCourse(response.data);
            })
            .catch(error => {
                console.error('Não foi possível obter egressos do mesmo curso', error.message);
            })
    }, [auth?.id])

    return (
        <div className="page">
            <main className="pageContent">
                <h1 className='pageTitle'>Egressos do curso de BSI</h1>
                {console.log(graduatesSameCourse)}
            </main>
        </div>
    )
}

export default SameCoursePage;