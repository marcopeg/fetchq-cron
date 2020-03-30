import { useGet } from './use-get';
import { makeTask } from '../data-types/task';

export const useTaskDetails = (groupName, taskName, options = {}) => {
  const endpoint = `/api/v1/cron/${groupName}/${taskName}`;
  const [{ data, ...detailsInfo }] = useGet(endpoint, {
    poll: options.pollDetails || 15000,
  });

  return {
    ...detailsInfo,
    data,
    task: data ? makeTask(data.task) : null,
  };
};
