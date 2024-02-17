import { useState } from 'react'
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ptBR } from '@mui/x-data-grid';
import SignIn from './pages/SignInPage';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import Layout from './pages/Layout';

const defaultTheme = createTheme(
  {
    palette: {
      primary: {
        main: '#003200',
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

  //usar route com routes dentro faz com que o mais acima seja um layout base para os elemento embaixo.
  
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<SignIn />} />
            <Route path='/home' element={<MainPage />} />
            <Route path='profile' element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
