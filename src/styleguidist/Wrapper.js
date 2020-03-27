import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import RsgWrapper from 'react-styleguidist/lib/client/rsg-components/Wrapper/Wrapper';
import { MemoryRouter as Router } from 'react-router-dom';

const theme = createMuiTheme();

const Wrapper = ({ children, ...rest }) => (
  <RsgWrapper {...rest}>
    <Router>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Router>
  </RsgWrapper>
);

export default Wrapper;
