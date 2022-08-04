// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components';
import theme from 'themes/default.theme';
import GlobalStyles from 'themes/global.style';
import AuthProvider from 'context/AuthProvider';
import AppRoutes from './router';
import { BrowserRouter } from 'react-router-dom';

const App = () => (
    <ThemeProvider theme={theme}>
    <React.Fragment>
      <GlobalStyles />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </React.Fragment>
  </ThemeProvider>
    
  );

export default App;
