import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
  },
  beautifyBtn: {
    position: 'absolute',
    top: theme.spacing(0.5),
    right: 0,
  },
  inputEl: {
    fontFamily: 'monospace',
  },
}));

const JsonEditor = ({
  value,
  onChange,
  label,
  rows,
  maxRows,
  helperText,
  invalidJsonHelperText,
}) => {
  const classes = useStyles();
  const [textValue, setTextValue] = useState('{}');
  const [error, setError] = useState(false);

  // Updates the internal value with the incoming property
  // only if the content is different.
  // It avoids unwanted beautification that screws the cursor.
  useEffect(() => {
    try {
      const v1 = JSON.stringify(JSON.parse(textValue));
      const v2 = JSON.stringify(value);
      if (v1 !== v2) {
        setTextValue(JSON.stringify(value, null, 2));
      }
    } catch (err) {}
  }, [value, textValue, setTextValue]);

  const handleChange = evt => {
    setTextValue(evt.target.value);
    setError(false);
    try {
      onChange(evt, JSON.parse(evt.target.value));
    } catch (err) {
      setError(true);
    }
  };

  const prettifyJson = () =>
    setTextValue(value => JSON.stringify(JSON.parse(value), null, 2));

  return (
    <div className={classes.wrapper}>
      <TextField
        multiline
        fullWidth
        label={label}
        rows={rows}
        rowsMax={maxRows || rows}
        error={error}
        helperText={error ? invalidJsonHelperText : helperText}
        value={textValue}
        onChange={handleChange}
        inputProps={{ className: classes.inputEl }}
      />
      {error ? null : (
        <Typography
          className={classes.beautifyBtn}
          onClick={prettifyJson}
          variant="button"
          color="textSecondary"
        >
          Prettify JSON
        </Typography>
      )}
    </div>
  );
};

JsonEditor.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  helperText: PropTypes.string,
  invalidJsonHelperText: PropTypes.string,
  rows: PropTypes.number,
  maxRows: PropTypes.number,
};

JsonEditor.defaultProps = {
  label: null,
  helperText: null,
  invalidJsonHelperText: 'Invalid JSON',
  rows: 1,
  maxRows: 10,
};

export default JsonEditor;
