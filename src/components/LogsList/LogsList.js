import React from 'react';
import PropTypes from 'prop-types';
import { logShape } from '../../data-types/logs';
import { deepInfo } from '@marcopeg/deeplog';

const LogsList = ({ logs }) => {
  deepInfo(logs);
  return <div>logs</div>;
};

LogsList.propTypes = {
  logs: PropTypes.arrayOf(logShape),
};

export default LogsList;
