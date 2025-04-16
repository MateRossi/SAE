import { useEffect, useRef, useState } from "react";
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

    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef();

    const [userData, setUserData] = useState({});

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const getGraduateData = async () => {
            try {
                const response = await axiosPrivate.get(`/users/graduates/${auth.id}`);
                //console.log("Response data", response.data);
                isMounted && setUserData(response.data);
            } catch (err) {
                console.error(err);
                navigate('/', { state: { from: location }, replace: true });
            }
        }

        getGraduateData();

        return () => isMounted = false;
    }, [auth, axiosPrivate, location, navigate]);

    const handleDeleteAccount = async () => {
        const isConfirmed = window.confirm('Tem certeza que deseja excluir seu cadastro?');

        if (isConfirmed) {
            try {
                await axiosPrivate.delete(`/users/${auth.id}/delete-account`);
                navigate('/');
            } catch (error) {
                if (!error?.response) {
                    setErrMsg('Sem resposta.');
                } else if (error.response?.status === 400) {
                    setErrMsg('Dados faltantes.');
                } else if (error.response?.status === 401) {
                    setErrMsg('Não autorizado.');
                } else {
                    setErrMsg('Falha ao excluir conta.');
                }
                errRef.current.focus();
            }
        }
    }

    return (
        <div className="page">
            <h1 className="pageTitle">Configurações do Perfil</h1>
            <main className="pageContent">
                <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live='assertive'>
                    {errMsg}
                </p>
                <UserInfoEdit userData={userData} setUserData={setUserData} axiosPrivate={axiosPrivate} />
                <EditGraduateInfo userData={userData} setUserData={setUserData} axiosPrivate={axiosPrivate} />
                <EditPassword userData={userData} setUserData={setUserData} axiosPrivate={axiosPrivate} />
                <button
                    className="button-back"
                    style={{ width: '400px', marginTop: '20px', marginBottom: '20px' }}
                    onClick={handleDeleteAccount}
                >
                    Apagar Conta
                </button>
            </main>
        </div>
    )
}

export default ProfilePage;