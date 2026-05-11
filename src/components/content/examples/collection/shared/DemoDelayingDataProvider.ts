import type {
  ContainsKeysResults,
  DataProvider,
  FetchByKeysParameters,
  FetchByKeysResults,
  FetchByOffsetParameters,
  FetchByOffsetResults,
  FetchFirstCapability,
  FetchListParameters,
  FetchListResult
} from 'ojs/ojdataprovider';

type SpecificDelay = {
  fetchFirst?: number;
  fetchByKeys?: number;
  fetchByOffset?: number;
};

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

export default class DemoDelayingDataProvider<K, D> implements DataProvider<K, D> {
  public createOptimizedKeyMap?: (initialMap?: Map<K, D>) => Map<K, D>;
  public createOptimizedKeySet?: (initialSet?: Set<K>) => Set<K>;

  public constructor(
    private readonly dataProvider: DataProvider<K, D>,
    private readonly delay = 300,
    private readonly delays?: SpecificDelay
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
    const fetchFirstDelay = this.delays?.fetchFirst ?? this.delay;

    return {
      [Symbol.asyncIterator]: () =>
        new WrappingAsyncIterator<K, D>(asyncIterator, fetchFirstDelay, signal)
    };
  }

  public containsKeys(parameters: FetchByKeysParameters<K>): Promise<ContainsKeysResults<K>> {
    return wrapPromise(this.dataProvider.containsKeys(parameters), this.delay);
  }

  public fetchByKeys(parameters: FetchByKeysParameters<K>): Promise<FetchByKeysResults<K, D>> {
    const signal = parameters.signal;

    if (signal?.aborted) {
      return Promise.reject(createAbortError(signal));
    }

    return wrapPromise(
      this.dataProvider.fetchByKeys(parameters),
      this.delays?.fetchByKeys ?? this.delay,
      signal
    );
  }

  public fetchByOffset(
    parameters: FetchByOffsetParameters<D>
  ): Promise<FetchByOffsetResults<K, D>> {
    const signal = parameters.signal;

    if (signal?.aborted) {
      return Promise.reject(createAbortError(signal));
    }

    return wrapPromise(
      this.dataProvider.fetchByOffset(parameters),
      this.delays?.fetchByOffset ?? this.delay,
      signal
    );
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
    let capability = this.dataProvider.getCapability(capabilityName);

    if (capabilityName === 'fetchFirst') {
      const delay = this.delays?.fetchFirst ?? this.delay;

      if (delay > 0) {
        const fetchFirstCapability: FetchFirstCapability = {
          iterationSpeed: 'delayed',
          caching: 'none'
        };

        capability = capability
          ? { ...(capability as object), ...fetchFirstCapability }
          : fetchFirstCapability;
      }
    }

    return capability;
  }
}
