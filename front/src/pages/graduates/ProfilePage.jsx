import { useEffect, useRef, useState } from "react";
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const PWD_REGEX = /.{8,24}/;
const YEAR_REGEX = /19[5-9][0-9]|2[0-9]{3}/;

function ProfilePage() {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const [userData, setUserData] = useState({});

    const navigate = useNavigate();
    const location = useLocation();

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    //const [pwd, setPwd] = useState('');
    //const [validPwd, setValidPwd] = useState('');
    //const [pwdFocus, setPwdFocus] = useState('');

    //const [matchPwd, setMatchPwd] = useState('');
    //const [validMatchPwd, setValidMatchPwd] = useState(false);
    //const [matchPwdFocus, setMatchPwdFocus] = useState(false);

    const handleAllowEmailsChange = (e) => {
        const newValue = e.target.value === 'sim' ? true : false;
        setUserData({ ...userData, allowEmails: newValue });
    }

    const handleTellTrajectoryChange = (e) => {
        const newValue = e.target.value === 'sim' ? true : false;
        setUserData({ ...userData, tellTrajectory: newValue });
    }

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

    const handleEdit = async (id) => {
        const updatedUser = {
            ...userData,
            id,
            name: userData.name,
            email: userData.email,
            allowEmails: userData.allowEmails,
            phoneNumber: userData.phoneNumber,
            tellTrajectory: userData.tellTrajectory,
        };
        try {
            const response = await axiosPrivate.put(`/users/graduates/${id}`, updatedUser);
            setUserData(...userData, response.data);
        } catch (err) {
            console.error(`Error: ${err.message}`);
            setErrMsg(err.message);
            console.log(errMsg);
        }
    };

    return (
        <div className="page">
            <h1 className="pageTitle">Configurações do Perfil</h1>
            <main className="pageContent">
                {userData &&
                    <form className="updateForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="name">Nome: </label>
                        <input
                            id="name"
                            type="text"
                            defaultValue={userData.name}
                            required
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        />
                        <label htmlFor="email">Email: </label>
                        <input
                            id="email"
                            type="email"
                            defaultValue={userData.email}
                            required
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        />
                        <div className="radioButtonContainer">
                        <p>Deseja receber e-mails comunicativos? </p>
                        <label htmlFor="allow-emails-yes">Sim</label>
                        <input
                            type="radio"
                            id="allow-emails-yes"
                            name="allow-emails"
                            value="sim"
                            defaultChecked={userData.allowEmails}
                            onChange={handleAllowEmailsChange}
                        />
                        <label htmlFor="allow-emails-no">Não</label>
                        <input
                            type="radio"
                            id="allow-emails-no"
                            name="allow-emails"
                            value="nao"
                            defaultChecked={!userData.allowEmails}
                            onChange={handleAllowEmailsChange}
                        />
                        </div>
                        <div className="radioButtonContainer">
                        <p>Gostaria se disponibilizar para contar sua tragetória? </p>
                        <label htmlFor="tell-tragectory-yes">Sim</label>
                        <input
                            type="radio"
                            id="tell-tragectory-yes"
                            name="tell-tragectory"
                            value="sim"
                            defaultChecked={userData.tellTrajectory}
                            onChange={handleTellTrajectoryChange}
                        />
                        <label htmlFor="tell-tragectory-no">Não</label>
                        <input
                            type="radio"
                            id="tell-tragectory-no"
                            name="tell-tragectory"
                            value="nao"
                            defaultChecked={!userData.tellTrajectory}
                            onChange={handleTellTrajectoryChange}
                        />
                        </div>
                        <label htmlFor="phone">Contato: </label>
                        <input
                            type="text"
                            id="phone"
                            defaultValue={userData.phoneNumber}
                            onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
                            minLength={8}
                        />
                        <button type="submit" onClick={() => handleEdit(userData.id)}>Salvar</button>
                    </form>
                }
                {!userData &&
                    <p>Carregando...</p>
                }
            </main>
        </div>
    )
}

export default ProfilePage;