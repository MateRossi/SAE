import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="Header">
            <div className="DarkHeader">
                <ul>
                    <Link to="/" style={{ color: '#f9f9f9', textDecoration: 'none'}}><li>ENTRAR</li></Link>
                    <Link to="register" style={{ color: '#f9f9f9', textDecoration: 'none'}}><li>SOLICITAR CADASTRO</li></Link>
                </ul>
            </div>
            <div className='HeaderTitle'>
                <h1>Sistema de Acompanhamento de Egressos</h1>
                <h2>If Sudeste MG - Campus Juiz de Fora</h2>
            </div>
        </header>
    )
}

export default Header;