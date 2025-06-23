import { ItemContext } from 'ojs/ojcommontypes';
import { DataProvider } from 'ojs/ojdataprovider';
type Props<Key, Data> = {
    data?: DataProvider<Key, Data>;
    addBusyState: (description: string) => () => void;
};
export declare function useDataProvider<K, D>({ addBusyState, data }: Props<K, D>): {
    data: ItemContext<K, D>[];
};
export {};
