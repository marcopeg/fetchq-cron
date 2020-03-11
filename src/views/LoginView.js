import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { useAuth } from '../state/use-auth';

const useStyles = makeStyles(theme => ({
  fullScreen: {
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(2),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(4),
  },
  errorMsg: {
    marginTop: theme.spacing(1),
  },
}));

const LoginView = () => {
  const classes = useStyles();
  const { login, isLoading, errorMsg } = useAuth();

  const handleSubmit = evt => {
    evt.preventDefault();
    login('console', evt.target.elements.password.value);
  };

  return (
    <Modal open={true}>
      <div className={classes.fullScreen}>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign in to Fetchq CRON
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password to your console"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                {isLoading ? '...' : 'Sign In'}
              </Button>
              {errorMsg ? (
                <Typography
                  variant="body1"
                  color="error"
                  className={classes.errorMsg}
                >
                  {errorMsg}
                </Typography>
              ) : null}
            </form>
          </div>
        </Container>
      </div>
    </Modal>
  );
};

export default LoginView;
