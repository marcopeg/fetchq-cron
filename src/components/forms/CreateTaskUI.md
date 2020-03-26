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
const [errors, setErrors] = React.useState([
  {
    field: 'task_name',
    message: 'yeah about that',
  },
  {
    field: 'schedule.value',
    message: 'error here',
  },
  {
    field: 'action.request.url',
    message: 'must pass a url',
  },
  {
    field: 'action.request.method',
    message: 'invalid method here',
  },
]);
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
const handleCancel = evt => setConfig(initialValue);
<>
  <CreateTaskUI
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
