import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import PageTemplate from "./PageTemplate";

function JobPostingPage() {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    //const [errMsg, setErrMsg] = useState('');
    //const errRef = useRef();

    const [jobPostings, setJobPostings] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const getJobPostings = async () => {
            try {
                const response = await axiosPrivate.get(`/job-postings`);
                if (isMounted) {
                    setJobPostings(response.data);
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
                navigate('/', { state: { from: location }, replace: true });
            }
        }

        getJobPostings();

        return () => isMounted = false;
    }, [axiosPrivate, location, navigate]);

    //console.log(auth);

    if (loading) {
        return <PageTemplate pageTitle={'Painel de Vagas'} subtitle={"Abaixo estão listadas as vagas disponíveis para os egressos do IF Sudeste MG - Campus Juiz de Fora"}>
            <h3>Carregando...</h3>
        </PageTemplate>
    }

    if (jobPostings.length === 0) {
        return <PageTemplate pageTitle={'Painel de Vagas'} subtitle={"Abaixo estão listadas as vagas disponíveis para os egressos do IF Sudeste MG - Campus Juiz de Fora"}>
            {
                auth.role === "admin" &&
                <button className="add-button" onClick={() => navigate('/admin/job-postings/add')}>
                    Adicionar Vaga
                </button>
            }
            <h3>Não há vagas disponíveis no momento.</h3>
        </PageTemplate>
    }
}

export default JobPostingPage;