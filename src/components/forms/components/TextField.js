import React from 'react';
import MuiTextField from '@material-ui/core/TextField';

const TextField = props => (
  <MuiTextField
    variant="outlined"
    InputLabelProps={{
      shrink: true,
    }}
    {...props}
  />
);

export default TextField;
