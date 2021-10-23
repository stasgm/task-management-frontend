import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';

import App from './App';

import theme from './styles/theme';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <App />
      </Container>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
