import { useGet } from './use-get';
import { makeTask } from '../data-types/task';

export const useTasksList = () => {
  const [{ isLoading, data, errors }] = useGet('/api/v1/cron/');
  const tasks = data ? data.tasks.map(makeTask) : [];

  return {
    isLoading,
    errors,
    tasks,
  };
};
