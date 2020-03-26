import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  form: {
    padding: theme.spacing(2),
    backgroundColor: '#eee',
  },
  actions: {},
}));

const Form = ({
  onSubmit,
  onCancel,
  lblSubmit,
  lblCancel,
  isLoading,
  children,
}) => {
  const classes = useStyles();

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(evt); // TODO: add ref to form?
  };

  const handleCancel = evt => {
    evt.preventDefault();
    onCancel(evt); // TODO: add ref to form?
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      {children}
      <div className={classes.actions}>
        <Button type="submit" color="primary" variant="contained">
          {isLoading ? '...' : lblSubmit}
        </Button>
        {onCancel && (
          <Button type="reset" variant="text" onClick={handleCancel}>
            {lblCancel}
          </Button>
        )}
      </div>
    </form>
  );
};

Form.defaultProps = {
  lblSubmit: 'Save',
  lblCancel: 'Cancel',
  isLoading: false,
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  lblSubmit: PropTypes.string,
  lblCancel: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default Form;
