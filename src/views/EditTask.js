import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useGet } from '../state/use-get';
import { usePost } from '../state/use-post';
import ConfigTask from '../components/ConfigTask';

const EditTask = ({ match }) => {
  const { groupName, taskName } = match.params;
  const endpoint = `/api/v1/cron/${groupName}/${taskName}`;
  const [{ isLoading, data, errors }] = useGet(endpoint);
  const [{ data: editData }, { send }] = usePost('/api/v1/cron/');
  const [config, setConfig] = useState(null);

  useEffect(() => {
    if (data) {
      setConfig({
        ...data.task.payload,
        action: {
          ...data.task.payload.action,
          request: {
            ...data.task.payload.action.request,
            headers: Object.keys(data.task.payload.action.request.headers).map(
              key => ({
                key,
                value: data.task.payload.action.request.headers[key],
              }),
            ),
          },
        },
      });
    }
  }, [data, setConfig]);

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
  if (editData) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit">Save</Button>
      {config ? (
        <ConfigTask
          value={config}
          onChange={(evt, value) => setConfig(value)}
        />
      ) : (
        'loading'
      )}
    </form>
  );
};

export default EditTask;
