import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import headersUtils from 'http-headers-validation';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import IconAdd from '@material-ui/icons/Add';
import IconRemove from '@material-ui/icons/RemoveCircleOutlineOutlined';

const useStyles = makeStyles(theme => ({
  btnAdd: {
    marginTop: 0 - theme.spacing(1.5),
  },
  table: {
    marginTop: 0 - theme.spacing(3),
  },
}));

const ConfigHttpHeaders = ({ value, onChange }) => {
  const classes = useStyles();
  const [localValue, setLocalValue] = useState(value);
  const [invalidItems, setInvalidItems] = useState([]);

  // Keep local value updated from external props
  useEffect(() => {
    setLocalValue(value);
  }, [value, setLocalValue]);

  // Apply validation to the headers
  useEffect(() => {
    const invalidItems = Object.keys(localValue).filter(
      key => !headersUtils.validateHeader(String(key), String(localValue[key])),
    );

    setInvalidItems(invalidItems);

    if (
      invalidItems.length === 0 &&
      JSON.stringify(value) !== JSON.stringify(localValue)
    ) {
      onChange(null, localValue);
    }
  }, [value, localValue, onChange]);

  const onChangeItem = (prop, targetItem) => evt => {
    const update = Object.keys(localValue)
      .map(key => {
        if (key !== targetItem.key) {
          return { key, value: localValue[key] };
        }

        if (prop === 'key') {
          return { key: evt.target.value, value: targetItem.value };
        }

        return { key, value: evt.target.value };
      })
      .reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});

    setLocalValue(update);
  };

  const onRemoveItem = targetItem => evt => {
    const update = Object.keys(localValue)
      .filter(key => key !== targetItem.key)
      .map(key => ({ key, value: localValue[key] }))
      .reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});

    // onChange(evt, update);
    setLocalValue(update);
  };

  const onAddItem = evt => {
    setLocalValue({
      ...localValue,
      '': '',
    });
  };

  const listValue = Object.keys(localValue).map(key => ({
    key,
    value: localValue[key],
  }));

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={11}>
          <Typography gutterBottom variant="body2">
            Headers:
          </Typography>
        </Grid>
        {listValue.length > 0 && (
          <Grid item xs={1} style={{ textAlign: 'right' }}>
            <IconButton
              aria-label="Create new header"
              onClick={onAddItem}
              color="primary"
              className={classes.btnAdd}
            >
              <IconAdd />
            </IconButton>
          </Grid>
        )}
      </Grid>
      {listValue.length === 0 && (
        <Typography onClick={onAddItem} variant="body2">
          + Add first header
        </Typography>
      )}
      {listValue.map((item, idx) => (
        <Grid key={idx} container spacing={2} className={classes.table}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              error={invalidItems.includes(item.key)}
              placeholder="header"
              value={item.key}
              onChange={onChangeItem('key', item)}
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              fullWidth
              placeholder="value"
              value={item.value}
              onChange={onChangeItem('value', item)}
            />
          </Grid>
          <Grid item xs={1} style={{ textAlign: 'right' }}>
            <IconButton
              aria-label="Create new header"
              onClick={onRemoveItem(item)}
            >
              <IconRemove />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

ConfigHttpHeaders.propTypes = {
  // value: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     key: PropTypes.string.isRequired,
  //     value: PropTypes.string.isRequired,
  //   }),
  // ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ConfigHttpHeaders;
