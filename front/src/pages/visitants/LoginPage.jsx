import { useNavigate } from "react-router-dom";
import SystemDescription from "../../components/SystemDescription";

function LoginPage() {
    const navigate = useNavigate();

    const handleGSubmit = (e) => {
        e.preventDefault();
        navigate("/graduate/course");
    }

    return (
        <main className="Content">
            <SystemDescription />
            <form onSubmit={handleGSubmit} className="loginForm">
                <h3>Faça seu login</h3>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                />

                <label htmlFor="password">Senha</label>
                <input
                    id="password"
                    type="password"
                />

                <button type="submit">Entrar</button>
            </form>
        </main>
    )
}

export default LoginPage;