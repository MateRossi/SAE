import { Link } from "react-router-dom";

export default function AdminMenu() {
    return (
        <aside className="menuContainer">
            <header className="menuHeader">
                <h2>SAEG</h2>
            </header>
            <nav className="menuOptions">
                <Link to={'/admin'}>Egressos Cadastrados</Link>
                <Link to={'courses'}>Cursos</Link>
                <Link to={'modalities'}>Modalidades</Link>
                <Link to={'profile'}>Perfil</Link>
            </nav>
        </aside>
    );
}