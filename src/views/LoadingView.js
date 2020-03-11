import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(2),
  },
}));

const LoadingView = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Typography>Loading...</Typography>
    </Container>
  );
};

export default LoadingView;
