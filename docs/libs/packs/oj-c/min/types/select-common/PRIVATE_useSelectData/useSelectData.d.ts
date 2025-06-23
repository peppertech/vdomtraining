import type { DataState } from '@oracle/oraclejet-preact/UNSAFE_Collection';
import { type ListDataState } from 'oj-c/hooks/UNSAFE_useListData/useListData';
import type { DataFilter, DataProvider } from 'ojs/ojdataprovider';
type UseSelectDataParams<K, D> = {
    data?: DataProvider<K, D> | null;
    dataStateOverride?: DataState<K, D>;
    filterCriterion?: DataFilter.Filter<D>;
    hasCollectionTemplate: boolean;
};
export declare const useSelectData: <K, D>({ data, dataStateOverride: propDataStateOverride, filterCriterion, hasCollectionTemplate }: UseSelectDataParams<K, D>) => {
    dataProvider: DataProvider<K, D> | import("../PRIVATE_DebouncingDataProviderView/DebouncingDataProviderView").DebouncingDataProviderView<K, D> | null | undefined;
    dataState: ListDataState<K, D>;
    onLoadRange: (range: import("@oracle/oraclejet-preact/UNSAFE_Collection").Range) => void;
};
export {};
