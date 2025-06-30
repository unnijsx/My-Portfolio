import Home from './Home';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#333333', // Set #333333 as the primary color
      },
      secondary: {
        main: '#6F32BF', // Optional: customize secondary color
      },
    },
  });
  return (
    <>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
