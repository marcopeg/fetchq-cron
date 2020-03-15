import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import ConfigHttpHeaders from '../ConfigHttpHeaders';
import JsonEditor from '../JsonEditor';

const useStyles = makeStyles(theme => ({
  formSection: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  formControl: {
    minWidth: '100%',
  },
}));

const ConfigRestRequest = ({ value, onChange }) => {
  const classes = useStyles();

  const onChangeMethod = evt =>
    onChange({ ...value, method: evt.target.value });

  const onChangeUrl = evt => onChange({ ...value, endpoint: evt.target.value });

  const onChangeHeaders = (evt, headers) => {
    onChange({ ...value, headers });
  };

  const onChangeBody = (evt, body) => {
    onChange({ ...value, body });
  };

  return (
    <div>
      <Paper variant="outlined" className={classes.formSection}>
        <Typography gutterBottom variant="button">
          Endpoint:
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <FormControl className={classes.formControl}>
              <Select value={value.method} onChange={onChangeMethod}>
                <MenuItem value={'GET'}>GET</MenuItem>
                <MenuItem value={'POST'}>POST</MenuItem>
                <MenuItem value={'PUT'}>PUT</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={10}>
            <FormControl className={classes.formControl}>
              <TextField
                placeholder="https://"
                value={value.url}
                onChange={onChangeUrl}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      <ConfigHttpHeaders value={value.headers} onChange={onChangeHeaders} />
      <Paper variant="outlined" className={classes.formSection}>
        <Typography gutterBottom variant="button">
          Body:
        </Typography>
        <JsonEditor value={value.body} onChange={onChangeBody} />
      </Paper>
    </div>
  );
};

ConfigRestRequest.propTypes = {
  value: PropTypes.shape({
    method: PropTypes.oneOf(['GET', 'POST', 'PUT', 'DELETE']).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ConfigRestRequest;
