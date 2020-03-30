import PropTypes from 'prop-types';

export const logShape = PropTypes.shape({
  createdAt: PropTypes.instanceOf(Date).isRequired,
  groupName: PropTypes.string.isRequired,
  taskName: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  cursor: PropTypes.number.isRequired,
});

export const makeLog = log => {
  return {
    createdAt: new Date(log.created_at),
    groupName: log.group_name,
    taskName: log.task_name,
    message: log.message,
    cursor: log.cursor,
    type: log.type,
  };
};
