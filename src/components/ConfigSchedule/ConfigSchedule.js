import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formWrapper: {
    marginBottom: theme.spacing(1),
  },
}));

const ConfigSchedule = ({ value, onChange }) => {
  const classes = useStyles();
  const onChangeProp = prop => evt =>
    onChange(evt, { ...value, [prop]: evt.target.value });

  return (
    <div className={classes.formWrapper}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <Select value={value.method} onChange={onChangeProp('method')}>
              <MenuItem value={'delay'}>DELAY</MenuItem>
              <MenuItem value={'cron'}>CRON</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={10}>
          <FormControl fullWidth>
            <TextField
              placeholder={value.method === 'delay' ? '2 days' : '* * * * *'}
              value={value.value}
              onChange={onChangeProp('value')}
            />
          </FormControl>
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
  onChange: PropTypes.func.isRequired,
};

export default ConfigSchedule;
