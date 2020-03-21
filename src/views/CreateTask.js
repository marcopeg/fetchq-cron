import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ConfigTask from '../components/ConfigTask';
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
  const [{ data, errors }, { send }] = usePost('/api/v1/cron/');
  const [config, setConfig] = useState(defaultConfig);

  const handleSubmit = evt => {
    evt.preventDefault();

    // TODO: figure out a better way to translate headers from array to object
    send({
      ...config,
      action: {
        ...config.action,
        request: {
          ...config.action.request,
          headers: config.action.request.headers.reduce(
            (acc, curr) => ({ ...acc, [curr.key]: curr.value }),
            {},
          ),
        },
      },
    });
  };

  // TODO: show some form of confirmation message before redirecting
  if (data) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit">Create</Button>
      <ConfigTask value={config} onChange={(evt, value) => setConfig(value)} />
    </form>
  );
};

export default React.memo(CreateTask);
