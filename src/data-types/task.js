import PropTypes from 'prop-types';

export const taskShape = PropTypes.shape({
  subject: PropTypes.string.isRequired,
  groupName: PropTypes.string.isRequired,
  taskName: PropTypes.string.isRequired,
  iterations: PropTypes.number.isRequired,
  nextIteration: PropTypes.instanceOf(Date).isRequired,
  lastIteration: PropTypes.instanceOf(Date).isRequired,
});

export const makeTask = task => ({
  subject: task.subject,
  groupName: task.payload.group_name,
  taskName: task.payload.task_name,
  iterations: task.iterations,
  nextIteration: new Date(task.next_iteration),
  lastIteration: new Date(task.last_iteration),
  payload: task.payload,
});
