import { useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import '../page.css';

function AddJobPosting() {
    const axiosPrivate = useAxiosPrivate();

    const [jobPostingData, setJobPostingData] = useState({
        jobPosting: {
            jobTitle: "",
            company: "",
            salary: "",
            logoUrl: "",
            description: "",
            jobUrl: ""
        },
        courseIds: [],
    });

    const [successMsg, setSuccessMsg] = useState("");
    const successRef = useRef();

    const [errMsg, setErrMsg] = useState("");
    const errRef = useRef();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(jobPostingData);
    }

    return (
        <div className="page">
            <h1 className="pageTitle">Adicionar Vagas</h1>
            <main className="pageContent">
                <p className='page-subtitle'>
                    Adicione oportunidades de emprego para os ex-alunos da sua instituição.
                </p>
                <p ref={successRef} className={successMsg ? 'successMsg' : 'offscreen'} aria-live='assertive'>
                    {successMsg}
                </p>
                <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live='assertive'>
                    {errMsg}
                </p>
                <form onSubmit={handleSubmit} className="loginForm" style={{ minWidth: '80%' }}>
                    <h3>Informações da Vaga</h3>
                    <div className="flex-line">
                        <div>
                            <label htmlFor="jobTitle">Nome do cargo:</label>
                            <input
                                id="jobTitle"
                                type="text"
                                required
                                onChange={(e) =>
                                    setJobPostingData({
                                        ...jobPostingData,
                                        jobPosting: {
                                            ...jobPostingData.jobPosting,
                                            jobTitle: e.target.value,
                                        },
                                    })
                                }
                                value={jobPostingData.jobPosting.jobTitle}
                            />
                        </div>
                        <div>
                            <label htmlFor="company">Nome da empresa:</label>
                            <input
                                id="company"
                                type="text"
                                required
                                onChange={(e) =>
                                    setJobPostingData({
                                        ...jobPostingData,
                                        jobPosting: {
                                            ...jobPostingData.jobPosting,
                                            company: e.target.value,
                                        },
                                    })
                                }
                                value={jobPostingData.jobPosting.company}
                            />
                        </div>
                    </div>
                    <label htmlFor="salary">Faixa salarial:</label>
                    <input
                        id="salary"
                        type="text"
                        required
                        onChange={(e) =>
                            setJobPostingData({
                                ...jobPostingData,
                                jobPosting: {
                                    ...jobPostingData.jobPosting,
                                    salary: e.target.value,
                                },
                            })
                        }
                        placeholder="R$ 0,00 - 0,00"
                        value={jobPostingData.jobPosting.salary}
                    />
                    <label htmlFor="logoUrl">Logo da empresa (opcional):</label>
                    <input
                        id="logoUrl"
                        type="text"
                        onChange={(e) =>
                            setJobPostingData({
                                ...jobPostingData,
                                jobPosting: {
                                    ...jobPostingData.jobPosting,
                                    logoUrl: e.target.value,
                                },
                            })
                        }
                        placeholder="https://www.exemplo.com/logo.png"
                        value={jobPostingData.jobPosting.logoUrl}
                    />
                    <button type="submit">Cadastrar</button>
                </form>
            </main>
        </div>
    )
}

export default AddJobPosting;