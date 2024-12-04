import { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import SortableTable from '../../components/sortableTable/SortableTable';
import deleteIcon from '../../img/deleteIcon.svg';
import editIcon from '../../img/editIcon.svg';
import PageTemplate from "../PageTemplate";

function ModalitiesPage() {
    const [modalities, setModalities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    const successRef = useRef();
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        let isMounted = true;
        const getModalities = async () => {
            try {
                const response = await axiosPrivate.get(`/modalities`);
                if (isMounted) {
                    setModalities(response.data);
                    setLoading(false);
                    console.log(response.data);
                }
            } catch (err) {
                console.error(err);
                navigate('/', { state: { from: location }, replace: true })
            }
        }

        getModalities();

        return () => isMounted = false;
    }, [axiosPrivate, location, navigate]);

    const keyFn = (course) => {
        return course.id;
    }

    if (loading) {
        return <PageTemplate pageTitle={'Modalidades dos cursos ofertados'} subtitle={'Abaixo estão listados as modalidades dos cursos ofertados pelo IF Sudeste MG - Campus Juiz de Fora'}>
            <h3>Carregando...</h3>
        </PageTemplate>
    }

    if (modalities.length === 0) {
        return <PageTemplate pageTitle={'Modalidades dos cursos ofertados'} subtitle={'Abaixo estão listados as modalidades dos cursos ofertados pelo IF Sudeste MG - Campus Juiz de Fora'}>
            <h3>Sem dados para mostrar.</h3>
        </PageTemplate>
    }

    const handleDelete = async (modalityId) => {
        const isConfirmed = window.confirm('Tem certeza que deseja deletar esta modalidade? TODOS os cursos relacionados serão removidos.');

        if (isConfirmed) {
            try {
                await axiosPrivate.delete(`/modalities/${modalityId}`);
                setSuccessMsg('Modalidade excluída com sucesso.');
                successRef.current.focus();
                setModalities((prevModalities) => prevModalities.filter(modality => modality.id !== modalityId));
            } catch (error) {
                setErrMsg('Erro ao deletar modalidade.');
                errRef.current.focus();
            }
        }
    }

    const handleEdit = (modality) => {
        navigate(`/admin/modalities/${modality.id}/edit-modality`, { state: { modality } });
    }

    const config = [
        {
            label: 'Modalidade',
            render: (modality) => modality.description,
        },
        {
            label: 'Quantidade de Cursos Relacionados',
            render: (modality) => modality.courseCount,
            sortValue: (modality) => modality.courseCount,
        },
        {
            label: 'Opções',
            render: (modality) => {
                return <div className='table-options'>
                    <button className='info-button' onClick={() => handleEdit(modality)}>
                        <img className="table-options-icon" src={editIcon} alt="icone de editar" />
                    </button>
                    <button className='msg-button' onClick={() => handleDelete(modality.id)}>
                        <img className="table-options-icon" src={deleteIcon} alt='icone de de excluir' />
                    </button>
                </div>
            }
        },
    ]

    const handleClick = () => {
        navigate('/admin/add-modality');
    }

    const filteredModalities = modalities.filter(modality =>
        modality.description.toLowerCase().includes(search.toLowerCase()) ||
        modality.coursesCount.toLowerCase().includes(search.toLocaleLowerCase())
    );

    return (
        <div className="page">
            <h1 className='pageTitle'>Modalidades dos cursos ofertados</h1>
            <main className="pageContent">
                <p className='page-subtitle'>
                    Abaixo estão listados as modalidades dos cursos ofertados pelo IF Sudeste MG - Campus Juiz de Fora
                </p>
                <p ref={successRef} className={successMsg ? 'successMsg' : 'offscreen'} aria-live='assertive'>
                    {successMsg}
                </p>
                <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live='assertive'>
                    {errMsg}
                </p>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Pesquisar por nome da modalidade ou quantidade de cursos."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="add-button" onClick={handleClick}>
                        Adicionar Modalidade
                    </button>
                </div>
                <div className='table-overflow-container'>
                    <SortableTable data={!search ? modalities : filteredModalities} keyFn={keyFn} config={config} />
                </div>
            </main>
        </div>
    )
}

export default ModalitiesPage;