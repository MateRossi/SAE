import { Link } from 'react-router-dom';

function RegisterSuccess() {
    return (
        <div className="Content">
            <div className="successMsg">
            Cadastro solicitado com sucesso! Aguarde um confirmação em seu email!
            <Link to={"/auth"}>Voltar</Link>
            </div>
        </div>
    )
}

export default RegisterSuccess;