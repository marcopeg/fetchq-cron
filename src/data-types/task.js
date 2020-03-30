import PropTypes from 'prop-types';

export const taskShape = PropTypes.shape({
  subject: PropTypes.string.isRequired,
  description: PropTypes.string,
  groupName: PropTypes.string.isRequired,
  taskName: PropTypes.string.isRequired,
  iterations: PropTypes.number.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  nextIteration: PropTypes.instanceOf(Date).isRequired,
  lastIteration: PropTypes.instanceOf(Date),
  payload: PropTypes.object,
});

export const makeTask = task => ({
  subject: task.subject,
  description: task.payload.description,
  groupName: task.payload.group_name,
  taskName: task.payload.task_name,
  iterations: task.iterations,
  createdAt: new Date(task.created_at),
  nextIteration: new Date(task.next_iteration),
  lastIteration: task.last_iteration ? new Date(task.last_iteration) : null,
  payload: task.payload,
});
