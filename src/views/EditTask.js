import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import { useGet } from '../state/use-get';
import { usePost } from '../state/use-post';
import LoadingSpinner from '../components/LoadingSpinner';
import CreateTaskUI from '../components/forms/CreateTaskUI';

const EditTask = ({ match }) => {
  const { groupName, taskName } = match.params;
  const endpoint = `/api/v1/cron/${groupName}/${taskName}`;
  const [{ data }] = useGet(endpoint);
  const [{ data: editData }, { send }] = usePost('/api/v1/cron/');
  const [config, setConfig] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (data) {
      setConfig(data.task.payload);
    }
  }, [data, setConfig]);

  const handleSubmit = (evt, values) => send(values);
  const handleCancel = evt => history.push('/');

  // TODO: show some form of confirmation message before redirecting
  if (editData) {
    return <Redirect to="/" />;
  }

  if (!config) {
    return (
      <AppLayout>
        <LoadingSpinner />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <CreateTaskUI
        title="Edit task:"
        value={config}
        errors={[]}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </AppLayout>
  );
};

export default EditTask;
