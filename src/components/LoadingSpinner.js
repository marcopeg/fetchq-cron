import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const LoadingSpinner = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <CircularProgress />
    </div>
  );
};

export default LoadingSpinner;
