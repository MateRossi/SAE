import { Link } from 'react-router-dom';
import './menu.css';
import academic from '../img/academic.svg';
import classroom from '../img/classroom.svg';
import course from '../img/course.svg';
import rating from '../img/rating.svg';
import research from '../img/research.svg';
import work from '../img/work.svg';
import profile from '../img/profile.svg';

function GraduateMenu() {
    return <aside className="menuContainer">
        <header className='menuHeader'>
            <h2>SEAG</h2>
        </header>
        <nav className='menuOptions'>
            <Link to={'/graduate'}><img className='menuIcon' src={course} alt="ícone curso" />Meu curso</Link>
            <Link to={'academicHistory'}><img className='menuIcon' src={academic} alt="ícone histórico acadêmico" />Histórico acadêmico</Link>
            <Link to={'professionalHistory'}><img className='menuIcon' src={work} alt="ícone histórico profissional" />Histórico profissional</Link>
            <Link to={'followUp'}><img className='menuIcon' src={research} alt="ícone acompanhamento" />Acompanhamento</Link>
            <Link to={'review'}><img className='menuIcon' src={rating} alt="ícone avaliações" />Avaliações</Link>
            <Link to={'class'}><img className='menuIcon' src={classroom} alt="ícone turma" />Minha turma</Link>
            <Link to={'profile'}><img className='menuIcon' src={profile} alt="ícone perfil" />Perfil</Link>
        </nav>
    </aside>
}

export default GraduateMenu;
