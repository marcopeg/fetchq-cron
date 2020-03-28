import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import AppLayout from '../layouts/AppLayout';
import { useGet } from '../state/use-get';
import { usePost } from '../state/use-post';
import LoadingSpinner from '../components/LoadingSpinner';
import TaskDetailsForm from '../components/forms/TaskDetailsForm';
import ErrorsDialog from '../components/dialogs/ErrorsDialog';

const EditTask = ({ match }) => {
  const { groupName, taskName } = match.params;
  const endpoint = `/api/v1/cron/${groupName}/${taskName}`;
  const backUrl = `/task/${groupName}/${taskName}`;
  const [{ data, errors: loadingErrors }] = useGet(endpoint);
  const [{ data: editData, errors: editErrors }, { send }] = usePost(
    '/api/v1/cron/',
  );
  const [config, setConfig] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (data) {
      setConfig(data.task.payload);
    }
  }, [data, setConfig]);

  const handleSubmit = (evt, values) => send(values);
  const handleCancel = evt => history.push(backUrl);

  const getBody = () => {
    // TODO: show some form of confirmation message before redirecting
    if (editData) {
      return <Redirect to={backUrl} />;
    }

    if (loadingErrors) {
      return (
        <>
          <Typography>Failed to load the task</Typography>
          <ErrorsDialog
            title="Could not load the task:"
            errors={loadingErrors}
          />
        </>
      );
    }

    if (!config) {
      return <LoadingSpinner />;
    }

    return (
      <>
        <TaskDetailsForm
          edit
          value={config}
          errors={[]}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
        <ErrorsDialog title="This task was not saved:" errors={editErrors} />
      </>
    );
  };

  return (
    <AppLayout
      titleProps={{
        title: 'Edit task:',
        backTo: backUrl,
      }}
      children={getBody()}
    />
  );
};

export default EditTask;
