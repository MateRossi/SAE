import { useRef, useState, useEffect } from "react";
import axios from "../../api/axios";
import Dropdown from '../../components/Dropdown';
import SystemDescription from '../../components/SystemDescription';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PWD_REGEX = /.{8,24}/;
const YEAR_REGEX = /19[5-9][0-9]|2[0-9]{3}/;

function RegisterPage() {
    const emailRef = useRef();
    const errRef = useRef();

    const [isLoading, setIsLoading] = useState(true);

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

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatchPwd(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        const validEntryYear = YEAR_REGEX.test(entryYear);
        const validGradYear = YEAR_REGEX.test(gradYear);

        if ((validEntryYear && validGradYear) && Number(entryYear) < Number(gradYear)) {
            setValidEntryYear(true);
            setValidGradYear(true);
        } else {
            setValidEntryYear(false);
            setValidGradYear(false);
        }
    }, [entryYear, gradYear]);

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
        console.log("email", email);
        console.log("senha", pwd);
        console.log('match', matchPwd);
        console.log('curso', courseName);
        console.log('ano ingresso', entryYear);
        console.log('ano graduação', gradYear);
        console.log("ano de entrada valido?", validEntryYear);
        console.log("ano de graducao valido?", validGradYear);
    }

    return (
        <section className="Content">
            <SystemDescription />
            <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live="assertive">
                {errMsg}
            </p>
            <form onSubmit={handleSubmit} className="Form">
                <h3 className="FormTitle" style={{ marginBottom: '0.5rem' }}>Solicitar Cadastro</h3>
                <div className="RegisterForm">
                    <div className="FormColumn">
                        <label htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            ref={emailRef}
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