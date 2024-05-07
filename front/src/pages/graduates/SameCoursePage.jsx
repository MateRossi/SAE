import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import '../page.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

function SameCoursePage() {
    const [graduatesSameCourse, setGraduatesSameCourse] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();

    useEffect(() => {
        let isMounted = true;
        const getGraduatesSameCourse = async () => {
            try {
                const response = await axiosPrivate.get(`/users/${auth.userId}/same-course`);
                console.log(response.data);
                isMounted && setGraduatesSameCourse(response.data);
            } catch (err) {
                console.error(err);
                navigate('/', { state: {from: location }, replace: true });
            }
        }

        getGraduatesSameCourse();

        return () => isMounted = false;
    }, [auth, axiosPrivate, location, navigate]);

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