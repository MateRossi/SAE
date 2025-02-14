import { useRef, useState, useEffect } from "react";
import axios from "../../api/axios";
import Dropdown from '../../components/Dropdown';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

const YEAR_REGEX = /19[5-9][0-9]|2[0-9]{3}/;
const REGISTER_URL = '/users/admins/add-graduate';

function AddGraduatesPage() {
    const nameRef = useRef();
    const errRef = useRef();
    const successRef = useRef();

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    //name
    const [userName, setName] = useState('');

    //matricula
    const [matricula, setMatricula] = useState('');

    //email
    const [userEmail, setEmail] = useState('');
    const [emailFocus, setEmailFocus] = useState(false);

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
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        nameRef.current.focus();
    }, []);

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
        setSuccessMsg('');
    }, [userName, userEmail, courseName, entryYear, gradYear, courseName, matricula]);

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

    const handleSubmit = async (e) => {
        if (!courseName) {
            alert("Por favor, insira o nome do curso!");
        }

        e.preventDefault();

        const newGraduate = {
            name: userName,
            enrollment: matricula,
            email: userEmail,
            courseId: courseName.id,
            entryYear,
            graduationYear: gradYear,
            phoneNumber
        }

        try {
            const response = await axiosPrivate.post(REGISTER_URL, newGraduate);
            successRef.current.focus();
            setSuccessMsg(response.data.msg);
            return;
        } catch (err) {
            if (!err?.response) {
                console.log(err)
                setErrMsg('Sem resposta do servidor.');
            } else if (err.response?.status === 409) {
                setErrMsg('Email ja cadastrado.');
            } else if (err.response?.status === 422) {
                setErrMsg('Entrada inválida.');
            } else if (err.response?.status === 404) {
                setErrMsg(err.response.data.error);
            } else {
                console.log(err);
                setErrMsg(err.response.data.details);
            }
            errRef.current.focus();
        }
    }

    return (
        <div className="page">
            <h1 className='pageTitle'>Cadastrar Egressos</h1>
            <section className="centerContent pageContent">
                <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live="assertive">
                    {errMsg}
                </p>
                <p ref={successRef} className={successMsg ? 'successMsg' : 'offscreen'} aria-live="assertive">
                    {successMsg}
                </p>
                <form onSubmit={handleSubmit} className="Form">
                    <h3 className="FormTitle" style={{ marginBottom: '0.5rem' }}>Cadastro Manual</h3>
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
                            <label htmlFor="matricula">
                                Matrícula:
                            </label>
                            <input
                                type="text"
                                id="matricula"
                                autoComplete="off"
                                onChange={(e) => setMatricula(e.target.value)}
                                required
                                aria-describedby="eidnote"
                            />
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
                            <p id="eidnote" className={emailFocus && !userEmail ? "instructions" : "offscreen"}>
                                O email será a principal forma de comunicação.
                            </p>
                            <div className="year">
                                <label htmlFor="entry_year">
                                    Ano de ingresso
                                </label><br />
                                <input
                                    type="number"
                                    id="entry_year"
                                    onChange={(e) => setEntryYear(e.target.value)}
                                    required
                                    maxLength={4}
                                    minLength={4}
                                />
                            </div>
                        </div>
                        <div className="FormColumn">
                            <label htmlFor="select_course">
                                Curso:
                            </label>
                            {!isLoading && <Dropdown options={courses} value={courseName} onChange={setCourseName} />}
                            <div className="">
                                <label htmlFor="phone">
                                    Telefone para contato
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    minLength={8}
                                />
                                <div className="year">
                                    <label htmlFor="grad_year">
                                        Ano de formatura
                                    </label><br />
                                    <input
                                        type="number"
                                        id="grad_year"
                                        onChange={(e) => setGradYear(e.target.value)}
                                        required
                                        maxLength={4}
                                        minLength={4}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" disabled={!userEmail ? true : false}>
                        Confirmar
                    </button>
                </form>
                <div className="flex-buttons">
                    <button onClick={() => navigate("/admin")} className="back-button">Voltar</button>
                    <button onClick={() => navigate("/admin/add-graduates/csv")} className="add-button">Cadastro por Arquivo CSV</button>
                </div>
            </section>
        </div>
    );
}

export default AddGraduatesPage;