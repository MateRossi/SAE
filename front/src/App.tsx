import { useState } from 'react'
import './App.css'
import { Paper, ThemeProvider, Typography, createTheme } from '@mui/material';
import { ptBR } from '@mui/x-data-grid';
import SignIn from './pages/SignInPage';

const defaultTheme = createTheme(
  {
    palette: {
      primary: {
        main: '#000000',
      },
      secondary: {
        main: '#434343',
      },
    }
  },
  ptBR
);

function App() {
  const [theme] = useState(defaultTheme);

  return (
    <ThemeProvider theme={theme}>
      <SignIn />
    </ThemeProvider>
  )
}

export default App
