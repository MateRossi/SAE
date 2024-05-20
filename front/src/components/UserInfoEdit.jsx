import { useRef, useState, useEffect } from "react";
import RadioGroup from '../components/RadioGroup';


/* eslint-disable react/prop-types */
function UserInfoEdit({ userData, setUserData, axiosPrivate }) {
    const radioOptions = [
        { value: true, label: 'Sim' },
        { value: false, label: 'Não' },
    ];

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [allowEmails, setAllowEmails] = useState(null);
    const [tellTrajectory, setTellTrajectory] = useState(null);

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    const successRef = useRef();
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [name, email, phoneNumber, allowEmails, tellTrajectory]);

    useEffect(() => {
        setSuccessMsg('');
    }, [name, email, phoneNumber, allowEmails, tellTrajectory]);

    useEffect(() => {
        setName(userData.name);
        setEmail(userData.email);
        setPhoneNumber(userData.phoneNumber);
        setAllowEmails(userData.allowEmails);
        setTellTrajectory(userData.tellTrajectory);
    }, [userData.allowEmails, userData.email, userData.name, userData.phoneNumber, userData.tellTrajectory]);

    const handleEdit = async (id) => {
        const updatedUser = {
            ...userData,
            id,
            name,
            email,
            allowEmails,
            phoneNumber,
            tellTrajectory,
        };
        try {
            const response = await axiosPrivate.put(`/users/graduates/${id}`, updatedUser);
            setUserData({ ...userData, ...response.data });
            setSuccessMsg('Dados alterados');
            successRef.current.focus();
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Sem resposta.');
            } else if (err.response?.status === 400) {
                setErrMsg('Dados faltantes');
            } else if (err.response?.status === 401) {
                setErrMsg('Não autorizado');
            } else {
                setErrMsg('Falha ao alterar dados');
            }
            errRef.current.focus();
        }
    };

    console.log(`States => 
        Name: ${name} \n
        Email: ${email} \n
        Phone: ${phoneNumber} \n
        Tell: ${tellTrajectory} \n
        Allow: ${allowEmails}.
    `)

    return (
        <>
            {userData &&

                <form className="loginForm" onSubmit={(e) => e.preventDefault()}>
                    <h3 className="FormTitle" style={{ marginBottom: '0.5rem' }}>Informações de Cadastro</h3>
                    <p ref={successRef} className={successMsg ? 'successMsg' : 'offscreen'} aria-live='assertive'>
                        {successMsg}
                    </p>
                    <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live='assertive'>
                        {errMsg}
                    </p>
                    <label htmlFor="name">Nome: </label>
                    <input
                        id="name"
                        type="text"
                        defaultValue={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="email">Email: </label>
                    <input
                        id="email"
                        type="email"
                        defaultValue={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="radioButtonContainer">
                        <p>Deseja receber e-mails comunicativos? </p>
                        <RadioGroup
                            name='allow-emails'
                            items={radioOptions}
                            value={allowEmails}
                            onChange={setAllowEmails}
                        />
                    </div>
                    <div className="radioButtonContainer">
                        <p>Gostaria se disponibilizar para contar sua tragetória? </p>
                        <RadioGroup
                            name='tell-trajectory'
                            items={radioOptions}
                            value={tellTrajectory}
                            onChange={setTellTrajectory}
                        />
                    </div>
                    <label htmlFor="phone">Contato: </label>
                    <input
                        type="text"
                        id="phone"
                        defaultValue={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        minLength={8}
                    />
                    <button type="submit" onClick={() => handleEdit(userData.id)}>Salvar</button>
                </form>
            }
            {!userData &&
                <p>Carregando...</p>
            }
        </>
    );
}

export default UserInfoEdit;