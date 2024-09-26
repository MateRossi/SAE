import { useState, useEffect, useRef } from "react";
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import surveyOptions from '../../constants/surveyOptions';
import { useLocation, useNavigate } from 'react-router-dom';
import Dropdown from "../../components/Dropdown";
import SurveyForm from "../../components/SurveyForm";
import './FollowUpPage.css';

function FollowUpPage() {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const navigate = useNavigate();
    const location = useLocation();

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    const successRef = useRef();
    const [successMsg, setSuccessMsg] = useState('');

    const [surveyData, setSurveyData] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const getGraduateData = async () => {
            try {
                const response = await axiosPrivate.get(`/surveys/graduates/${auth.id}`);
                console.log("Response data", response.data);
                isMounted && setSurveyData(response.data);
            } catch (err) {
                console.error(err);
                navigate('/', { state: { from: location }, replace: true });
            }
        }

        getGraduateData();

        return () => isMounted = false;
    }, [auth, axiosPrivate, location, navigate]);

    const handleSituationChange = (value) => {
        setSurveyData(prevState => ({
            ...prevState,
            situation: value.name,
        }));
        //setChanged(true);
    };

    const handleSubmit = async (value) => {
        const newSurvey = {
            situation: surveyData?.situation,
            userId: auth.id,
            ...value,
        }

        console.log(newSurvey);

        try {
            const response = await axiosPrivate.post(`/surveys`, newSurvey);
            console.log("Response: ", response);
            setSurveyData({ ...surveyData, ...response.data });
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
    }

    console.log("Survey data", surveyData);

    return (
        <div className="page">
            <h1 className="pageTitle">Acompanhamento de Carreira</h1>
            <main className="pageContent">
                <p ref={successRef} className={successMsg ? 'successMsg' : 'offscreen'} aria-live='assertive'>
                    {successMsg}
                </p>
                <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live='assertive'>
                    {errMsg}
                </p>
                <div className="sutiation-select-container">
                    <label htmlFor="select_degree">Atualmente o(a) sr(a) está: </label>
                    <Dropdown options={surveyOptions?.situation} value={surveyData?.situation} onChange={handleSituationChange} />
                </div>
                <SurveyForm surveyData={surveyData} setSurveyData={setSurveyData} handleSubmit={handleSubmit} />
            </main>
        </div>
    )
}

export default FollowUpPage;