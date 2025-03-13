define(["require", "exports", "ojs/ojdataprovider", "./Debouncer"], function (require, exports, ojdataprovider_1, Debouncer_1) {
    "use strict";
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DebouncingDataProviderView = void 0;
    class AsyncIteratorWrapper {
        constructor(dataProvider, debouncer, params) {
            this._isFirstNext = true;
            this.dataProvider = dataProvider;
            this.debouncer = debouncer;
            this.params = params;
        }
        next() {
            if (this._isFirstNext) {
                this.debouncer.recordRequestTime();
                this._isFirstNext = false;
                const filterText = this.params?.filterCriterion?.text;
                const debounceCallback = (resolve, reject) => {
                    if (this.params?.signal?.aborted) {
                        reject(this.params?.signal?.reason);
                        return;
                    }
                    const asyncIterable = this.dataProvider.fetchFirst(this.params);
                    this._asyncIterator = asyncIterable[Symbol.asyncIterator]();
                    const fetchStart = Date.now();
                    const iterPromise = this._asyncIterator.next();
                    iterPromise.then((result) => {
                        const fetchEnd = Date.now();
                        this.debouncer.recordResponseTime(fetchEnd - fetchStart, filterText ? filterText.length : 0);
                        resolve(result);
                    }, reject);
                };
                const callback = (resolve, reject) => {
                    const promise = new Promise((pResolve, pReject) => {
                        this.debouncer.debounce(debounceCallback, filterText ? filterText.length : 0)(pResolve, pReject);
                    });
                    return promise.then(resolve, reject);
                };
                return (0, ojdataprovider_1.wrapWithAbortHandling)(this.params?.signal, callback, false);
            }
            return this._asyncIterator.next();
        }
    }
    class AsyncIterableWrapper {
        constructor(dataProvider, debouncer, params) {
            this[_a] = () => {
                return new AsyncIteratorWrapper(this.dataProvider, this.debouncer, this.params);
            };
            this.dataProvider = dataProvider;
            this.debouncer = debouncer;
            this.params = params;
        }
    }
    _a = Symbol.asyncIterator;
    class DebouncingDataProviderView {
        constructor(dataProvider) {
            this._debouncer = new Debouncer_1.Debouncer();
            this.dataProvider = dataProvider;
        }
        fetchFirst(params) {
            return new AsyncIterableWrapper(this.dataProvider, this._debouncer, params);
        }
        fetchByKeys(params) {
            return this.dataProvider.fetchByKeys(params);
        }
        containsKeys(params) {
            return this.dataProvider.containsKeys(params);
        }
        fetchByOffset(params) {
            return this.dataProvider.fetchByOffset(params);
        }
        getTotalSize() {
            return this.dataProvider.getTotalSize();
        }
        isEmpty() {
            return this.dataProvider.isEmpty();
        }
        getCapability(capabilityName) {
            return this.dataProvider.getCapability(capabilityName);
        }
        addEventListener(eventType, listener) {
            this.dataProvider.addEventListener(eventType, listener);
        }
        removeEventListener(eventType, listener) {
            this.dataProvider.removeEventListener(eventType, listener);
        }
        dispatchEvent(event) {
            return this.dataProvider.dispatchEvent(event);
        }
    }
    exports.DebouncingDataProviderView = DebouncingDataProviderView;
});
