import { useEffect, useRef, useState } from "react";
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from 'react-router-dom';

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
        setUserData({...userData, allowEmails: newValue});
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

    return (
        <div className="page">
            <h1 className="pageTitle">Configurações do Perfil</h1>
            <main className="pageContent">
                {userData &&
                    <form className="form">
                        <label htmlFor="name">Nome: </label>
                        <input
                            id="name"
                            type="text"
                            defaultValue={userData.name}
                            required
                            onChange={(e) => setUserData({...userData, name: e.target.value})}
                        />
                        <label htmlFor="email">Email: </label>
                        <input
                            id="email"
                            type="email"
                            defaultValue={userData.email}
                            required
                            onChange={(e) => setUserData({...userData, email: e.target.value})}
                        />
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
                        <label htmlFor="phone">Contato: </label>
                        <input
                            type="text"
                            id="phone"
                            defaultValue={userData.phoneNumber}
                            onChange={(e) => setUserData({...userData, phoneNumber: e.target.value})}
                            minLength={8}
                        />
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