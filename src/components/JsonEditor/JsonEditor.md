```js
const [json, setJson] = React.useState({ prop: 'value' });
<>
  <JsonEditor value={json} onChange={(evt, json) => setJson(json)} />
  <div
    style={{
      border: '1px solid #888',
      background: '#eee',
      borderRadius: 4,
      padding: '5px 10px',
      marginTop: 20,
    }}
  >
    <pre>{JSON.stringify(json, null, 2)}</pre>
  </div>
</>;
```
