import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import TaskDetailsForm from '../components/forms/TaskDetailsForm';
import ErrorsDialog from '../components/dialogs/ErrorsDialog';
import { usePost } from '../state/use-post';

const defaultConfig = {
  group_name: 'foo',
  task_name: 'a001',
  schedule: {
    method: 'delay',
    value: '1s',
  },
  action: {
    method: 'webhook',
    request: {
      type: 'rest',
      method: 'GET',
      url: 'https://fetchq-cron.herokuapp.com/ping',
      headers: [],
      body: {},
    },
  },
  payload: {},
};

const CreateTask = () => {
  const [{ data, errors }, { send }] = usePost('/api/v1/cron?mode=insert');
  const history = useHistory();

  const handleSubmit = (evt, values) => send(values);
  const handleCancel = evt => history.push('/');

  // TODO: show some form of confirmation message before redirecting
  if (data) {
    return <Redirect to="/" />;
  }

  return (
    <AppLayout titleProps={{ title: 'Create new task:', backTo: '/' }}>
      <TaskDetailsForm
        value={defaultConfig}
        errors={[]}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
      <ErrorsDialog title="This task was not created:" errors={errors} />
    </AppLayout>
  );
};

export default React.memo(CreateTask);
