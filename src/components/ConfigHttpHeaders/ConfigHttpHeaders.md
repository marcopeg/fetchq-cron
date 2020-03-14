```js
const [config, setConfig] = React.useState([
  {
    key: 'x-foo',
    value: 'bar',
  },
  {
    key: 'Authorisation',
    value: 'Bearer: xxx',
  },
]);
<>
  <ConfigHttpHeaders headers={config} onChange={setConfig} />
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
