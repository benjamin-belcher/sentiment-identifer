import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import {ThemeProvider, createTheme} from '@mui/material';

// This theme doesnt work for some reason
const theme = createTheme({
    typography: {
      fontFamily: ['"Gilroy-Regular"', 'sans-serif'].join(',')
     },
     palette:{
       primary: {
        main: '#056D78',
        light:"#3BB7C2"
      },
      secondary: {
        main: '#2F4051',
      },
      info: {
        main:'#FF73B8',
        dark:'#E30072',
      }
     }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <HashRouter>
      <App />
    </HashRouter>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
