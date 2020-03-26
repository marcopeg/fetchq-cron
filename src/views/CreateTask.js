import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import CreateTaskUI from '../components/forms/CreateTaskUI';
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
  const [{ data }, { send }] = usePost('/api/v1/cron/');
  const history = useHistory();

  const handleSubmit = (evt, values) => send(values);
  const handleCancel = evt => history.push('/');

  // TODO: show some form of confirmation message before redirecting
  if (data) {
    return <Redirect to="/" />;
  }

  return (
    <AppLayout>
      <CreateTaskUI
        title="Create new task:"
        value={defaultConfig}
        errors={[]}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </AppLayout>
  );
};

export default React.memo(CreateTask);
