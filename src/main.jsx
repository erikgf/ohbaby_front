import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { ConfirmContextProvider } from './context/ConfirmContext';
import { ConfirmDialog } from './components';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store.js';

const theme = createTheme({
  palette: {
      primary : {
        main: "#080e58",
        light: "#141d84",
      },
      secondary: {
        main: "#fe141d",
        contrastText: 'white'
      }
    },
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store = { store }>
        <BrowserRouter>
          <SnackbarProvider>
            <ConfirmContextProvider>
              <ThemeProvider theme={theme}>
                <App />
                <ConfirmDialog/>
              </ThemeProvider>
            </ConfirmContextProvider>
          </SnackbarProvider>
        </BrowserRouter>
      </Provider>
  </React.StrictMode>,
)
