import { useState } from 'react'
import './App.css'
import { Paper, ThemeProvider, Typography, createTheme } from '@mui/material';
import { ptBR } from '@mui/x-data-grid';

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
      <Paper>
        <Typography variant="h2">Colé meu bom.</Typography>
      </Paper>
    </ThemeProvider>
  )
}

export default App
