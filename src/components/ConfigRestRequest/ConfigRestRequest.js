import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '../forms/components/TextField';
import Select from '../forms/components/Select';

import ConfigHttpHeaders from '../ConfigHttpHeaders';
import JsonEditor from '../JsonEditor';

const useStyles = makeStyles(theme => ({
  formWrapper: {
    marginBottom: theme.spacing(1),
  },
  formSection: {
    marginBottom: theme.spacing(3),
  },
  formControl: {
    minWidth: '100%',
  },
  title: {
    marginBottom: theme.spacing(1),
  },
}));

const ConfigRestRequest = ({ value, errors, onChange }) => {
  const classes = useStyles();

  const onChangeMethod = evt =>
    onChange(evt, { ...value, method: evt.target.value });

  const onChangeUrl = evt => onChange(evt, { ...value, url: evt.target.value });

  const onChangeHeaders = (evt, headers) => {
    console.log('***', headers);
    onChange(evt, { ...value, headers });
  };

  const onChangeBody = (evt, body) => {
    onChange(evt, { ...value, body });
  };

  // Error helpers
  const hasError = field => errors.some(err => err.field === field);
  const getErrorMessage = field =>
    errors
      .filter(err => err.field === field)
      .map(err => err.message)
      .shift();

  return (
    <div className={classes.formWrapper}>
      <div className={classes.formSection}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Select
              required
              fullWidth
              value={value.method}
              onChange={onChangeMethod}
              label="method:"
              error={hasError('method')}
              helperText={getErrorMessage('method')}
              options={[
                { value: 'GET' },
                { value: 'POST' },
                { value: 'PUT' },
                { value: 'DELETE' },
              ]}
            >
              <MenuItem value={'GET'}>GET</MenuItem>
              <MenuItem value={'POST'}>POST</MenuItem>
              <MenuItem value={'PUT'}>PUT</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={10}>
            <TextField
              required
              fullWidth
              label="url:"
              placeholder="https://"
              value={value.url}
              error={hasError('url')}
              helperText={getErrorMessage('url')}
              onChange={onChangeUrl}
            />
          </Grid>
        </Grid>
      </div>
      <div className={classes.formSection}>
        <ConfigHttpHeaders value={value.headers} onChange={onChangeHeaders} />
      </div>
      <div className={classes.formSection}>
        <Typography gutterBottom variant="body2">
          Body:
        </Typography>
        <JsonEditor
          value={value.body}
          onChange={onChangeBody}
          error={hasError('body')}
          helperText={getErrorMessage('body')}
        />
      </div>
    </div>
  );
};

ConfigRestRequest.propTypes = {
  value: PropTypes.shape({
    method: PropTypes.oneOf(['GET', 'POST', 'PUT', 'DELETE']).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    }),
  ),
  onChange: PropTypes.func.isRequired,
};

ConfigRestRequest.defaultProps = {
  errors: [],
};

export default ConfigRestRequest;
