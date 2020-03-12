import React from 'react';
import Typography from '@material-ui/core/Typography';

const ErrorsListItem = ({ error }) => (
  <li>
    <Typography variant="body1" color="error">
      {error.message}
    </Typography>
  </li>
);

export default ErrorsListItem;
