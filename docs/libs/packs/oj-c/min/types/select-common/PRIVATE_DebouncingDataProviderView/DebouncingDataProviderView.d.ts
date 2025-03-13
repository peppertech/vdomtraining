import { DataProvider, ContainsKeysResults, FetchByKeysParameters, FetchByKeysResults, FetchByOffsetParameters, FetchByOffsetResults, FetchListParameters, FetchListResult } from 'ojs/ojdataprovider';
export declare class DebouncingDataProviderView<K, D> implements DataProvider<K, D> {
    private _debouncer;
    protected readonly dataProvider: DataProvider<K, D>;
    constructor(dataProvider: DataProvider<K, D>);
    fetchFirst<F extends FetchListResult<K, D>>(params?: FetchListParameters<D>): AsyncIterable<F>;
    fetchByKeys(params: FetchByKeysParameters<K>): Promise<FetchByKeysResults<K, D>>;
    containsKeys(params: FetchByKeysParameters<K>): Promise<ContainsKeysResults<K>>;
    fetchByOffset(params: FetchByOffsetParameters<D>): Promise<FetchByOffsetResults<K, D>>;
    getTotalSize(): Promise<number>;
    isEmpty(): 'yes' | 'no' | 'unknown';
    getCapability(capabilityName: string): any;
    addEventListener(eventType: string, listener: EventListener): void;
    removeEventListener(eventType: string, listener: EventListener): void;
    dispatchEvent(event: Event): boolean;
}
