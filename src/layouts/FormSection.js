import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  floatingEl: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
}));

const FormSection = ({ title, floatingEl, children, ...props }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.wrapper} elevation={1} {...props}>
      {title && (
        <Typography variant="button" component="h3" className={classes.title}>
          {title}
        </Typography>
      )}
      {floatingEl && <div className={classes.floatingEl}>{floatingEl}</div>}
      {children}
    </Paper>
  );
};

FormSection.propTypes = {
  title: PropTypes.string,
};

export default FormSection;
