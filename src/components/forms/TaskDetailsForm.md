```js
const initialValue = {
  group_name: '',
  task_name: '',
  description: '',
  schedule: {
    method: 'delay',
    value: '',
  },
  action: {
    method: 'webhook',
    request: {
      type: 'rest',
      method: 'GET',
      url: '',
      headers: {},
      body: {},
    },
  },
  payload: {},
};
const [config, setConfig] = React.useState(initialValue);
const [errors, setErrors] = React.useState([]);
const handleSubmit = (evt, values) =>
  new Promise(resolve => {
    const errors = [];
    if (values.group_name === 'foo') {
      errors.push({
        field: 'group_name',
        message: 'value not accepted',
      });
    }

    if (errors.length) {
      setErrors(errors);
    } else {
      setConfig(values);
    }
    setTimeout(resolve, 1000);
  });
const handleCancel = evt => {
  setConfig(initialValue);
  setErrors([]);
};
<>
  <TaskDetailsForm
    value={config}
    errors={errors}
    onSubmit={handleSubmit}
    onCancel={handleCancel}
  />
  <div
    style={{
      border: '1px solid #888',
      background: '#eee',
      borderRadius: 4,
      padding: '5px 10px',
      marginTop: 20,
    }}
  >
    <pre>{JSON.stringify(config, null, 2)}</pre>
  </div>
</>;
```

Edit:

```js
const initialValue = {
  group_name: 't001',
  task_name: 'foo',
  description: 'This is a generic task',
  schedule: {
    method: 'delay',
    value: '1h',
  },
  action: {
    method: 'webhook',
    request: {
      type: 'rest',
      method: 'GET',
      url: 'https://fetchq-cron.herokuapp.com',
      headers: {
        'X-Foo': 'dummy header',
      },
      body: {
        some: 'props',
        are: true,
      },
    },
  },
  payload: {},
};
const [config, setConfig] = React.useState(initialValue);
const [errors, setErrors] = React.useState([]);
const handleSubmit = (evt, values) =>
  new Promise(resolve => {
    const errors = [];
    if (values.group_name === 'foo') {
      errors.push({
        field: 'group_name',
        message: 'value not accepted',
      });
    }

    if (errors.length) {
      setErrors(errors);
    } else {
      setConfig(values);
    }
    setTimeout(resolve, 1000);
  });
const handleCancel = evt => {
  setConfig(initialValue);
  setErrors([]);
};
<>
  <TaskDetailsForm
    edit
    value={config}
    errors={errors}
    onSubmit={handleSubmit}
    onCancel={handleCancel}
  />
  <div
    style={{
      border: '1px solid #888',
      background: '#eee',
      borderRadius: 4,
      padding: '5px 10px',
      marginTop: 20,
    }}
  >
    <pre>{JSON.stringify(config, null, 2)}</pre>
  </div>
</>;
```
