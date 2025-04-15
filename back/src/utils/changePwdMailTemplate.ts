const changePwdEmailHtml = (password: string, name: string, loginLink: string) => {
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
    </style>
</head>

<body>
    <div class="container">
        <h1>Olá, ${name}!</h1>
        <h4>Ao esquecer sua senha antiga, uma nova foi gerada automaticamente. <br />
        <p class="graduate-message">${password}</p>
        <p>Acesse o link abaixo e faça o login com suas novas credenciais!</p><br />
        <a href="${loginLink}" target="_blank">Login</a>
        <p>Lembre-se de mudar esta senha depois!</p>
        <p>Este e-mail foi enviado para você por estar cadastrado(a) no SAEG - Sistema de Acompanhamento de Egressos do IF Sudeste MG Campus Juiz de Fora.</p>
        <div class="footer">
            <p>© 2024 Sistema de Egressos. Todos os direitos reservados.</p>
        </div>
    </div>
</body>

</html>    
    `
}

export default changePwdEmailHtml;