```js
const [config, setConfig] = React.useState({
  method: 'GET',
  url: '',
  headers: {},
  body: {},
});
<>
  <ConfigRestRequest
    value={config}
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
