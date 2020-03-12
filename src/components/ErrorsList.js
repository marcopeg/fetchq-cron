import React from 'react';
import ErrorsListItem from './ErrorsListItem';

const ErrorsList = ({ errors }) => (
  <ul>
    {errors.map((error, idx) => (
      <ErrorsListItem key={idx} error={error} />
    ))}
  </ul>
);

export default ErrorsList;
