# Utility Functions

## Wait Until

This function is to wait until the callback retuning a valid value.

```ts
import { setTimeout as wait } from 'timers/promises';

/**
 * wait until
 * @param callback
 * @param options
 * @returns
 */
export const waitUntil = <T = any>(
  callback: () => Promise<T> | T,
  options?: {
    /**
     * timeout
     * @default 10s
     */
    timeout?: number;
    /**
     * interval
     * @default 300ms
     */
    interval?: number;
    /**
     * verify the returned value is valid
     * @default truthy
     */
    verify?: (v?: T) => boolean;
    /**
     * limit the callback's running times
     * @default Infinity
     */
    maxTimes?: number;
  },
) => {
  const { timeout, maxTimes, verify, interval } = options || {};
  let hasTimeout = false;
  const limit = maxTimes || Infinity;
  let times = 0;
  let v: T;
  let e: Error;
  return new Promise<T>(async (resolve, reject) => {
    const handler = setTimeout(() => {
      hasTimeout = true;
      e = new Error(`timeout: ${(timeout || 10000) / 1000}s`);
      reject(e);
    }, timeout || 10000);
    while (!hasTimeout && !v && !e) {
      if (times >= limit) {
        e = new Error(`max times: ${times}`);
        break;
      }
      times += 1;
      try {
        v = await callback();
      } catch (_e) {
        e = _e;
        break;
      }
      if (verify?.(v) || !!v) {
        clearTimeout(handler);
        return resolve(v);
      }
      await wait(interval || 300);
    }
    if (e) {
      clearTimeout(handler);
      return reject(e);
    }
    return resolve(v);
  });
};
```

## useLongPull

Running a long pull task based on the React Hook.

```ts
import { useEffect, useCallback, useRef } from 'react';

/**
 * start a long pull task
 * - callback changed/clear/stop => stop the task
 * - only one task at the same time
 * @param callback
 * @returns [start, stop]
 */
export const useLongPull = <T = any>(callback: (e?: Error, v?: T) => T | undefined) => {
  const ref = useRef<boolean>(false);
  const timer = useRef<number>(0);

  const continuePull = useCallback((cp: boolean) => {
    ref.current = cp;
  }, []);

  const stop = useCallback(() => continuePull(false), [continuePull]);

  const pull = useCallback(
    (flag: number) => {
      const fn = async (__e?: Error, v?: T) => {
        let res;
        let e;
        try {
          res = await callback(__e, v);
        } catch (_e) {
          e = _e;
        }
        if (ref.current && flag === timer.current) queueMicrotask(() => void fn(e, res));
      };
      return fn();
    },
    [callback],
  );

  const start = useCallback(() => {
    timer.current += 1;
    continuePull(true);
    pull(timer.current);
  }, [pull, continuePull]);

  useEffect(() => {
    stop();
    return stop;
  }, [stop]);

  return [start, stop] as const;
};
```

## XOR

```ts
```

## Limit Concurrent Volume

This class is used to register a task and fetch its result asynchronously.

```ts
enum TaskStatus {
  waiting,
  running,
  success,
  fail
}

export class TaskService {
  /**
   * current tasks queue
   */
  private tasks: {
    id: string;
    status: TaskStatus;
    task: () => any;
    ret?: any;
  }[] = [];
  /**
   * max concurrent volume
   */
  private maxConcurrent: number;
  /**
   * if remove the finished task
   */
  private removeFinished = true;

  constructor(maxConcurrent: number, removeFinished?: boolean) {
    this.maxConcurrent = maxConcurrent;
    if (removeFinished !== undefined) this.removeFinished = removeFinished;
  }

  /**
   * execute a waiting task
   */
  private execute() {
    setTimeout(async () => {
      if (this.getCurrentConcurrentVolume() < this.maxConcurrent) {
        const item = this.tasks.filter(({ status }) => status === TaskStatus.waiting).pop();
        if (item) {
          item.status = TaskStatus.running;
          try {
            const ret = await item.task();
            item.ret = ret;
            item.status = TaskStatus.success;
          } catch (e) {
            item.ret = e;
            item.status = TaskStatus.fail;
          }
          this.execute();
        }
      }
    });
  }

  /**
   * get current concurrent volume
   * @returns 
   */
  getCurrentConcurrentVolume() {
    return this.tasks.filter(({ status }) => status === TaskStatus.running).length;
  }

  /**
   * register a task
   * @param data
   * @param taskId
   * @returns
   */
  register<T extends (() => any)>(task: T) {
    const id = `${Math.random()}`;
    this.tasks.unshift({
      id,
      task,
      status: TaskStatus.waiting,
    });
    this.execute();
    return id;
  }

  /**
   * search task result
   * - if it has been finished, remove it
   * @param id 
   */
  fetch(id: string) {
    const index = this.tasks.findIndex(item => item.id === id);
    if (index < 0) throw new Error(`invalid id: ${id}`);
    const item = this.tasks[index];
    if (this.removeFinished && item.status === TaskStatus.success || item.status === TaskStatus.fail) this.tasks.splice(index, 1);
    return item;
  }
}
```

