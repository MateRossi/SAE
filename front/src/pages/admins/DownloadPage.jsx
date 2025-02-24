import { useEffect, useRef, useState } from "react"
import RadioGroup from "../../components/RadioGroup";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function DownloadPage() {
    const radioOptions = [
        { value: "followUp", label: "Egressos que responderam ao acompanhamento de carreira." },
        { value: "ratings", label: "Egressos que responderam às avaliações da instituição." },
        { value: "both", label: "Egressos que responderam a ambos." },
        { value: "none", label: "Todos os egressos (pode conter muitos dados nulos)." }
    ];

    const axiosPrivate = useAxiosPrivate();

    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const [graduateFilter, setGraduateFilter] = useState('');

    const errRef = useRef();
    const successRef = useRef();

    useEffect(() => {
        setErrMsg('');
        setSuccessMsg('');
    }, [graduateFilter])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.get(
                `/users/admin/download-csv?filter=${graduateFilter}`,
                { responseType: 'blob' }
            );

            const blob = new Blob([response.data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ecressos_${graduateFilter}.csv`
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

            setSuccessMsg('Download iniciado.');
        } catch (error) {
            if (!error?.response) {
                setErrMsg('Sem resposta.');
            } else if (error.response?.status === 400) {
                setErrMsg('Dados faltantes.');
            } else if (error.response?.status === 401) {
                setErrMsg('Não autorizado.');
            } else {
                setErrMsg('Falha ao fazer download.');
                console.error(error);
            }
        }
    }

    return (
        <div className="page">
            <h1 className='pageTitle'>Download de informações</h1>
            <section className="centerContent pageContent">
                <div className="alert-msgs">
                    <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live="assertive">
                        {errMsg}
                    </p>
                    <p ref={successRef} className={successMsg ? 'successMsg' : 'offscreen'} aria-live="assertive">
                        {successMsg}
                    </p>
                </div>
                <p>Selecione abaixo quais informações você deseja obter:</p>
                <form onSubmit={handleSubmit}>
                    <div className="radio-filter-container">
                        <RadioGroup
                            name='graduate-select'
                            items={radioOptions}
                            value={graduateFilter}
                            onChange={setGraduateFilter}
                        />
                    </div>
                    <button
                        className="sb-button"
                        type="submit"
                        disabled={!graduateFilter}
                    >
                        Download
                    </button>
                </form>
            </section>
        </div >
    )
}