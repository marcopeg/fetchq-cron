import PropTypes from 'prop-types';

const TASK_LOCK_TIME = 1000 * 60 * 5;

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

export const makeTask = task => {
  // console.log(JSON.stringify(task));
  // console.log(task);

  const createdAt = new Date(task.created_at);
  const nextIteration = new Date(task.next_iteration);

  const now = new Date();
  const isRunning = task.status === 2 && nextIteration > now;
  const isOrphan = task.status === 2 && nextIteration <= now;
  const isKilled = task.status === -1;
  const isCompleted = task.status === 3;
  const isPlanned = !isRunning && !isOrphan && !isKilled && !isCompleted;

  // TODO: default lock time is 5m, we can receive this as setting
  const startedAt =
    isRunning || isOrphan
      ? new Date(nextIteration.getTime() - TASK_LOCK_TIME)
      : null;

  return {
    subject: task.subject,
    description: task.payload.description,
    groupName: task.payload.group_name,
    taskName: task.payload.task_name,
    iterations: task.iterations,
    createdAt,
    isPlanned,
    isRunning,
    isOrphan,
    isKilled,
    isCompleted,
    startedAt,
    nextIteration,
    lastIteration: task.last_iteration ? new Date(task.last_iteration) : null,
    payload: task.payload,
  };
};
