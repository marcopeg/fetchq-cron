import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorsList from '../components/ErrorsList';
import TasksListTable from '../components/TasksListTable';
import { useTasksList } from '../state/use-tasks-list';

const TasksList = () => {
  const { isLoading, errors, tasks } = useTasksList();
  const history = useHistory();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (errors) {
    return <ErrorsList errors={errors} />;
  }

  const handleDiscloseItem = ({ groupName, taskName }) =>
    history.push(`/task/${groupName}/${taskName}/edit`);

  return (
    <AppLayout>
      <TasksListTable items={tasks} onDisclose={handleDiscloseItem} />
      <Link to="/new">Create new task</Link>
    </AppLayout>
  );
};

export default React.memo(TasksList);
