import type { DataProvider } from 'ojs/ojdataprovider';

declare class DemoSmartSuggestionsDataProvider<K, D> {
  constructor(data: D[], keyAttribute: keyof D & string, smartSuggestions: K[]);

  fetchFirst: DataProvider<K, D>['fetchFirst'];
  containsKeys: DataProvider<K, D>['containsKeys'];
  fetchByKeys: DataProvider<K, D>['fetchByKeys'];
  fetchByOffset: DataProvider<K, D>['fetchByOffset'];
  getTotalSize: DataProvider<K, D>['getTotalSize'];
  isEmpty: DataProvider<K, D>['isEmpty'];
  addEventListener: DataProvider<K, D>['addEventListener'];
  removeEventListener: DataProvider<K, D>['removeEventListener'];
  dispatchEvent: DataProvider<K, D>['dispatchEvent'];
  getCapability: DataProvider<K, D>['getCapability'];
  createOptimizedKeyMap: DataProvider<K, D>['createOptimizedKeyMap'];
  createOptimizedKeySet: DataProvider<K, D>['createOptimizedKeySet'];
}

export = DemoSmartSuggestionsDataProvider;
