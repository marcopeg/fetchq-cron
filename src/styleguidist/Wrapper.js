import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import RsgWrapper from 'react-styleguidist/lib/client/rsg-components/Wrapper/Wrapper';

const theme = createMuiTheme();

const Wrapper = ({ children, ...rest }) => (
  <RsgWrapper {...rest}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </RsgWrapper>
);

export default Wrapper;
