declare class DemoSmartSuggestionsDataProvider<K = string, D = unknown> {
  constructor(data: D[], keyAttribute: keyof D | string, smartSuggestions: K[]);
}

export = DemoSmartSuggestionsDataProvider;
