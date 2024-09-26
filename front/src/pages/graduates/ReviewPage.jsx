//import ReviewItem from "../../components/ReviewItem";
import { useEffect, useState, useRef } from "react";
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from 'react-router-dom';
import ReviewItem from "../../components/ReviewItem";

function ReviewPage() {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const likertOptions = [
        { value: 1, label: 'Muito baixo' },
        { value: 2, label: 'Baixo' },
        { value: 3, label: 'Médio' },
        { value: 4, label: 'Alto' },
        { value: 5, label: 'Muito alto' },
    ];

    const courseExpectationOptions = [
        { value: "Não atendeu as expectativas", label: "Não atendeu as expectativas" },
        { value: "Atendeu as expectativas", label: "Atendeu as expectativas" },
        { value: "Superou as expectativas", label: "Superou as expectativas" },
        { value: "Não sabe / prefere não opinar", label: "Não sabe / prefere não opinar" }
    ]

    const [reviewData, setReviewData] = useState(null);

    const [changed, setChanged] = useState(false);

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    const successRef = useRef();
    const [successMsg, setSuccessMsg] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const getGraduateData = async () => {
            try {
                const response = await axiosPrivate.get(`/reviews/graduates/${auth.id}`);
                console.log("Response data", response.data);
                isMounted && setReviewData(response.data);
            } catch (err) {
                console.error(err);
                navigate('/', { state: { from: location }, replace: true });
            }
        }

        getGraduateData();

        return () => isMounted = false;
    }, [auth, axiosPrivate, location, navigate]);

    const updateField = (field, value) => {
        setReviewData(prevState => ({
            ...prevState,
            [field]: value,
        }));
        setChanged(true);
    };

    const handleSave = async () => {
        try {
            const response = await axiosPrivate.post(`/reviews`, { ...reviewData, userId: auth.id });
            console.log("Response data", response.data);
            setSuccessMsg('Review salva com sucesso!');
        } catch (err) {
            setErrMsg('Erro ao salvar a review.')
            navigate('/', { state: { from: location }, replace: true });
        }
    }

    return (
        <div className="page">
            <h1 className="pageTitle">Minhas Reviews</h1>
            <main className="pageContent">
                <p ref={successRef} className={successMsg ? 'successMsg' : 'offscreen'} aria-live='assertive'>
                    {successMsg}
                </p>
                <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live='assertive'>
                    {errMsg}
                </p>
                <p className="page-subtitle">Informe-nos quais as suas avaliações nas questões abaixo,
                    para que possamos melhorar a qualidade de ensino e entender melhor
                    as nessecidades de nossos alunos!
                </p>
                <div className="review-question">
                    <p>O seu desejo de trabalhar na área quando se formou era: </p>
                    <ReviewItem
                        name='desireToWorkArea'
                        items={likertOptions}
                        value={reviewData?.desireToWorkArea}
                        onChange={updateField}
                    />
                </div>
                <div className="review-question">
                    <p>Na sua opinião, como foi o seu nível de aprendizado durante o curso? </p>
                    <ReviewItem
                        name='learningLevelRating'
                        items={likertOptions}
                        value={reviewData?.learningLevelRating}
                        onChange={updateField}
                    />
                </div>
                <div className="review-question">
                    <p>Como o(a) sr(a) avalia o curso que o(a) sr(a) concluiu no IF Sudeste MG Campus Juiz de Fora? </p>
                    <ReviewItem
                        name='courseRating'
                        items={likertOptions}
                        value={reviewData?.courseRating}
                        onChange={updateField}
                    />
                </div>
                <div className="review-question">
                    <p>Na sua opinião, como o(a) sr(a) avalia o IF Sudeste MG Campus Juiz de Fora de um modo geral? </p>
                    <ReviewItem
                        name='campusRating'
                        items={likertOptions}
                        value={reviewData?.campusRating}
                        onChange={updateField}
                    />
                </div>
                <div className="review-question">
                    <p>Como o sr(a) avalia a infraestrutura geral do IF Sudeste MG Campus Juiz de Fora? </p>
                    <ReviewItem
                        name='infraRating'
                        items={likertOptions}
                        value={reviewData?.infraRating}
                        onChange={updateField}
                    />
                </div>
                <div className="review-question">
                    <p>Como o(a) sr(a) avalia os conhecimentos teóricos da sua área de formação? </p>
                    <ReviewItem
                        name='theoKnowledgeRating'
                        items={likertOptions}
                        value={reviewData?.theoKnowledgeRating}
                        onChange={updateField}
                    />
                </div>
                <div className="review-question">
                    <p>Como o(a) sr(a) avalia os conhecimentos práticos da sua área de formação? </p>
                    <ReviewItem
                        name='practKnowledgeRating'
                        items={likertOptions}
                        value={reviewData?.practKnowledgeRating}
                        onChange={updateField}
                    />
                </div>
                <div className="review-question">
                    <p>Como o(a) sr(a) avalia a qualificação dos seus professores? </p>
                    <ReviewItem
                        name='teachersRating'
                        items={likertOptions}
                        value={reviewData?.teachersRating}
                        onChange={updateField}
                    />
                </div>
                <div className="review-question">
                    <p>Como foi o seu curso em relação à sua expectativa? </p>
                    <ReviewItem
                        name='courseExpectation'
                        items={courseExpectationOptions}
                        value={reviewData?.courseExpectation}
                        onChange={updateField}
                    />
                </div>
                <button
                    disabled={!changed}
                    className={
                        changed ?
                            "save-changes-button"
                            : "save-changes-button-disabled"
                    }
                    onClick={handleSave}
                >
                    Salvar
                </button>
            </main>
        </div>
    )
}

export default ReviewPage;