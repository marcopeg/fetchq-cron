import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import { useAuth } from '../state/use-auth';

const useStyles = makeStyles(theme => ({
  link: {
    color: '#fff',
  },
}));

const SecretAlert = () => {
  const classes = useStyles();
  const { isSecured } = useAuth();
  const [isVisible, setIsVisible] = useState(!isSecured);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsVisible(false);
  };

  return (
    <Snackbar
      open={isVisible}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <Alert
        elevation={6}
        variant="filled"
        severity="warning"
        action={
          <>
            <Button color="inherit" size="small" onClick={handleClose}>
              <CloseIcon />
            </Button>
          </>
        }
      >
        <Link to="/docs/secure-instance" className={classes.link}>
          Please consider securing your instance!
        </Link>
      </Alert>
    </Snackbar>
  );
};

export default SecretAlert;
