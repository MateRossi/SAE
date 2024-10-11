import Estudando from "./Estudando";
import Trabalhando from "./Trabalhando";
import TrabalhandoEstudando from "./TrabalhandoEstudando";

/* eslint-disable react/prop-types */
export default function SurveyForm({ surveyData, setSurveyData, handleSubmit }) {
    const radioOptions = [
        { value: true, label: 'Sim' },
        { value: false, label: 'Não' },
    ];

    const likertOptions = [
        { value: 1, label: 'Muito baixa' },
        { value: 2, label: 'Baixa' },
        { value: 3, label: 'Média' },
        { value: 4, label: 'Alta' },
        { value: 5, label: 'Muito alta' },
    ];

    if (surveyData?.situation === "Trabalhando") return (
        <Trabalhando
            surveyData={surveyData}
            radioOptions={radioOptions}
            likertOptions={likertOptions}
            handleSubmit={handleSubmit}
        />
    );

    if (surveyData?.situation === "Apenas estudando") return (
        <Estudando
            surveyData={surveyData}
            setSurveyData={setSurveyData}
            likertOptions={likertOptions}
            handleSubmit={handleSubmit}
        />
    );

    console.log(surveyData?.situation);

    if (surveyData?.situation === "Trabalhando e estudando") return (
        <TrabalhandoEstudando 
            surveyData={surveyData}
            setSurveyData={setSurveyData}
            radioOptions={radioOptions}
            likertOptions={likertOptions}
            handleSubmit={handleSubmit}
        />
    )
}