import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { AuthProvider } from './state/use-auth';
import App from './App';

const theme = createMuiTheme();
const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <React.Fragment>
          <CssBaseline />
          <App />
        </React.Fragment>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  rootElement,
);
