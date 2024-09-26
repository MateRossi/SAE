/* eslint-disable react/prop-types */
import Dropdown from "./Dropdown";
import surveyOptions from "../constants/surveyOptions";
import RadioGroup from "./RadioGroup";
import ReviewItem from "./ReviewItem";
import { useEffect, useState } from "react";

export default function Trabalhando({
    surveyData,
    radioOptions,
    likertOptions,
    handleSubmit
}) {
    const [changed, setChanged] = useState(false);
    const [companyName, setCompanyName] = useState(surveyData?.companyName);
    const [positionName, setPositionName] = useState(surveyData?.positionName);
    const [employmentType, setEmploymentType] = useState(surveyData?.employmentType);
    const [worksInArea, setWorksInArea] = useState(surveyData?.worksInArea);
    const [positionEducationRequirement, setPositionEducationRequirement] = useState(surveyData?.positionEducationRequirement);

    const updateField = (field, value) => {
        setPositionEducationRequirement(value);
    };

    useEffect(() => {
        setChanged(true);
    }, [positionName, employmentType, worksInArea, positionEducationRequirement])

    const handleSubmitClick = (e) => {
        e.preventDefault();

        const value = {
            positionName,
            employmentType: employmentType?.name,
            worksInArea,
            positionEducationRequirement,
            companyName,
        }
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
                    onChange={updateField}
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