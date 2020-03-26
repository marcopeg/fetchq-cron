import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from './TextField';

const Select = ({ options, ...props }) => (
  <TextField select {...props}>
    {options.map(option => (
      <MenuItem key={option.value} value={option.value}>
        {option.label || option.value}
      </MenuItem>
    ))}
  </TextField>
);

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string,
    }),
  ),
};

export default Select;
