import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AppLayout from '../layouts/AppLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorsList from '../components/ErrorsList';
import TasksListTable from '../components/TasksListTable';
import RoutedFab from '../components/RoutedFab';
import { useTasksList } from '../state/use-tasks-list';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const TasksList = () => {
  const classes = useStyles();
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

      <RoutedFab to="/tasks/new" color="primary" className={classes.fab}>
        <AddIcon />
      </RoutedFab>
    </AppLayout>
  );
};

export default React.memo(TasksList);
