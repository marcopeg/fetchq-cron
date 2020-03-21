import React from 'react';
import { Link } from 'react-router-dom';
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
      <Link to="/new">Create new task</Link>
    </div>
  );
};

export default React.memo(TasksList);
