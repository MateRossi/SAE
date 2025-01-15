import { useLocation, useNavigate, useParams } from "react-router-dom";
import '../page.css';
import { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function GraduateDetailsPage() {
    const { graduateId } = useParams();

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    const successRef = useRef();
    const [successMsg, setSuccessMsg] = useState('');

    const [graduateInfo, setGraduateInfo] = useState({
        id: null,
        enrollment: '',
        name: '',
        email: '',
        allowEmails: false,
        phoneNumber: '',
        tellTrajectory: null,
        workedBefore: null,
        degreeLevel: null,
        commentary: null,
        role: '',
        entryYear: null,
        graduationYear: null,
        refreshToken: '',
        createdAt: '',
        updatedAt: '',
        courseId: null,
        course: {
            name: '',
            acronym: '',
        },
        survey: {
            id: 3,
            situation: null,
            positionName: null,
            employmentType: null,
            worksInArea: null,
            positionEducationRequirement: null,
            externalCourseName: null,
            courseRelationLevel: null,
            companyName: null,
            userId: null,
            updatedAt: null,
        },
        review: {
            id: null,
            desireToWorkArea: null,
            learningLevelRating: null,
            courseRating: null,
            campusRating: null,
            infraRating: null,
            theoKnowledgeRating: null,
            practKnowledgeRating: null,
            teachersRating: null,
            courseExpectation: '',
            updatedAt: '',
            userId: null,
        },
    });

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const getGraduateInfo = async () => {
            try {
                const response = await axiosPrivate.get(`/users/admin/graduates/${graduateId}`);
                isMounted && setGraduateInfo(response.data);
                console.log(response.data)
                setLoading(false);
            } catch (err) {
                console.error(err);
                setErrMsg('Erro ao obter os dados do egresso.');
            }
        }

        getGraduateInfo()

        return () => isMounted = false;
    }, [axiosPrivate, graduateId, location, navigate]);

    const getFormattedDate = (newDate) => {
        const date = new Date(newDate);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year}, às ${hours}:${minutes}`;
    }

    const handleBoolan = (value) => {
        if (value === true) return 'Sim';
        if (value === false) return 'Não';
        if (!value) return 'Não informado';
    }

    const handleLikert = (value) => {
        if (!value) return 'Não informado';

        const options = {
            1: 'Muito baixa',
            2: 'Baixa',
            3: 'Média',
            4: 'Alta',
            5: 'Muito alta',
        };

        return options[value];
    }

    const handleConfirm = async (graduateId) => {
        const userInput = window.prompt("Digite a matrícula para confirmar este egresso:");

        if (userInput === null) {
            console.log("Ação cancelada pelo usuário.");
            return;
        }

        const isConfirmed = window.confirm(`Deseja confirmar este egresso usando a matrícula "${userInput}"?`);

        if (isConfirmed) {
            const data = {
                enrollment: userInput
            }

            setLoading(true);
            try {
                const response = await axiosPrivate.patch(`/users/graduates/${graduateId}/confirm-graduate`, data);
                console.log(response.data)
                setGraduateInfo(response.data);
                setLoading(false);
                setSuccessMsg('Egresso confirmado.')
            } catch (err) {
                console.error(err);
                setLoading(false);
                setErrMsg('Erro ao confirmar egresso.')
            }
        } else {
            return;
        }
    }

    const handleDelete = (graduateId) => {
        console.log(graduateId);
    }

    if (loading) {
        return (
            <div className="page">
                <h1 className="pageTitle">Informações detalhadas</h1>
                <main className="pageContent">
                    <p>carregando...</p>
                </main>
            </div>
        )
    }

    return (
        <div className="page">
            <h1 className="pageTitle">Informações detalhadas</h1>
            <main className="pageContent">
                <p ref={successRef} className={successMsg ? 'successMsg' : 'offscreen'} aria-live='assertive'>
                    {successMsg}
                </p>
                <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live='assertive'>
                    {errMsg}
                </p>
                <h2>{graduateInfo.name}</h2>
                <a href={graduateInfo.email}>{graduateInfo.email}</a>
                <p>{graduateInfo.enrollment ? 'Confirmado(a)' : 'Não confirmado(a)'}</p>
                <div className="detailsOptions">
                    <button className="backButton" disabled={graduateInfo.enrollment} onClick={() => handleConfirm(graduateId)}>
                        Confirmar Egresso
                    </button>
                    <button className="backButton" onClick={() => handleDelete(graduateId)}>
                        Excluir Cadastro
                    </button>
                </div>
                <button className="backButton" onClick={() => navigate(-1)}>Voltar</button>
                <div className="dottedList">
                    <h4>Dados gerais</h4>
                    <ul>
                        <li><span>Formou-se no curso</span><span>{graduateInfo.course.name || 'Não informado'}</span></li>
                        <li><span>Matrícula</span><span>{graduateInfo.enrollment || 'Não confirmado(a)'}</span></li>
                        <li><span>Recebe emails do sistema</span><span>{graduateInfo.allowEmails ? 'Sim' : 'Não'}</span></li>
                        <li><span>Contato</span><span>{graduateInfo.phoneNumber || 'Não informado'}</span></li>
                        <li><span>Ano de ingresso</span><span>{graduateInfo.entryYear || 'Não informado'}</span></li>
                        <li><span>Ano de formatura</span><span>{graduateInfo.graduationYear || 'Não informado'}</span></li>
                        <li>
                            <span>Última atualização</span>
                            <span>
                                {
                                    graduateInfo.updatedAt ? getFormattedDate(graduateInfo.updatedAt) : 'Nunca'
                                }
                            </span>
                        </li>
                    </ul>
                    <h4>Respostas do Acompanhamento de Carreira</h4>
                    <div className="answers">
                        <p className="question">
                            Teria interesse e disponibilidade de contar sua trajetória para os alunos atuais?
                            <span>{handleBoolan(graduateInfo.tellTrajectory)}</span>
                        </p>
                        <p className="question">
                            Já trabalhava antes de iniciar seu curso?
                            <span>{handleBoolan(graduateInfo.workedBefore)}</span>
                        </p>
                        <p className="question">
                            Qual o seu nível de escolaridade atual?
                            <span>{graduateInfo.degreeLevel || 'Não informado'}</span>
                        </p>
                        <p className="question">
                            Atualmente o(a) sr(a) está:
                            <span>{graduateInfo?.survey?.situation || 'Não iformado'}</span>
                        </p>
                        <p className="question">
                            O seu desejo de trabalhar na área quando se formou era:
                            <span>{handleLikert(graduateInfo?.review?.desireToWorkArea)}</span>
                        </p>
                        <p className="question">
                            Qual o nome do seu cargo atual?
                            <span>{graduateInfo?.survey?.positionName || 'Não informado'}</span>
                        </p>
                        <p className="question">
                            Qual o nome da empresa em que você trabalha?
                            <span>{graduateInfo?.survey?.companyName || 'Não informado'}</span>
                        </p>
                        <p className="question">
                            Qual é o seu vínculo empregatício?
                            <span>{graduateInfo?.survey?.positionName || 'Não informado'}</span>
                        </p>
                        <p className="question">
                            Você trabalha na área em que se formou?
                            <span>{handleBoolan(graduateInfo?.survey?.worksInArea)}</span>
                        </p>
                        <p className="question">
                            Como é a exigência da sua capacitação profissional na atualidade?
                            <span>{handleLikert(graduateInfo?.survey?.positionEducationRequirement)}</span>
                        </p>
                        <p className="question">
                            Após a conclusão do seu curso, o(a) sr(a) concluiu ou está cursando outro curso?
                            <span>{graduateInfo?.survey?.externalCourseName || 'Não'}</span>
                        </p>
                        <p className="question">
                            Se sim, qual a relação entre a área profissional deste novo curso e o curso anterior?
                            <span>{handleLikert(graduateInfo?.survey?.courseRelationLevel)}</span>
                        </p>
                    </div>
                    <h4>Respostas da Avaliação Institucional</h4>
                    <div className="answers">
                        <p className="question">
                            Na sua opinião, como foi a sua aprendizagem durante o curso?
                            <span>{graduateInfo?.review?.learningLevelRating || 'Não informado'}</span>
                        </p>
                        <p className="question">
                            Como o(a) sr(a) avalia o curso que o(a) sr(a) concluiu no IF Sudeste MG Campus Juiz de Fora?
                            <span>{graduateInfo?.review?.courseRating || 'Não informado'}</span>
                        </p>
                        <p className="question">
                            Na sua opinião, como o(a) sr(a) avalia o IF Sudeste MG Campus Juiz de Fora de um modo geral?
                            <span>{graduateInfo?.review?.campusRating || 'Não informado'}</span>
                        </p>
                        <p className="question">
                            Como o sr(a) avalia a infraestrutura geral do IF Sudeste MG Campus Juiz de Fora?
                            <span>{graduateInfo?.review?.infraRating || 'Não informado'}</span>
                        </p>
                        <p className="question">
                            Como o(a) sr(a) avalia os conhecimentos teóricos da sua área de formação?
                            <span>{graduateInfo?.review?.theoKnowledgeRating || 'Não informado'}</span>
                        </p>
                        <p className="question">
                            Como o(a) sr(a) avalia os conhecimentos práticos da sua área de formação?
                            <span>{graduateInfo?.review?.practKnowledgeRating || 'Não informado'}</span>
                        </p>
                        <p className="question">
                            Como o(a) sr(a) avalia a qualificação dos seus professores?
                            <span>{graduateInfo?.review?.teachersRating || 'Não informado'}</span>
                        </p>
                        <p className="question">
                            Como foi o seu curso em relação a sua expectativa?
                            <span>{graduateInfo?.review?.courseExpectation || 'Não informado'}</span>
                        </p>
                        <p className="question">
                            Como foi o seu curso em relação a sua expectativa?
                            <span>{graduateInfo?.review?.courseExpectation || 'Não informado'}</span>
                        </p>
                    </div>
                    <h4>Comentários Adicionais</h4>
                    <div className="commentary">
                        {graduateInfo.commentary || 'Não cadastrado'}
                    </div>
                </div>
            </main>
        </div>
    );
}