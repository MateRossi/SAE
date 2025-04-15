import { useRef, useState, useEffect } from "react";
import RadioGroup from '../components/RadioGroup';
import Dropdown from "./Dropdown";

/* eslint-disable react/prop-types */
function UserInfoEdit({ userData, setUserData, axiosPrivate }) {
    const radioOptions = [
        { value: true, label: 'Sim' },
        { value: false, label: 'Não' },
    ];
    const degreeOptions = [
        { name: 'Técnico Completo' },
        { name: 'Superior Completo' },
        { name: 'Pós graduação lato sensu incompleta' },
        { name: 'Pós graduação lato sensu completa' },
        { name: 'Pós graduação stricto sensu incompleta' },
        { name: 'Pós graduação stricto sensu completa' },
        { name: 'Não sabe / prefere não opinar' },
    ];

    const [entryYear, setEntryYear] = useState('');
    const [graduationYear, setGraduationYear] = useState('');
    const [workedBefore, setWorkedBefore] = useState(null);
    const [degreeLevel, setDegreeLevel] = useState('');
    const [commentary, setCommentary] = useState('');

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    const successRef = useRef();
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [entryYear, graduationYear, workedBefore, degreeLevel, commentary]);

    useEffect(() => {
        setSuccessMsg('');
    }, [entryYear, graduationYear, workedBefore, degreeLevel, commentary]);

    useEffect(() => {
        setEntryYear(userData.entryYear);
        setGraduationYear(userData.graduationYear);
        setWorkedBefore(userData.workedBefore);
        setDegreeLevel(userData.degreeLevel);
        setCommentary(userData.commentary);
    }, [userData.commentary, userData.degreeLevel, userData.entryYear, userData.graduationYear, userData.workedBefore]);

    const handleEdit = async (id) => {
        const updatedUser = {
            ...userData,
            id,
            entryYear,
            graduationYear,
            workedBefore,
            degreeLevel: degreeLevel?.name,
            commentary,
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

    return (
        <>
            {userData &&
                <form className="loginForm" style={{ width: '40%', marginTop: '1rem' }} onSubmit={(e) => e.preventDefault()} >
                    <h3 className="FormTitle" style={{ marginBottom: '0.5rem' }}>Dados Gerais da Formação</h3>
                    <p ref={successRef} className={successMsg ? 'successMsg' : 'offscreen'} aria-live='assertive'>
                        {successMsg}
                    </p>
                    <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live='assertive'>
                        {errMsg}
                    </p>
                    <label htmlFor="entryYear">Ano de ingresso: </label>
                    <input
                        id="entryYear"
                        type="number"
                        defaultValue={entryYear}
                        required
                        onChange={(e) => setEntryYear(e.target.value)}
                        maxLength={4}
                        minLength={4}
                    />
                    <label htmlFor="graduationYear">Ano de formatura: </label>
                    <input
                        id="graduationYear"
                        type="number"
                        defaultValue={graduationYear}
                        required
                        onChange={(e) => setGraduationYear(e.target.value)}
                        maxLength={4}
                        minLength={4}
                    />
                    <div className="radioButtonContainer">
                        <p>Você estava trabalhando antes ou durante seu curso no IF? </p>
                        <RadioGroup
                            name='workedBefore'
                            items={radioOptions}
                            value={workedBefore}
                            onChange={setWorkedBefore}
                        />
                    </div>
                    <label htmlFor="select_degree">Qual o seu nível de escolaridade atual? </label>
                    {userData && <Dropdown options={degreeOptions} value={degreeLevel} onChange={setDegreeLevel} />}
                    <label htmlFor="commentary">Comente sobre sua formação, sua tragetória até aqui! </label>
                    <input
                        type="text"
                        id="commentary"
                        defaultValue={commentary}
                        onChange={(e) => setCommentary(e.target.value)}
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