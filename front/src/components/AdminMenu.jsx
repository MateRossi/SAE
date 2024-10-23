import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';
import { Link, useNavigate } from 'react-router-dom';
import './menu.css';
import course from '../img/course.svg';
import profile from '../img/profile.svg';
import student from '../img/student.svg';
import modalities from '../img/modalities.svg';

export default function AdminMenu() {
    const { auth } = useAuth()
    const logout = useLogout();
    const navigate = useNavigate();

    const signOut = async () => {
        await logout();
        navigate('/');
    }

    return (
        <aside className="menuContainer">
            <header className="menuHeader">
                <h2>SAEG</h2>
            </header>
            <nav className="menuOptions">
                <Link to={'/admin'}><img className='menuIcon' src={student} alt='ícone egresso'/>Egressos Cadastrados</Link>
                <Link to={'courses'}><img className='menuIcon' src={course} alt="ícone curso" />Cursos</Link>
                <Link to={'modalities'}><img className='menuIcon' src={modalities} alt="ícone modalidades" />Modalidades</Link>
                <Link to={'profile'}><img className='menuIcon' src={profile} alt="ícone perfil" />Perfil</Link>
            </nav>
            <div className='logout-container'>
                <h3>Olá, {auth?.name?.split(' ')[0]}</h3>
                <p>({Boolean(auth?.role) && 'Admin'})</p>
                <span className='logout-link' onClick={signOut}>Sair</span>
            </div>
        </aside>
    );
}