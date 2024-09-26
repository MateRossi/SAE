/* eslint-disable react/prop-types */
import './ShowGraduateInfo.css';

export default function ShowGraduateInfo({ userData }) {
    return (
        <>
            <h3>{userData?.name}</h3>
            <div className='user-info-lists-container'>

                <ul className="lista-dados-cadastro">
                    <li>Curso finalizado: {userData?.course || 'Não cadastrado'}</li>
                    <li>Email: {userData?.email}</li>
                    <li>Deseja receber emails comunicativos: {userData?.allowEmails ? 'sim' : 'não'}</li>
                    <li>Telefone/Celular: {userData?.phoneNumber}</li>
                    <li>Possui interesse em contar sua trajetória: {userData?.tellTrajectory ? 'sim' : 'não'}</li>
                </ul>
                <ul className="lista-dados-formacao">
                    <li>Matrícula: {userData?.enrollment}</li>
                    <li>Ano de ingresso: {userData?.entryYear}</li>
                    <li>Ano de formatura: {userData?.graduationYear}</li>
                    <li>Estava trabalhando antes de iniciar seu curso: {userData?.workedBefore ? 'sim' : 'não'}</li>
                    <li>Nível de escolaridade atual: {userData?.degreeLevel}</li>
                    <li>Comentários: {userData?.commentary}</li>
                </ul>
            </div>
        </>
    )
}