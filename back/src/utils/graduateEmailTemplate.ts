const createGraduateEmailHtml = (message: string, senderEmail: string, senderName: string, senderCourse: string) => {
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
        <h1>Nova Mensagem!</h1>
        <h4>Você recebeu uma mensagem de um colega de turma ou curso. <br />
        Verifique abaixo!</h4>
        <p>${senderName}, que formou-se no curso de ${senderCourse} diz:</p>
        <p class="graduate-message">${message}</p>
        <p>Para responder a esta mensagem, envie um e-mail para o remetente através do endereço ${senderEmail}.</p>
        <p>Se não deseja receber estes e-mails e de outros alunos que também se formaram no mesmo curso que você. Acesse o link abaixo e desmarque a opção de receber emails.</p>
        <a target="_blank" href="#">Não quero receber e-mails de outros egressos!</a>
        <p>Este e-mail foi enviado para você por estar cadastrado(a) no SAEG - Sistema de Acompanhamento de Egressos do IF Sudeste MG Campus Juiz de Fora.</p>
        <div class="footer">
            <p>© 2024 Sistema de Egressos. Todos os direitos reservados.</p>
        </div>
    </div>
</body>

</html>    
    `
}

export default createGraduateEmailHtml;