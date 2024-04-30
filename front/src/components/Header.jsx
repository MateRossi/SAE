import './Header.css';

function Header() {
    return (
        <header className="Header">
            <div className="DarkHeader">
                <ul>
                    <li>ENTRAR</li>
                    <li>CADASTRO</li>
                    <li>ADMIN</li>
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