define(["require", "exports", "ojs/ojarraydataprovider"], function (require, exports, ArrayDataProvider) {
    "use strict";
    const wrapPromise = (promise, smartSuggestions) => {
        return new Promise((resolve, reject) => {
            promise.then((result) => {
                if (result.value) {
                    let metadata = result.value.metadata;
                    metadata.forEach((value) => {
                        if (smartSuggestions.indexOf(value.key) > -1) {
                            // populate the suggestion field in metadata with some value
                            value.suggestion = true;
                        }
                    });
                }
                resolve(result);
            }, (reason) => {
                reject(reason);
            });
        });
    };
    class WrappingAsyncIterator {
        constructor(asyncIterator, smartSuggestions) {
            this.next = () => {
                return wrapPromise(this._asyncIterator.next(), this._smartSuggestions);
            };
            this._asyncIterator = asyncIterator;
            this._smartSuggestions = smartSuggestions;
        }
    }
    class DemoSmartSuggestionsDataProvider {
        constructor(data, keyAttribute, smartSuggestions) {
            this.MAX_SUGGESTIONS = 6;
            // ensure smart suggestions are at the top of results
            this._arrangeData = (data) => {
                const smartData = [];
                const normalData = data.filter((value) => {
                    if (this._smartSuggestions.indexOf(value[this._keyAttribute]) > -1) {
                        smartData.push(value);
                        return false;
                    }
                    return true;
                });
                return smartData.concat(normalData);
            };
            this.fetchFirst = (params) => {
                const asyncIterable = this._dataProvider.fetchFirst(params);
                const asyncIterator = asyncIterable[Symbol.asyncIterator]();
                const wrappingAsyncIterator = new WrappingAsyncIterator(asyncIterator, this._smartSuggestions);
                asyncIterable[Symbol.asyncIterator] = () => {
                    return wrappingAsyncIterator;
                };
                return asyncIterable;
            };
            this.containsKeys = (params) => {
                return this._dataProvider.containsKeys(params);
            };
            this.fetchByKeys = (params) => {
                return this._dataProvider.fetchByKeys(params);
            };
            this.fetchByOffset = (params) => {
                const promise = this._dataProvider.fetchByOffset(params);
                return new Promise((resolve, reject) => {
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
            this.getTotalSize = () => {
                return this._dataProvider.getTotalSize();
            };
            this.isEmpty = () => {
                return this._dataProvider.isEmpty();
            };
            this.addEventListener = (eventType, listener) => {
                return this._dataProvider.addEventListener(eventType, listener);
            };
            this.removeEventListener = (eventType, listener) => {
                return this._dataProvider.removeEventListener(eventType, listener);
            };
            this.dispatchEvent = (evt) => {
                return this._dataProvider.dispatchEvent(evt);
            };
            this.getCapability = (capabilityName) => {
                return this._dataProvider.getCapability(capabilityName);
            };
            this._keyAttribute = keyAttribute;
            // make sure there are no more than 6 suggestions as recommended by Redwood spec
            this._smartSuggestions = smartSuggestions.slice(0, this.MAX_SUGGESTIONS);
            this._dataProvider = new ArrayDataProvider(this._arrangeData(data), { keyAttributes: keyAttribute });
        }
        createOptimizedKeyMap(initialMap) {
            throw new Error("Method not implemented.");
        }
        createOptimizedKeySet(initialSet) {
            throw new Error("Method not implemented.");
        }
    }
    return DemoSmartSuggestionsDataProvider;
});
