import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiFormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  formControl: {
    marginBottom: theme.spacing(2),
  },
}));

const FormControl = props => {
  const classes = useStyles();
  return <MuiFormControl className={classes.formControl} {...props} />;
};

export default FormControl;
