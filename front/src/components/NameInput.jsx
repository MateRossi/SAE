import { useState, useEffect, useRef } from "react";
import { Grid, TextField, Box } from "@mui/material";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

export default function NameInput() {

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    const userRef = useRef();

    useEffect(() => {
        const result = USER_REGEX.test(user);

        //para teste apenas - REMOVER.
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    return (
        <Grid item xs={12} sm={6}>
            <TextField
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
                    mt: 0.2,
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
        </Grid>
    )
}