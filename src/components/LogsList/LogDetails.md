```js
import { makeLog } from '../../data-types/logs';
import { f1 } from './LogDetails.fixture';
const [log, setLog] = React.useState(null);
<>
  <LogDetails log={log} onClose={() => setLog(null)} />
  <button onClick={() => setLog(makeLog(f1))}>show log</button>
  <button onClick={() => setLog(null)}>close log</button>
</>;
```
