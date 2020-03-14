import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  formSection: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  formControl: {
    minWidth: '100%',
  },
}));

const ConfigHttpHeaders = ({ headers, onChange }) => {
  const classes = useStyles();

  const onChangeItem = (prop, targetItem) => event => {
    const updatedHeaders = headers.map(item => {
      if (item === targetItem) {
        return {
          ...item,
          [prop]: event.target.value,
        };
      }
      return item;
    });
    onChange(updatedHeaders);
  };

  const onCreateItem = prop => event => {
    onChange([
      ...headers,
      {
        key: '',
        value: '',
        [prop]: event.target.value,
      },
    ]);
  };

  return (
    <Paper variant="outlined" className={classes.formSection}>
      <Typography gutterBottom variant="button">
        Headers:
      </Typography>
      {headers.map((item, idx) => (
        <Grid key={idx} container spacing={2}>
          <Grid item xs={4}>
            <TextField
              placeholder="header"
              value={item.key}
              onChange={onChangeItem('key', item)}
              className={classes.formControl}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              placeholder="value"
              value={item.value}
              onChange={onChangeItem('value', item)}
              className={classes.formControl}
            />
          </Grid>
        </Grid>
      ))}
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            placeholder="header"
            value={''}
            onChange={onCreateItem('key')}
            className={classes.formControl}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            placeholder="value"
            value={''}
            onChange={onCreateItem('value')}
            className={classes.formControl}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

ConfigHttpHeaders.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ConfigHttpHeaders;
