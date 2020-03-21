import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppLayout from '../layouts/AppLayout';
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
  const [{ data }, { send }] = usePost('/api/v1/cron/');
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
    <AppLayout>
      <Typography variant="h4">Create new task:</Typography>
      <form onSubmit={handleSubmit}>
        <ConfigTask
          value={config}
          onChange={(evt, value) => setConfig(value)}
        />
        <Button type="submit" color="primary" variant="contained">
          Save
        </Button>
        <Link to="/">
          <Button>Cancel</Button>
        </Link>
      </form>
    </AppLayout>
  );
};

export default React.memo(CreateTask);
