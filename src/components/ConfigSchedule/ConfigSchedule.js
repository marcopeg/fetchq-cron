import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '../forms/components/TextField';
import Select from '../forms/components/Select';

const useStyles = makeStyles(theme => ({
  formWrapper: {
    marginBottom: theme.spacing(1),
  },
}));

const ConfigSchedule = ({ value, errors, onChange }) => {
  const classes = useStyles();
  const onChangeProp = prop => evt =>
    onChange(evt, { ...value, [prop]: evt.target.value });

  // Error helpers
  const hasError = field => errors.some(err => err.field === field);
  const getErrorMessage = field =>
    errors
      .filter(err => err.field === field)
      .map(err => err.message)
      .shift();

  return (
    <div className={classes.formWrapper}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Select
            required
            fullWidth
            label="Method"
            value={value.method}
            error={hasError('method')}
            helperText={getErrorMessage('method')}
            onChange={onChangeProp('method')}
            options={[
              { value: 'delay', label: 'DELAY' },
              { value: 'cron', label: 'CRON' },
            ]}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            required
            fullWidth
            label="Value"
            placeholder={value.method === 'delay' ? '2 days' : '* * * * *'}
            value={value.value}
            error={hasError('value')}
            helperText={getErrorMessage('value')}
            onChange={onChangeProp('value')}
          />
        </Grid>
      </Grid>
    </div>
  );
};

ConfigSchedule.propTypes = {
  value: PropTypes.shape({
    method: PropTypes.oneOf(['delay', 'cron']).isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    }),
  ),
  onChange: PropTypes.func.isRequired,
};

ConfigSchedule.defaultProps = {
  errors: [],
};

export default ConfigSchedule;
