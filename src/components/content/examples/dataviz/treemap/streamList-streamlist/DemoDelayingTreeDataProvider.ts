import type {
  ContainsKeysResults,
  FetchByKeysParameters,
  FetchByKeysResults,
  FetchByOffsetParameters,
  FetchByOffsetResults,
  FetchListParameters,
  FetchListResult
} from 'ojs/ojdataprovider';
import type TreeDataProvider = require('ojs/ojtreedataprovider');

const createAbortError = (signal?: AbortSignal): DOMException =>
  new DOMException(String(signal?.reason ?? 'The operation was aborted.'), 'AbortError');

const wrapPromise = <T>(promise: Promise<T>, delay: number, signal?: AbortSignal): Promise<T> =>
  new Promise<T>((resolve, reject) => {
    let aborted = false;

    const timer = setTimeout(() => {
      if (aborted) {
        return;
      }

      promise.then(
        (result) => {
          if (!aborted) {
            resolve(result);
          }
        },
        (reason) => {
          if (!aborted) {
            reject(reason);
          }
        }
      );
    }, delay);

    if (signal) {
      signal.addEventListener(
        'abort',
        () => {
          aborted = true;
          clearTimeout(timer);
          reject(createAbortError(signal));
        },
        { once: true }
      );
    }
  });

class WrappingAsyncIterator<K, D> implements AsyncIterator<FetchListResult<K, D>> {
  public constructor(
    private readonly asyncIterator: AsyncIterator<FetchListResult<K, D>>,
    private readonly delay: number,
    private readonly signal?: AbortSignal
  ) {}

  public next(): Promise<IteratorResult<FetchListResult<K, D>>> {
    if (this.signal?.aborted) {
      return Promise.reject(createAbortError(this.signal));
    }

    return wrapPromise(this.asyncIterator.next(), this.delay, this.signal);
  }
}

export default class DemoDelayingTreeDataProvider<K, D> implements TreeDataProvider<K, D> {
  public createOptimizedKeyMap?: (initialMap?: Map<K, D>) => Map<K, D>;
  public createOptimizedKeySet?: (initialSet?: Set<K>) => Set<K>;

  public constructor(
    private readonly dataProvider: TreeDataProvider<K, D>,
    private readonly delay = 300,
    private readonly childDelay = delay
  ) {
    if (typeof dataProvider.createOptimizedKeyMap === 'function') {
      this.createOptimizedKeyMap = (initialMap?: Map<K, D>) =>
        dataProvider.createOptimizedKeyMap?.(initialMap) ?? new Map<K, D>();
    }

    if (typeof dataProvider.createOptimizedKeySet === 'function') {
      this.createOptimizedKeySet = (initialSet?: Set<K>) =>
        dataProvider.createOptimizedKeySet?.(initialSet) ?? new Set<K>();
    }
  }

  public fetchFirst(parameters?: FetchListParameters<D>): AsyncIterable<FetchListResult<K, D>> {
    const signal = parameters?.signal;
    const asyncIterator = this.dataProvider.fetchFirst(parameters)[Symbol.asyncIterator]();

    return {
      [Symbol.asyncIterator]: () =>
        new WrappingAsyncIterator<K, D>(asyncIterator, this.delay, signal)
    };
  }

  public containsKeys(parameters: FetchByKeysParameters<K>): Promise<ContainsKeysResults<K>> {
    return wrapPromise(this.dataProvider.containsKeys(parameters), this.delay, parameters.signal);
  }

  public fetchByKeys(parameters: FetchByKeysParameters<K>): Promise<FetchByKeysResults<K, D>> {
    return wrapPromise(this.dataProvider.fetchByKeys(parameters), this.delay, parameters.signal);
  }

  public fetchByOffset(
    parameters: FetchByOffsetParameters<D>
  ): Promise<FetchByOffsetResults<K, D>> {
    return wrapPromise(this.dataProvider.fetchByOffset(parameters), this.delay, parameters.signal);
  }

  public getTotalSize(): Promise<number> {
    return this.dataProvider.getTotalSize();
  }

  public isEmpty(): 'yes' | 'no' | 'unknown' {
    return this.dataProvider.isEmpty();
  }

  public addEventListener(eventType: string, listener: EventListener): void {
    this.dataProvider.addEventListener(eventType, listener);
  }

  public removeEventListener(eventType: string, listener: EventListener): void {
    this.dataProvider.removeEventListener(eventType, listener);
  }

  public dispatchEvent(evt: Event): boolean {
    return this.dataProvider.dispatchEvent(evt);
  }

  public getCapability(capabilityName: string): unknown {
    return this.dataProvider.getCapability(capabilityName);
  }

  public getChildDataProvider(parentKey: K): TreeDataProvider<K, D> | null {
    const childDataProvider = this.dataProvider.getChildDataProvider(parentKey);

    if (!childDataProvider) {
      return null;
    }

    return new DemoDelayingTreeDataProvider<K, D>(childDataProvider, this.childDelay);
  }
}
