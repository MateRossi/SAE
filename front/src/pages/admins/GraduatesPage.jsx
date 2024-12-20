import { useEffect, useState } from 'react';
import '../page.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useLocation, useNavigate } from 'react-router-dom';
import SortableTable from '../../components/sortableTable/SortableTable';
import PageTemplate from '../PageTemplate';

function GraduatesPage() {
    const [graduates, setGraduates] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const getGraduates = async () => {
            try {
                const response = await axiosPrivate.get(`/users/graduates`);
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
    }, [axiosPrivate, location, navigate]);

    const keyFn = (graduate) => {
        return graduate.id;
    }

    if (loading) {
        return <PageTemplate pageTitle={'Egressos cadastrados'} subtitle={'Abaixo estão listados os alunos que se declaram egressos do IF Sudeste MG - Campus Juiz de Fora'}>
            <h3>Carregando...</h3>
        </PageTemplate>
    }

    if (graduates.length === 0) {
        return <PageTemplate pageTitle={'Egressos cadastrados'} subtitle={'Abaixo estão listados os alunos que se declaram egressos do IF Sudeste MG - Campus Juiz de Fora'}>
            <h3>Sem dados para mostrar.</h3>
        </PageTemplate>
    }

    const handleNullValue = (value) => {
        if (value === true) return <div className='true-sim'>Sim</div>
        
        if (value === false) return <div className='false-nao'>Não</div>

        return value || '-';
    }

    console.log(graduates);

    const config = [
        {
            label: 'Opções',
            render: (graduate) => {
                return <div className='table-buttons'>
                    <button className='info-button' onClick={() => console.log(graduate.id)}>Info</button>
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

    return (
        <div className="page">
            <h1 className='pageTitle'>Egressos cadastrados</h1>
            <main className="pageContent">
                <p className='page-subtitle'>
                    Abaixo estão listados os alunos que se declaram egressos do IF Sudeste MG - Campus Juiz de Fora
                </p>
                <div className='table-overflow-container'>
                    <SortableTable data={graduates} keyFn={keyFn} config={config} />
                </div>
            </main>
        </div>
    );
}

export default GraduatesPage;