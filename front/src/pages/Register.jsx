import { useRef, useState, useEffect } from 'react';
import { InfoOutlined, HighlightOff, CheckCircleOutline } from '@mui/icons-material';
import { Alert, Box, Container, Paper, TextField, Tooltip, Typography } from '@mui/material';
import { Input } from '@mui/base';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

//senha deve conter letras e números, com pelo menos 8 caracteres.
const PWD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,24}$/;

export default function Register() {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setmatchPwd] = useState(false);
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])


    useEffect(() => {
        const result = USER_REGEX.test(user);

        //para teste apenas - REMOVER.
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);

        //para teste apenas - REMOVER.        
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    return (
        <Container component="section" sx={{
            marginTop: 7,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 1,
            maxWidth: 500,
            minWidth: 200,
            mx: 'auto'
        }}>
            {errMsg && (
                <Alert severity='error' ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>
                    {errMsg}
                </Alert>
            )}
            <Typography variant='h4' component='h1'>Solicitar Cadastro</Typography>
            <Box component='form' sx={{ mt: 1, display: 'flex', flexDirection: 'column' }} >
                <TextField
                    margin='normal'
                    error={Boolean(!validName && user)}
                    type='text'
                    label='Nome Completo'
                    id='username'
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? 'false' : 'true'}
                    aria-describedby='uidnote'
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                {userFocus && user && !validName && (
                    <Box sx={{
                        bgcolor: 'black',
                        color: 'white',
                        p: 1,
                        fontSize: '0.75rem',
                        borderRadius: 2,
                        marginBottom: 1
                    }}>
                        De 4 a 24 caracteres. <br />
                        Deve começar com uma letra. <br />
                        Letras, números, sublinhados e ífens são permitidos.
                    </Box>
                )}
                <TextField
                    margin='normal'
                    error={Boolean(!validPwd && pwd)}
                    type='password'
                    label='Senha'
                    id='password'
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? 'false' : 'true'}
                    aria-describedby='pwdnote'
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                {pwdFocus && !validPwd && (
                    <Box sx={{
                        bgcolor: 'black',
                        color: 'white',
                        display: 'inline-block',
                        p: 1,
                        fontSize: '0.75rem',
                        borderRadius: 2,
                        marginBottom: 1,
                    }}>
                        Deve conter letras e números.  <br />
                        Deve conter pelo menos 8 caracteres.
                    </Box>
                )}
            </Box>
        </Container>
    )
}