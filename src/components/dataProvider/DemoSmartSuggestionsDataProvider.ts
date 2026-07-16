import {
  DataProvider,
  FetchByKeysParameters,
  FetchByOffsetParameters,
  FetchByOffsetResults,
  FetchListParameters,
  FetchListResult,
} from "ojs/ojdataprovider";
import ArrayDataProvider = require("ojs/ojarraydataprovider");

const wrapPromise = <K, D, TReturn>(
  promise: Promise<IteratorResult<FetchListResult<K, D>, TReturn>>,
  smartSuggestions: readonly K[]
): Promise<IteratorResult<FetchListResult<K, D>, TReturn>> => {
  return promise.then((result) => {
    if (!result.done) {
      result.value.metadata.forEach((metadata) => {
        if (smartSuggestions.includes(metadata.key)) {
          // populate the suggestion field in metadata with some value
          metadata.suggestion = true;
        }
      });
    }
    return result;
  });
};

class WrappingAsyncIterator<K, D, TReturn = any>
  implements AsyncIterator<FetchListResult<K, D>, TReturn> {
  private readonly _asyncIterator: AsyncIterator<FetchListResult<K, D>, TReturn>;
  private readonly _smartSuggestions: K[];

  constructor(
    asyncIterator: AsyncIterator<FetchListResult<K, D>, TReturn>,
    smartSuggestions: K[]
  ) {
    this._asyncIterator = asyncIterator;
    this._smartSuggestions = smartSuggestions;
  }

  next = () => {
    return wrapPromise(this._asyncIterator.next(), this._smartSuggestions) as Promise<
      IteratorResult<FetchListResult<K, D>, TReturn>
    >;
  };
}

class DemoSmartSuggestionsDataProvider<K, D> implements DataProvider<K, D> {
  private readonly _dataProvider: DataProvider<K, D>;
  private readonly _keyAttribute: string;
  private readonly _smartSuggestions: K[];
  private readonly MAX_SUGGESTIONS: number = 6;

  constructor(data: D[], keyAttribute: string, smartSuggestions: K[]) {
    this._keyAttribute = keyAttribute;
    // make sure there are no more than 6 suggestions as recommended by Redwood spec
    this._smartSuggestions = smartSuggestions.slice(0, this.MAX_SUGGESTIONS);
    this._dataProvider = new ArrayDataProvider<K, D>(this._arrangeData(data), {
      keyAttributes: keyAttribute,
    });
  }

  // ensure smart suggestions are at the top of results
  _arrangeData = (data: D[]): D[] => {
    const smartData: D[] = [];
    const normalData = data.filter((value) => {
      const key = (value as Record<string, unknown>)[this._keyAttribute] as K;
      if (this._smartSuggestions.includes(key)) {
        smartData.push(value);
        return false;
      }
      return true;
    });
    return smartData.concat(normalData);
  }

  createOptimizedKeyMap?(initialMap?: Map<K, D>): Map<K, D> {
    throw new Error("Method not implemented.");
  }
  createOptimizedKeySet?(initialSet?: Set<K>): Set<K> {
    throw new Error("Method not implemented.");
  }

  fetchFirst = (params: FetchListParameters<D>) => {
    const asyncIterable = this._dataProvider.fetchFirst(params);
    const asyncIterator = asyncIterable[Symbol.asyncIterator]();
    const wrappingAsyncIterator = new WrappingAsyncIterator(
      asyncIterator,
      this._smartSuggestions
    );
    asyncIterable[Symbol.asyncIterator] = () => {
      return wrappingAsyncIterator;
    };
    return asyncIterable;
  };

  containsKeys = (params: FetchByKeysParameters<K>) => {
    return this._dataProvider.containsKeys(params);
  };

  fetchByKeys = (params: FetchByKeysParameters<K>) => {
    return this._dataProvider.fetchByKeys(params);
  };

  fetchByOffset = (params: FetchByOffsetParameters<D>) => {
    const promise = this._dataProvider.fetchByOffset(params);
    return new Promise<FetchByOffsetResults<K, D>>((resolve, reject) => {
      promise.then((result) => {
        if (result.results) {
          result.results.forEach((value) => {
            if (this._smartSuggestions.indexOf(value.metadata.key) > -1) {
              // populate the suggestion field in metadata with some value
              value.metadata.suggestion = true;
            }
          });
        }
        resolve(result);
      }, (reason) => {
        reject(reason);
      });
    });                
  };

  getTotalSize = () => {
    return this._dataProvider.getTotalSize();
  };

  isEmpty = () => {
    return this._dataProvider.isEmpty();
  };

  addEventListener = (eventType: string, listener: EventListener) => {
    return this._dataProvider.addEventListener(eventType, listener);
  };

  removeEventListener = (eventType: string, listener: EventListener) => {
    return this._dataProvider.removeEventListener(eventType, listener);
  };

  dispatchEvent = (evt: Event) => {
    return this._dataProvider.dispatchEvent(evt);
  };

  getCapability = (capabilityName: string) => {
    return this._dataProvider.getCapability(capabilityName);
  };
}

export = DemoSmartSuggestionsDataProvider;
