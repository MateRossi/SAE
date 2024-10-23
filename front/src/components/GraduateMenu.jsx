import { Link, useNavigate } from 'react-router-dom';
import './menu.css';
import course from '../img/course.svg';
import rating from '../img/rating.svg';
import research from '../img/research.svg';
import profile from '../img/profile.svg';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';

function GraduateMenu() {
    const { auth } = useAuth();
    const logout = useLogout();
    const navigate = useNavigate();

    const signOut = async () => {
        await logout();
        navigate('/auth');
    }

    return <aside className="menuContainer">
        <header className='menuHeader'>
            <h2>SAEG</h2>
        </header>
        <nav className='menuOptions'>
            <Link to={'/graduate'}><img className='menuIcon' src={course} alt="ícone curso" />Meu curso</Link>
            <Link to={'followUp'}><img className='menuIcon' src={research} alt="ícone acompanhamento" />Acompanhamento</Link>
            <Link to={'review'}><img className='menuIcon' src={rating} alt="ícone avaliações" />Avaliações</Link>
            <Link to={'profile'}><img className='menuIcon' src={profile} alt="ícone perfil" />Perfil</Link>
        </nav>
        <div className='logout-container'>
            <h3>Olá, {auth?.name?.split(' ')[0]}</h3>
            <p>({Boolean(auth?.role) && 'Egresso'})</p>
            <span className='logout-link' onClick={signOut}>Sair</span>
        </div>
    </aside>
}

export default GraduateMenu;
