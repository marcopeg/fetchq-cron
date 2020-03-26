import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import headersUtils from 'http-headers-validation';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import IconAdd from '@material-ui/icons/Add';
import IconRemove from '@material-ui/icons/RemoveCircleOutlineOutlined';
import TextField from '../forms/components/TextField';

const useStyles = makeStyles(theme => ({
  btnAdd: {
    marginTop: 0 - theme.spacing(1.5),
  },
  btnAddFirst: {
    marginTop: theme.spacing(1),
    fontSize: '0.8em',
    color: '#888',
    cursor: 'pointer',
  },
  header: {
    marginBottom: 0 - theme.spacing(2.5),
  },
  row: {
    marginBottom: theme.spacing(1),
  },
}));

const ConfigHttpHeaders = ({ value, onChange }) => {
  const classes = useStyles();
  const [localValue, setLocalValue] = useState(value);
  const [invalidItems, setInvalidItems] = useState([]);

  // Keep local value updated from external props:
  useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(localValue)) {
      setLocalValue(value);
    }
  }, [value, setLocalValue]); // eslint-disable-line

  // Apply validation to the headers:
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
  }, [localValue]); // eslint-disable-line

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
      <Grid container spacing={2} className={classes.header}>
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
        <Typography
          onClick={onAddItem}
          variant="body2"
          className={classes.btnAddFirst}
        >
          + add first header
        </Typography>
      )}
      {listValue.map((item, idx) => (
        <Grid key={idx} container spacing={2} className={classes.row}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="header:"
              placeholder="header"
              value={item.key}
              error={invalidItems.includes(item.key)}
              onChange={onChangeItem('key', item)}
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              fullWidth
              label="value:"
              placeholder="value"
              value={item.value}
              error={invalidItems.includes(item.key)}
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
