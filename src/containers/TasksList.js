import React from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorsList from '../components/ErrorsList';
import TasksListTable from '../components/TasksListTable';
import { useTasksList } from '../state/use-tasks-list';

const TasksList = () => {
  const { isLoading, errors, tasks } = useTasksList();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (errors) {
    return <ErrorsList errors={errors} />;
  }

  return (
    <div>
      <TasksListTable items={tasks} />
    </div>
  );
};

export default TasksList;
