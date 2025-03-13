import type { ItemContext } from 'ojs/ojcommontypes';
import type { DataProvider } from 'ojs/ojdataprovider';
import { type Dispatch, type StateUpdater } from 'preact/hooks';
import { type Optional } from '../utils/utils';
export type UseDataProviderListenerProps<K extends string | number, D extends Record<string, any>, V extends K | Set<K>, VI extends ItemContext<K, D> | Map<K, ItemContext<K, D>>> = {
    dataProvider?: Optional<DataProvider<K, D>>;
    setValue: Dispatch<StateUpdater<Optional<V>>>;
    setValueToSync: Dispatch<StateUpdater<Optional<V>>>;
    setValueItemsToSync: Dispatch<StateUpdater<Optional<VI>>>;
    value?: Optional<V>;
    valueItems?: Optional<VI>;
};
export declare function useDataProviderListeners<K extends string | number, D extends Record<string, any>, V extends K | Set<K>, VI extends ItemContext<K, D> | Map<K, ItemContext<K, D>>>({ dataProvider, setValue, setValueToSync, setValueItemsToSync, value, valueItems }: UseDataProviderListenerProps<K, D, V, VI>): void;
