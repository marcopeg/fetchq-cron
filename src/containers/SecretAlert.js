import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import { useAuth } from '../state/use-auth';

const useStyles = makeStyles(theme => ({
  alert: {
    borderRadius: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: theme.spacing(3.5),
    fontSize: theme.typography.fontSize * 0.8,
    '& .MuiAlert-icon': {
      fontSize: theme.typography.fontSize * 1,
      marginRight: theme.spacing(2),
    },
    '& .MuiAlert-action .MuiSvgIcon-root': {
      fontSize: theme.typography.fontSize * 1,
    },
  },
  link: {
    color: theme.palette.common.white,
    textDecoration: 'none',
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

  if (!isVisible) {
    return null;
  }

  return (
    <Alert
      className={classes.alert}
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
        Please consider securing your instance with a password! (click here to
        learn how)
      </Link>
    </Alert>
  );
};

export default SecretAlert;
