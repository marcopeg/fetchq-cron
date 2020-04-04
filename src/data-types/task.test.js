// import { deepInfo } from '@marcopeg/deeplog';
import { makeTask } from './task';
import { f1, f2, f3, f4, f5 } from './task.fixture';

describe('data-types/task', () => {
  it('should build a planned task', () => {
    const task = makeTask(f1.task);
    expect(task.isPlanned).toBe(true);
    expect(task.isRunning).toBe(false);
    expect(task.isOrphan).toBe(false);
    expect(task.isKilled).toBe(false);
    expect(task.isCompleted).toBe(false);
  });
  it('should build a running task', () => {
    const task = makeTask(f2.task);
    expect(task.isPlanned).toBe(false);
    expect(task.isRunning).toBe(true);
    expect(task.isOrphan).toBe(false);
    expect(task.isKilled).toBe(false);
    expect(task.isCompleted).toBe(false);
    expect(task.startedAt.getTime()).toBeLessThan(Date.now());
  });
  it('should build an orphan task', () => {
    const task = makeTask(f3.task);
    expect(task.isPlanned).toBe(false);
    expect(task.isRunning).toBe(false);
    expect(task.isOrphan).toBe(true);
    expect(task.isKilled).toBe(false);
    expect(task.isCompleted).toBe(false);
    expect(task.startedAt.getTime()).toBeLessThan(Date.now());
  });
  it('should build a killed task', () => {
    const task = makeTask(f4.task);
    expect(task.isPlanned).toBe(false);
    expect(task.isRunning).toBe(false);
    expect(task.isOrphan).toBe(false);
    expect(task.isKilled).toBe(true);
    expect(task.isCompleted).toBe(false);
  });
  it('should build a completed task', () => {
    const task = makeTask(f5.task);
    expect(task.isPlanned).toBe(false);
    expect(task.isRunning).toBe(false);
    expect(task.isOrphan).toBe(false);
    expect(task.isKilled).toBe(false);
    expect(task.isCompleted).toBe(true);
  });
});
