/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import ReviewItem from "./ReviewItem";

export default function Estudando({
    surveyData,
    handleSubmit,
    likertOptions,

}) {
    const [changed, setChanged] = useState(false);
    const [courseName, setCourseName] = useState(surveyData?.externalCourseName);
    const [relationLevel, setRelationLevel] = useState(surveyData?.courseRelationLevel);

    const updateField = (field, value) => {
        setRelationLevel(value);
    };

    useEffect(() => {
        setChanged(true);
    }, [courseName, relationLevel]);

    const handleSubmitClick = (e) => {
        e.preventDefault();

        const value = {
            externalCourseName: courseName,
            courseRelationLevel: relationLevel,
        }
        handleSubmit(value);
    }

    return (
        <form className="loginForm">
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