```js
const [config, setConfig] = React.useState({
  method: 'delay',
  value: '',
});
<>
  <ConfigSchedule value={config} onChange={(evt, value) => setConfig(value)} />
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

With errors:

```js
const [config, setConfig] = React.useState({
  method: 'delay',
  value: '',
});
const [errors, setErrors] = React.useState([
  {
    field: 'value',
    message: 'invalid value',
  },
  {
    field: 'method',
    message: 'invalid method',
  },
]);
<>
  <ConfigSchedule
    value={config}
    errors={errors}
    onChange={(evt, value) => setConfig(value)}
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
