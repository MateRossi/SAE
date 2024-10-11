import { useState, useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth";
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PWD_REGEX = /.{8,24}/;

/* eslint-disable react/prop-types */
function EditPassword({ userData, setUserData, axiosPrivate }) {
    const { auth } = useAuth();

    const [oldPwd, setOldPwd] = useState("");

    const [newPwd, setNewPwd] = useState("");
    const [validNewPwd, setValidNewPwd] = useState(false);
    const [newPwdFocus, setNewPwdFocus] = useState(false);

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    const successRef = useRef();
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [oldPwd, newPwd]);

    useEffect(() => {
        setSuccessMsg('');
    }, [oldPwd, newPwd]);

    useEffect(() => {
        const result = PWD_REGEX.test(newPwd);
        setValidNewPwd(result);
    }, [newPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userInfo = { userId: auth.id, oldPassword: oldPwd, newPassword: newPwd };
        try {
            const response = await axiosPrivate.patch(`/users/update-password`, userInfo);
            setUserData({ ...userData, ...response.data });
            setSuccessMsg('Dados alterados');
            successRef.current.focus();
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Sem resposta.');
            } else if (err.response?.status === 400) {
                setErrMsg('Dados faltantes.');
            } else if (err.response?.status === 401) {
                setErrMsg('Não autorizado.');
            } else if (oldPwd == newPwd) {
                setErrMsg("A sua nova senha não pode ser igual à sua antiga senha.");
            } else {
                setErrMsg(err.response.data.details);
            }
            errRef.current.focus();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="loginForm" style={{marginTop: "1rem"}}>
            <h3 className="FormTitle" style={{ marginBottom: '0.5rem' }}>Alterar Senha</h3>
            <p ref={successRef} className={successMsg ? 'successMsg' : 'offscreen'}  style={{marginTop: "1rem"}} aria-live='assertive'>
                {successMsg}
            </p>
            <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} style={{marginTop: "1rem"}} aria-live="assertive">
                {errMsg}
            </p>
            <label htmlFor="oldPassword">Senha atual: </label>
            <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                required
                value={oldPwd}
                onChange={(e) => setOldPwd(e.target.value)}
            />
            <label htmlFor="password">
                Nova senha:
                <span className={validNewPwd ? 'valid' : 'hide'} >
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validNewPwd || !newPwd ? 'hide' : 'invalid'}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input
                type="password"
                id="newPassword"
                name="newPassword"
                onChange={(e) => setNewPwd(e.target.value)}
                required
                aria-invalid={validNewPwd ? "false" : "true"}
                aria-describedby="newpwdidnote"
                onFocus={() => setNewPwdFocus(true)}
                onBlur={() => setNewPwdFocus(false)}
            />
            <p id="newpwdidnote" className={newPwdFocus && !validNewPwd ? "instructions" : "offscreen"}>
                A senha deve conter 8 a 24 caracteres.
            </p>
            <button type="submit" disabled={!oldPwd || !newPwd || !validNewPwd ? true : false}>
                Confirmar
            </button>
        </form>
    );
}

export default EditPassword;