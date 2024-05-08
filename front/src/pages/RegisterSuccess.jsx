import { Link } from 'react-router-dom';

function RegisterSuccess() {
    return (
        <div className="CenterContent">
            <div className="successMsg">
            Cadastro solicitado com sucesso! Aguarde uma confirmação em seu email!
            <Link to={"/"}>Voltar</Link>
            </div>
        </div>
    )
}

export default RegisterSuccess;