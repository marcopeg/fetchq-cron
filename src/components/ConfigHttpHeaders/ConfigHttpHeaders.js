import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import IconAdd from '@material-ui/icons/Add';
import IconRemove from '@material-ui/icons/RemoveCircleOutlineOutlined';

const useStyles = makeStyles(theme => ({
  formSection: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  formSectionEmpty: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
  },
  formControl: {
    minWidth: '100%',
  },
  btnAdd: {
    marginTop: 0 - theme.spacing(1.5),
  },
}));

const ConfigHttpHeaders = ({ value, onChange }) => {
  const classes = useStyles();

  const onChangeItem = (prop, targetItem) => evt => {
    const updatedHeaders = value.map(item => {
      if (item === targetItem) {
        return {
          ...item,
          [prop]: evt.target.value,
        };
      }
      return item;
    });
    onChange(evt, updatedHeaders);
  };

  const onRemoveItem = targetItem => evt => {
    const updatedHeaders = value.filter(item => item !== targetItem);
    onChange(evt, updatedHeaders);
  };

  const onAddItem = evt => {
    onChange(evt, [
      ...value,
      {
        key: '',
        value: '',
      },
    ]);
  };

  return (
    <Paper
      variant="outlined"
      className={
        value.length > 0 ? classes.formSection : classes.formSectionEmpty
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={11}>
          <Typography gutterBottom variant="button">
            Headers:
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            aria-label="Create new header"
            onClick={onAddItem}
            color="primary"
            className={classes.btnAdd}
          >
            <IconAdd />
          </IconButton>
        </Grid>
      </Grid>
      {value.map((item, idx) => (
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
  value: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ConfigHttpHeaders;
