import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppLayout from '../layouts/AppLayout';
import { useGet } from '../state/use-get';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorsDialog from '../components/dialogs/ErrorsDialog';
import TaskDetails from '../components/views/TaskDetails';
import RoutedButton from '../components/RoutedButton';
import { makeTask } from '../data-types/task';

const TaskDetailsView = ({ match }) => {
  const { groupName, taskName } = match.params;
  const endpoint = `/api/v1/cron/${groupName}/${taskName}`;
  const [{ data, errors }] = useGet(endpoint);

  const getBody = () => {
    if (errors) {
      return (
        <>
          <Typography>Failed to load the task</Typography>
          <ErrorsDialog title="Could not load the task:" errors={errors} />
        </>
      );
    }

    if (!data) {
      return <LoadingSpinner />;
    }

    const task = makeTask(data.task);
    const { groupName, taskName } = task;
    return (
      <>
        <TaskDetails task={task} />
        <div style={{ textAlign: 'right' }}>
          <RoutedButton
            to={`/task/${groupName}/${taskName}/edit`}
            variant="contained"
            color="primary"
          >
            Edit
          </RoutedButton>
        </div>
      </>
    );
  };

  return (
    <AppLayout
      titleProps={{
        title: 'Task details:',
        backTo: '/',
      }}
      children={getBody()}
    />
  );
};

export default TaskDetailsView;
