import { useEffect, useState } from "react";
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from 'react-router-dom';
import './ProfilePage.css';
import UserInfoEdit from "../../components/UserInfoEdit";
import EditPassword from "../../components/EditPassword";
import EditGraduateInfo from "../../components/EditGraduateInfo";

function ProfilePage() {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const [userData, setUserData] = useState({});

    const navigate = useNavigate();
    const location = useLocation();

    //const [pwd, setPwd] = useState('');
    //const [validPwd, setValidPwd] = useState('');
    //const [pwdFocus, setPwdFocus] = useState('');

    //const [matchPwd, setMatchPwd] = useState('');
    //const [validMatchPwd, setValidMatchPwd] = useState(false);
    //const [matchPwdFocus, setMatchPwdFocus] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const getGraduateData = async () => {
            try {
                const response = await axiosPrivate.get(`/users/graduates/${auth.id}`);
                console.log("Response data", response.data);
                isMounted && setUserData(response.data);
            } catch (err) {
                console.error(err);
                navigate('/', { state: { from: location }, replace: true });
            }
        }

        getGraduateData();

        return () => isMounted = false;
    }, [auth, axiosPrivate, location, navigate]);

    console.log(userData);

    return (
        <div className="page">
            <h1 className="pageTitle">Configurações do Perfil</h1>
            <main className="pageContent">
                <UserInfoEdit userData={userData} setUserData={setUserData} axiosPrivate={axiosPrivate} />
                <EditGraduateInfo userData={userData} setUserData={setUserData} axiosPrivate={axiosPrivate} />
                <EditPassword userData={userData} setUserData={setUserData} axiosPrivate={axiosPrivate} />
            </main>
        </div>
    )
}

export default ProfilePage;