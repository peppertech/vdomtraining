import type {
  ContainsKeysResults,
  DataProvider,
  FetchByKeysParameters,
  FetchByKeysResults,
  FetchByOffsetParameters,
  FetchByOffsetResults,
  FetchListParameters,
  FetchListResult,
} from 'ojs/ojdataprovider';

declare class DemoSmartSuggestionsDataProvider<K, D> implements DataProvider<K, D> {
  constructor(data: D[], keyAttribute: string, smartSuggestions: K[]);

  _arrangeData: (data: D[]) => D[];
  createOptimizedKeyMap?(initialMap?: Map<K, D>): Map<K, D>;
  createOptimizedKeySet?(initialSet?: Set<K>): Set<K>;
  fetchFirst: (params: FetchListParameters<D>) => AsyncIterable<FetchListResult<K, D>>;
  containsKeys: (params: FetchByKeysParameters<K>) => Promise<ContainsKeysResults<K>>;
  fetchByKeys: (params: FetchByKeysParameters<K>) => Promise<FetchByKeysResults<K, D>>;
  fetchByOffset: (params: FetchByOffsetParameters<D>) => Promise<FetchByOffsetResults<K, D>>;
  getTotalSize: () => Promise<number>;
  isEmpty: () => 'yes' | 'no' | 'unknown';
  addEventListener: (eventType: string, listener: EventListener) => void;
  removeEventListener: (eventType: string, listener: EventListener) => void;
  dispatchEvent: (evt: Event) => boolean;
  getCapability: (capabilityName: string) => any;
}

export = DemoSmartSuggestionsDataProvider;
