import { useEffect, useRef, useState } from 'react';
import '../page.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useLocation, useNavigate } from 'react-router-dom';
import SortableTable from '../../components/sortableTable/SortableTable';
import Dropdown from '../../components/Dropdown';
import FilterOptions from '../../components/filterOptions/filterOptions';
import useAuth from '../../hooks/useAuth';
import Pagination from '../../components/pagination/Pagination';

function GraduatesPage() {
    const [graduates, setGraduates] = useState([]);

    const [courses, setCourses] = useState([]);

    const { auth } = useAuth();

    const [successMsg, setSuccessMsg] = useState('');
    const successRef = useRef();

    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef();

    const [loading, setLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const [filter, setFilter] = useState({
        confirmed: true,
        notConfirmed: true,
        outdated: false,
        course: ''
    });

    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
    });

    const getPaginatedGraduates = (graduates, page, pageSize) => {
        const offset = (page - 1) * pageSize;
        return graduates.slice(offset, offset + pageSize);
    };

    useEffect(() => {
        let isMounted = true;
        const getCourses = async () => {
            try {
                const response = await axiosPrivate.get(`/courses`);
                console.log(response.data);
                isMounted && setCourses([{ id: '734857390mdlamdaçç42', name: 'Todos os cursos' }, ...response.data]);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        }

        getCourses()

        return () => isMounted = false;
    }, [axiosPrivate]);

    useEffect(() => {
        let isMounted = true;
        const getGraduates = async () => {
            try {
                const response = await axiosPrivate.get(`/users/graduates?confirmed=${filter?.confirmed}&notConfirmed=${filter?.notConfirmed}&outdated=${filter?.outdated}&course=${filter.course}`);
                if (isMounted) {
                    setGraduates(response.data);
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
                navigate('/', { state: { from: location }, replace: true })
            }
        }

        getGraduates();

        return () => isMounted = false;
    }, [axiosPrivate, filter?.confirmed, filter?.course, filter?.notConfirmed, filter?.outdated, location, navigate]);

    useEffect(() => {
        console.log(filter);
    }, [filter])

    const keyFn = (graduate) => {
        return graduate.id;
    }

    const handleNullValue = (value) => {
        if (value === true) return <div className='true-sim'>Sim</div>

        if (value === false) return <div className='false-nao'>Não</div>

        return value || '-';
    }

    const handleSendClick = async (graduates) => {
        const mailData = {
            subject: 'Atualização de Informações Cadastrais',
            bcc: graduates,
            text: "Que tal dar uma atualizada nos seus dados? É rapidinho! 😊"
        }
        setLoading(true);
        try {
            const response = await axiosPrivate.post(`/users/${auth.id}/send-bulk-emails`, mailData);
            setLoading(false);
            setSuccessMsg(`
                Emails enviados. 
                Aceitos: ${response.data.info.accepted?.length} 
                Rejeitados: ${response.data.info.rejected?.length}
            `);
        } catch (err) {
            console.log(err);
            setLoading(false);
            setErrMsg('Falha ao enviar emails.');
        }
    }

    const handleAddGraduate = () => {
        navigate("/admin/add-graduates");
    }

    const config = [
        {
            label: 'Opções',
            render: (graduate) => {
                return <div className='table-buttons'>
                    <button className='info-button' onClick={() => navigate(`/admin/graduates/${graduate.id}`)}>Info</button>
                    <button className='msg-button' onClick={() => console.log(graduate.id)}>Msg</button>
                </div>
            }
        },
        {
            label: 'Matrícula',
            render: (graduate) => handleNullValue(graduate.matricula),
        },
        {
            label: 'Nome',
            render: (graduate) => handleNullValue(graduate.nome),
        },
        {
            label: 'E-mail',
            render: (graduate) => handleNullValue(graduate.email),
        },
        {
            label: 'Recebe Emails',
            render: (graduate) => handleNullValue(graduate.recebeEmails),
            sortValue: (graduate) => handleNullValue(graduate.recebeEmails)
        },
        {
            label: 'Ano de Ingresso',
            render: (graduate) => handleNullValue(graduate.anoIngresso),
            sortValue: (graduate) => handleNullValue(graduate.anoIngresso),
        },
        {
            label: 'Ano de Formatura',
            render: (graduate) => handleNullValue(graduate.anoFormatura),
            sortValue: (graduate) => handleNullValue(graduate.anoFormatura),
        },
        {
            label: 'Número para Contato',
            render: (graduate) => handleNullValue(graduate.numeroContato),
        },
        {
            label: 'Contar Trajetória',
            render: (graduate) => handleNullValue(graduate.contarTrajetoria),
        },
        {
            label: 'Trabalhava Antes',
            render: (graduate) => handleNullValue(graduate.trabalhavaAntes),
            sortValue: (graduate) => handleNullValue(graduate.trabalhavaAntes),
        },
        {
            label: 'Nível Acadêmico',
            render: (graduate) => handleNullValue(graduate.nivelAcademico),
            sortValue: (graduate) => handleNullValue(graduate.nivelAcademico),
        },
        {
            label: 'Comentários',
            render: (graduate) => handleNullValue(graduate.comentarios),
        },
        {
            label: 'Atualizado em',
            render: (graduate) => handleNullValue(graduate.atualizadoEm),
            sortValue: (graduate) => handleNullValue(graduate.atualizadoEm),
        },
        {
            label: 'Curso',
            render: (graduate) => handleNullValue(graduate.curso),
            sortValue: (graduate) => handleNullValue(graduate.curso),
        },
        {
            label: 'Sigla do Curso',
            render: (graduate) => handleNullValue(graduate.siglaCurso),
            sortValue: (graduate) => handleNullValue(graduate.siglaCurso),
        },
        {
            label: 'Situação Atual',
            render: (graduate) => handleNullValue(graduate.situacaoAtual),
            sortValue: (graduate) => handleNullValue(graduate.situacaoAtual),
        },
        {
            label: 'Cargo Atual',
            render: (graduate) => handleNullValue(graduate.cargoAtual),
            sortValue: (graduate) => handleNullValue(graduate.cargoAtual),
        },
        {
            label: 'Nome da Empresa',
            render: (graduate) => handleNullValue(graduate.nomeEmpresa),
        },
        {
            label: 'Tipo de Contrato',
            render: (graduate) => handleNullValue(graduate.tipoContrato),
            sortValue: (graduate) => handleNullValue(graduate.tipoContrato),
        },
        {
            label: 'Trabalha na Área',
            render: (graduate) => handleNullValue(graduate.trabalhaArea),
            sortValue: (graduate) => handleNullValue(graduate.trabalhaArea),
        },
        {
            label: 'Requerimento de Formação no Cargo',
            render: (graduate) => handleNullValue(graduate.requerimentoFormacaoNoCargo),
            sortValue: (graduate) => handleNullValue(graduate.requerimentoFormacaoNoCargo),
        },
        {
            label: 'Curso Externo Atual',
            render: (graduate) => handleNullValue(graduate.cursoExternoAtual),
        },
        {
            label: 'Relação do Curso Externo com Formação',
            render: (graduate) => handleNullValue(graduate.relacaoCursoExternoEFormacao),
            sortValue: (graduate) => handleNullValue(graduate.relacaoCursoExternoEFormacao),
        },
        {
            label: 'Desejo de Trabalhar na Área',
            render: (graduate) => handleNullValue(graduate.desejoTrabalharArea),
            sortValue: (graduate) => handleNullValue(graduate.desejoTrabalharArea),
        },
        {
            label: 'Nível de Aprendizado',
            render: (graduate) => handleNullValue(graduate.nivelAprendizado),
            sortValue: (graduate) => handleNullValue(graduate.nivelAprendizado),
        },
        {
            label: 'Avaliação do Curso',
            render: (graduate) => handleNullValue(graduate.avaliacaoCurso),
            sortValue: (graduate) => handleNullValue(graduate.avaliacaoCurso),
        },
        {
            label: 'Avaliação do Campus',
            render: (graduate) => handleNullValue(graduate.avalicaoCampus),
            sortValue: (graduate) => handleNullValue(graduate.avalicaoCampus),
        },
        {
            label: 'Avaliação da Infraestrutura',
            render: (graduate) => handleNullValue(graduate.avalicaoInfraestrutura),
            sortValue: (graduate) => handleNullValue(graduate.avalicaoInfraestrutura),
        },
        {
            label: 'Avaliação de Conhecimentos Teóricos',
            render: (graduate) => handleNullValue(graduate.avaliacaoConhecimentosTeoricos),
            sortValue: (graduate) => handleNullValue(graduate.avaliacaoConhecimentosTeoricos),
        },
        {
            label: 'Avaliação de Conhecimentos Práticos',
            render: (graduate) => handleNullValue(graduate.avaliacaoConhecimentosPraticos),
            sortValue: (graduate) => handleNullValue(graduate.avaliacaoConhecimentosPraticos),
        },
        {
            label: 'Avaliação dos Docentes',
            render: (graduate) => handleNullValue(graduate.avaliacaoDocentes),
            sortValue: (graduate) => handleNullValue(graduate.avaliacaoDocentes),
        },
        {
            label: 'Expectativa do Curso',
            render: (graduate) => handleNullValue(graduate.expectativaCurso),
            sortValue: (graduate) => handleNullValue(graduate.expectativaCurso),
        }
    ];

    const handleCourseChange = (value) => {
        console.log('select value', value);
        setFilter((prev) => ({
            ...prev,
            course: value.name === 'Todos os cursos' ? '' : value.name,
        }));
    };

    useEffect(() => {
        setPagination({
            page: 1,
            pageSize: 10,
        })
    }, [filter])

    return (
        <div className="page">
            <h1 className='pageTitle'>Egressos cadastrados</h1>
            <main className="pageContent">
                {/*<p className='page-subtitle'>
                    Abaixo estão listados os alunos que se declaram egressos do IF Sudeste MG - Campus Juiz de Fora
                </p>*/}
                <div className='filtros'>
                    Filtros aplicados:
                    <FilterOptions filter={filter} setFilter={setFilter} />
                    <div className='select-course-filter'>
                        <label htmlFor="select_course">
                            Filtrar por curso:
                        </label>
                        {!loading && <Dropdown options={courses} value={filter?.course} onChange={handleCourseChange} />}
                    </div>
                </div>
                <p ref={successRef} className={successMsg ? 'successMsg' : 'offscreen'} aria-live='assertive'>
                    {successMsg}
                </p>
                <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live='assertive'>
                    {errMsg}
                </p>
                {loading && <p>Enviando emails...</p>}
                <button className='add-button' onClick={() => handleAddGraduate()}>Adicionar Egresso(s)</button>
                <div className='send-mails-container'>
                    Enviar emails para o filtro selecionado? ({graduates?.length} egressos)
                    <button onClick={() => handleSendClick(graduates)}>Enviar</button>
                </div>
                {
                    graduates?.length ? <div className='table-overflow-container'>
                        <SortableTable
                            data={getPaginatedGraduates(graduates, pagination.page, pagination.pageSize)}
                            keyFn={keyFn}
                            config={config}
                        />
                    </div> : <p>Sem dados para mostrar.</p>
                }
                {
                    graduates.length > 0 ?
                    <Pagination
                    pagination={pagination}
                    setPagination={setPagination}
                    listLength={graduates.length}
                /> : null
                }
            </main>
        </div>
    );
}

export default GraduatesPage;