import { ItemContext } from 'ojs/ojcommontypes';
import { DataProvider } from 'ojs/ojdataprovider';
type DataProviderHandlerCallback<Key, Data> = {
    onDataUpdated: (data: Array<ItemContext<Key, Data>>) => void;
};
export declare class DataProviderHandler<Key, Data> {
    private readonly addBusyState;
    private readonly dataProvider;
    private currentData;
    private callback?;
    private readonly handleMutateEvent;
    private readonly handleRefreshEvent;
    constructor(dataProvider: DataProvider<Key, Data>, addBusyState: (description: string) => () => void, callback?: DataProviderHandlerCallback<Key, Data>);
    destroy(): void;
    private _fetchData;
    private _fetchDataAndNotify;
}
export {};