## setTimeout

```ts
/**
 * 计时
 * @param cb timer: 计时次数
 * @param interval 计时间隔
 * @returns [start, stop]
 */
export const withTimeChange = (cb: (timer: number) => void, interval = 1000) => {
  let timer = 0;
  let handler: number | undefined;
  let fn: ((last?: number | undefined) => number) | undefined = (last?: number) =>
    requestAnimationFrame((t) => {
      if (!last || t - last > interval) {
        if (last) timer += ((t - last) / interval) >> 0;
        else timer += 1;
        try {
          cb(timer);
        } catch (e) {
          console.log('callback error in withTimeChange:', e);
        }
        handler = fn?.(t);
      } else {
        handler = fn?.(last);
      }
    });
  return [
    () => {
      handler = fn?.();
    },
    () => {
      if (handler !== undefined) cancelAnimationFrame(handler);
      fn = undefined;
    },
  ] as const;
};
```

## Priority Queue

```ts
class PriorityQueue<T = any> {
    private data: T[];
    private sortFn = (a: T, b: T) => a > b;

    /**
     * @param data data source
     * @param sortFn compare value
     */
    constructor(params?: {
        data?: T[];
        sortFn?: (a: T, b: T) => boolean
    }) {
        const { data, sortFn } = params || {};
        if (sortFn) this.sortFn = sortFn;
        this.data = data || [];
        this.buildHeap();
    }

    /**
     * rebuild the max-heap
     */
    private buildHeap() {
        // start from the first parent node
        for (let i = Math.floor(this.data.length / 2) - 1; i >= 0; i--) this.heapify(this.data.length, i);
    }

    /**
     * swap value
     * @param i1 index 1
     * @param i2 index 2 
     */
    private swap(i1: number, i2: number) {
        const v = this.data[i1];
        this.data[i1] = this.data[i2];
        this.data[i2] = v;
    }

    /**
     * To heapify a subtree rooted with node i
     * @param n within Array length
     * @param i node index
     */
    private heapify(n: number, i: number) {
        const l = 2 * i + 1;
        const r = l + 1;
        let largest = i;
        if (l < n && this.sortFn(this.data[l], this.data[largest])) largest = l;
        if (r < n && this.sortFn(this.data[r], this.data[largest])) largest = r;
        if (largest !== i) {
            this.swap(i, largest);
            // Recursively heapify the affected sub-tree
            this.heapify(n, largest);
        }
    }

    /**
     * up an node
     * @param index 
     */
    private up(index: number) {
        while (index !== 0) {
            const parentIndex = Math.floor(index / 2) - 1;
            if (!this.sortFn(this.data[index], this.data[parentIndex])) break;
            this.heapify(this.data.length, parentIndex);
            index = parentIndex;
        }
    }

    /**
     * add a new value to the queue
     * @param v 
     */
    add(v: T) {
        this.data.push(v);
        this.up(this.data.length - 1)
    }

    /**
     * peek and remove the first value
     * @returns 
     */
    peek() {
        const v = this.data.shift();
        this.heapify(this.data.length, 0);
        return v;
    }

    /**
     * remove a specific value
     * @param target 
     */
    remove(target: T) {
        const index = this.data.findIndex(v => v === target);
        if (index > -1) {
            this.data.splice(index, 1);
            this.buildHeap();
        }
    }

    /**
     * iterate the queue
     * @param args 
     */
    forEach(...args: Parameters<typeof this.data.forEach>) {
        this.data.forEach(...args);
    }

    /**
     * get the queue's length
     * @returns 
     */
    size() {
        return this.data.length;
    }
}
```