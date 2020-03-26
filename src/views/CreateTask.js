import React, { useState } from 'react';
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
      url:
        'https://8080-bef24188-530f-4579-84d5-61f22d7b9334.ws-eu01.gitpod.io/ping',
      headers: [],
      body: {},
    },
  },
  payload: {},
};

const CreateTask = () => {
  const [{ data }, { send }] = usePost('/api/v1/cron/');
  const [config, setConfig] = useState(defaultConfig);
  const history = useHistory();

  const handleSubmit = (evt, values) => {
    console.log(values);
    return send(config);
  };

  const handleCancel = evt => {
    history.push('/');
  };

  // TODO: show some form of confirmation message before redirecting
  if (data) {
    return <Redirect to="/" />;
  }

  return (
    <AppLayout>
      <CreateTaskUI
        title="Create new task:"
        value={config}
        errors={[]}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </AppLayout>
  );
};

export default React.memo(CreateTask);
