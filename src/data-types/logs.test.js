// import { deepInfo } from '@marcopeg/deeplog';
import { makeLog } from './logs';
import { f1 } from './logs.fixture';

describe('data-types/logs', () => {
  it('should work', () => {
    const log = makeLog(f1.data.logs[0]);
    // deepInfo(f1.data.logs[0]);
    // deepInfo(log);

    expect(log).toHaveProperty('groupName', expect.any(String));
    expect(log).toHaveProperty('taskName', expect.any(String));
    expect(log).toHaveProperty('message', expect.any(String));
    expect(log).toHaveProperty('createdAt', expect.any(Date));
    expect(log).toHaveProperty('cursor', expect.any(Number));
    expect(log).toHaveProperty('type', expect.any(String));
  });
});
