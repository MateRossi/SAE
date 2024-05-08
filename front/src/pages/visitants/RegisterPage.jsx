import { useRef, useState, useEffect } from "react";
import axios from "../../api/axios";
import Dropdown from '../../components/Dropdown';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const PWD_REGEX = /.{8,24}/;
const YEAR_REGEX = /19[5-9][0-9]|2[0-9]{3}/;
const REGISTER_URL = '/register';

function RegisterPage() {
    const nameRef = useRef();
    const errRef = useRef();

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    //name
    const [name, setName] = useState('');

    //email
    const [email, setEmail] = useState('');
    const [emailFocus, setEmailFocus] = useState(false);

    //senha
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    //confirmação de senha
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatchPwd, setValidMatchPwd] = useState(false);
    const [matchPwdFocus, setMatchPwdFocus] = useState(false);

    //curso selecionado
    const [courseName, setCourseName] = useState('');
    const [courses, setCourses] = useState([]);

    //anos de ingresso e graduação
    const [entryYear, setEntryYear] = useState('');
    const [validEntryYear, setValidEntryYear] = useState(false);
    const [gradYear, setGradYear] = useState('');
    const [validGradYear, setValidGradYear] = useState(false);

    //phoneNumber
    const [phoneNumber, setPhoneNumber] = useState('');

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        nameRef.current.focus();
    }, [])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatchPwd(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setValidEntryYear(YEAR_REGEX.test(entryYear));
        setValidGradYear(YEAR_REGEX.test(gradYear));

        if ((validEntryYear && validGradYear) && Number(entryYear) < Number(gradYear)) {
            setValidEntryYear(true);
            setValidGradYear(true);
        } else {
            setValidEntryYear(false);
            setValidGradYear(false);
        }
    }, [entryYear, gradYear, validEntryYear, validGradYear]);

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd, matchPwd, courseName, entryYear, gradYear]);

    useEffect(() => {
        let isMounted = true;
        const getCourses = async () => {
            try {
                const response = await axios.get(`/courses`);
                console.log(response.data);
                isMounted && setCourses(response.data);
                setIsLoading(false);
            } catch (err) {
                console.error(err);
                setIsLoading(false);
            }
        }

        getCourses()

        return () => isMounted = false;
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({
                    name,
                    email: email,
                    password: pwd,
                    courseId: courseName.id,
                    entryYear,
                    graduationYear: gradYear,
                    phoneNumber,
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response));
            navigate('/registerSuccess', { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Sem resposta do servidor.');
            } else if (err.response?.status === 409) {
                setErrMsg('Email ja cadastrado.');
            } else if (err.response?.status === 422) {
                setErrMsg('Entrada inválida.');
            } else {
                setErrMsg('Falha ao solicitar registro.');
            }
            errRef.current.focus();
        }
    }

    return (
        <section className="CenterContent">
            <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live="assertive">
                {errMsg}
            </p>
            <form onSubmit={handleSubmit} className="Form">
                <h3 className="FormTitle" style={{ marginBottom: '0.5rem' }}>Solicitar Cadastro</h3>
                <div className="mainInput">
                    <label htmlFor="name">
                        Nome completo:
                    </label>
                    <input
                        type="text"
                        id="name"
                        autoComplete="off"
                        ref={nameRef}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="RegisterForm">
                    <div className="FormColumn">
                        <label htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-describedby="eidnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="eidnote" className={emailFocus && !email ? "instructions" : "offscreen"}>
                            O email será seu login e também a principal forma de comunicação.
                        </p>
                        <label htmlFor="password">
                            Senha:
                            <span className={validPwd ? 'valid' : 'hide'} >
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pidnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pidnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            A senha deve conter 8 a 24 caracteres.
                        </p>
                        <label htmlFor="confirm_pwd">
                            Confirme a senha:
                            <span className={validMatchPwd && matchPwd ? 'valid' : 'hide'} >
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validMatchPwd || !matchPwd ? 'hide' : 'invalid'}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            required
                            aria-invalid={validMatchPwd ? "false" : "true"}
                            aria-describedby="midnote"
                            onFocus={() => setMatchPwdFocus(true)}
                            onBlur={() => setMatchPwdFocus(false)}
                        />
                        <p id="midnote" className={matchPwdFocus && !validMatchPwd ? "instructions" : "offscreen"}>
                            As senhas devem coincidir.
                        </p>
                    </div>
                    <div className="FormColumn">
                        <label htmlFor="select_course">
                            Formou-se no curso:
                        </label>
                        {!isLoading && <Dropdown options={courses} value={courseName} onChange={setCourseName} />}
                        <div className="years">
                            <div className="year">
                                <label htmlFor="entry_year">
                                    Ano de ingresso
                                </label><br />
                                <input
                                    type="text"
                                    id="entry_year"
                                    onChange={(e) => setEntryYear(e.target.value)}
                                    required
                                    maxLength={4}
                                    minLength={4}
                                />
                            </div>
                            <div className="year">
                                <label htmlFor="grad_year">
                                    Ano de formatura
                                </label><br />
                                <input
                                    type="text"
                                    id="grad_year"
                                    onChange={(e) => setGradYear(e.target.value)}
                                    required
                                    maxLength={4}
                                    minLength={4}
                                />
                            </div>
                        </div>
                        <label htmlFor="phone">
                            Telefone para contato
                        </label>
                        <input
                            type="text"
                            id="phone"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            minLength={8}
                        />
                    </div>
                </div>
                <button type="submit" disabled={!email || !validPwd || !validMatchPwd ? true : false}>
                    Confirmar
                </button>
            </form>
            <p>
                Já possui cadastro?
                <span className="line">
                    <a href="#"> Entrar</a>
                </span>
            </p>
        </section>
    )
}

export default RegisterPage;