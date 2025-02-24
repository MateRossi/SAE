const updateInfoEmailTemplate = (message: string) => {
    return `
    <!DOCTYPE html>
<html>

<head>
    <style>
        .container {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            background-color: #f9f9f9;
        }

        h1 {
            color: #333;
        }

        p {
            font-size: 16px;
            line-height: 1.5;
            color: #555;
        }

        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #aaa;
        }

        .graduate-message {
            font-style: italic;
            text-align: center;
            border: 1px solid rgba(0, 0, 0, 0.1);
            padding: 20px;
            background-color: rgba(100, 100, 100, 0.1);
        }

        .update-info {
            text-align: center;
            padding: 8px;
            background-color: LawnGreen;
            border-radius: 8px;
            color: #fff;
            text-decoration: none;
            font-size: 18px;
            margin: auto;
        }

        a {
            text-decoration: none;
            color: green;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Atualizar Informações</h1>
        <h4>Você recebeu uma mensagem de um administrador!</h4>
        <p class="graduate-message">${message}</p>
        <p>Para atualizar sua informações, acesse o link abaixo usando seu email e senha.</p>
        <p>Caso seja sua primeira vez entrando no sistema, a senha padrão é igual ao seu e-mail. Recomendamos alterar isso na sessão "Perfil".</p>
        <a target="_blank" class="update-info" href="http://localhost:5173/">Atualizar minhas informações!</a>
        <p>Se não deseja receber estes e-mails, acesse o link abaixo e desmarque a opção de receber emails.</p>
        <a target="_blank" href="http://localhost:5173/profile">Não quero receber e-mails informativos.</a>
        <p>Este e-mail foi enviado para você por estar cadastrado(a) no SAEG - Sistema de Acompanhamento de Egressos do IF Sudeste MG Campus Juiz de Fora.</p>
        <div class="footer">
            <p>© 2024 Sistema de Egressos. Todos os direitos reservados.</p>
        </div>
    </div>
</body>

</html>    
    `
}

export default updateInfoEmailTemplate;