import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import RadioGroup from "./RadioGroup";
import ReviewItem from "./ReviewItem";
import surveyOptions from "../constants/surveyOptions";

export default function TrabalhandoEstudando({ surveyData, radioOptions, likertOptions, handleSubmit }) {
    const [changed, setChanged] = useState(false);
    const [companyName, setCompanyName] = useState(surveyData?.companyName);
    const [positionName, setPositionName] = useState(surveyData?.positionName);
    const [employmentType, setEmploymentType] = useState(surveyData?.employmentType);
    const [worksInArea, setWorksInArea] = useState(surveyData?.worksInArea);
    const [positionEducationRequirement, setPositionEducationRequirement] = useState(surveyData?.positionEducationRequirement);
    const [courseName, setCourseName] = useState(surveyData?.externalCourseName);
    const [relationLevel, setRelationLevel] = useState(surveyData?.courseRelationLevel);


    const updateEducation = (field, value) => {
        setPositionEducationRequirement(value);
    };

    const updateRelation = (field, value) => {
        setRelationLevel(value);
    }

    useEffect(() => {
        setChanged(true);
    }, [positionName, employmentType, worksInArea, positionEducationRequirement, courseName, relationLevel])

    const handleSubmitClick = (e) => {
        e.preventDefault();

        const value = {
            positionName,
            employmentType: employmentType?.name,
            worksInArea,
            positionEducationRequirement,
            companyName,
            externalCourseName: courseName,
            courseRelationLevel: relationLevel,
        }

        console.log("Value de trabalhando e estudando: ", value);
        handleSubmit(value);
    }

    return (
        <form className="loginForm">
            <label htmlFor="companyName" style={{ marginBottom: "10px", marginTop: "16px" }}>Nome da empresa: </label>
            <input
                id="companyName"
                type="text"
                defaultValue={companyName}
                required
                onChange={(e) => setCompanyName(e.target.value)}
            />
            <label htmlFor="name" style={{ marginBottom: "10px" }}>Nome do cargo: </label>
            <input
                id="positionName"
                type="text"
                defaultValue={positionName}
                required
                onChange={(e) => setPositionName(e.target.value)}
            />
            <label htmlFor="select_employment_type" style={{ marginBottom: "10px" }}>Qual o tipo de contrado do seu trabalho atual?</label>
            {surveyData &&
                <Dropdown
                    options={surveyOptions.employmentType}
                    value={employmentType}
                    onChange={setEmploymentType}
                />
            }
            <div className="radioButtonContainer">
                <p style={{ marginBottom: "10px" }}>O(a) sr(a) trabalha na área em que se formou? </p>
                <RadioGroup
                    name='worksInArea'
                    items={radioOptions}
                    value={worksInArea}
                    onChange={setWorksInArea}
                />
            </div>
            <div className="survey-likert">
                <p>Como é a exigência da sua capacitação profissional na atualidade?</p>
                <ReviewItem
                    name='positionEducationRequirement'
                    items={likertOptions}
                    value={positionEducationRequirement}
                    onChange={updateEducation}
                />
            </div>
            <label htmlFor="courseName" style={{ marginBottom: "10px", marginTop: "16px" }}>Nome do curso: </label>
            <input
                id="courseName"
                type="text"
                defaultValue={courseName}
                required
                onChange={(e) => setCourseName(e.target.value)}
            />
            <div className="survey-likert">
                <p>Qual a relação entre a área profissional deste novo curso e o curso anterior?</p>
                <ReviewItem
                    name='relationLevel'
                    items={likertOptions}
                    value={relationLevel}
                    onChange={updateRelation}
                />
            </div>
            <button
                type="submit"
                onClick={handleSubmitClick}
                disabled={!changed}
            >
                Salvar
            </button>
        </form>
    )
}