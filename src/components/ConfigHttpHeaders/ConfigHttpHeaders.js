import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconAdd from '@material-ui/icons/Add';
import IconRemove from '@material-ui/icons/RemoveCircleOutlineOutlined';

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

  const onRemoveItem = targetItem => () => {
    const updatedHeaders = headers.filter(item => item !== targetItem);
    onChange(updatedHeaders);
  };

  const onAddItem = () => {
    onChange([
      ...headers,
      {
        key: '',
        value: '',
      },
    ]);
  };

  return (
    <Paper variant="outlined" className={classes.formSection}>
      <Grid container spacing={2}>
        <Grid item xs={11}>
          <Typography gutterBottom variant="button">
            Headers:
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            aria-label="Create new header"
            color="primary"
            onClick={onAddItem}
          >
            <IconAdd />
          </IconButton>
        </Grid>
      </Grid>
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
          <Grid item xs={7}>
            <TextField
              placeholder="value"
              value={item.value}
              onChange={onChangeItem('value', item)}
              className={classes.formControl}
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton
              aria-label="Create new header"
              onClick={onRemoveItem(item)}
            >
              <IconRemove />
            </IconButton>
          </Grid>
        </Grid>
      ))}
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
