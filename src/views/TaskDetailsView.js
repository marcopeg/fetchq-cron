import React from 'react';
// import { deepInfo } from '@marcopeg/deeplog';
import Typography from '@material-ui/core/Typography';
import AppLayout from '../layouts/AppLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorsDialog from '../components/dialogs/ErrorsDialog';
import TaskDetails from '../components/views/TaskDetails';
import RoutedButton from '../components/RoutedButton';
import LogsList from '../components/LogsList';
import { useTaskDetails } from '../state/use-task-details';
import { useLogs } from '../state/use-logs';

const TaskDetailsView = ({ match }) => {
  const { groupName, taskName } = match.params;
  const { task, errors } = useTaskDetails(groupName, taskName);
  const { logs, fetchNextPage, fetchNewItems } = useLogs({
    groupName,
    taskName,
    poll: 5000,
  });

  const getBody = () => {
    if (errors) {
      return (
        <>
          <Typography>Failed to load the task</Typography>
          <ErrorsDialog title="Could not load the task:" errors={errors} />
        </>
      );
    }

    if (!task) {
      return <LoadingSpinner />;
    }

    const { groupName, taskName } = task;
    return (
      <>
        <TaskDetails task={task} />
        <LogsList
          logs={logs}
          onLoadMore={fetchNextPage}
          onLoadNew={fetchNewItems}
        />
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
