#### Planned Task

```js
import { f1 } from '../../../data-types/task.fixture.js';
import { makeTask } from '../../../data-types/task';
<TaskDetailsHeader task={makeTask(f1.task)} />;
```

#### Running Task:

```js
import { f2 } from '../../../data-types/task.fixture.js';
import { makeTask } from '../../../data-types/task';
<TaskDetailsHeader task={makeTask(f2.task)} />;
```

#### Orphan Task:

```js
import { f3 } from '../../../data-types/task.fixture.js';
import { makeTask } from '../../../data-types/task';
<TaskDetailsHeader task={makeTask(f3.task)} />;
```

#### Killed Task:

```js
import { f4 } from '../../../data-types/task.fixture.js';
import { makeTask } from '../../../data-types/task';
<TaskDetailsHeader task={makeTask(f4.task)} />;
```

#### Completed Task:

```js
import { f5 } from '../../../data-types/task.fixture.js';
import { makeTask } from '../../../data-types/task';
<TaskDetailsHeader task={makeTask(f5.task)} />;
```
