import { deepInfo } from '@marcopeg/deeplog';
import { makeLog } from './logs';
import { f1 } from './logs.fixture';

describe('data-types/logs', () => {
  it('should work', () => {
    const res = makeLog(f1.data.logs[0]);
    deepInfo(f1.data.logs[0]);
    deepInfo(res);

    expect(res.groupName).toBe('foo');
  });
});
