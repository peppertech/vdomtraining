import { DataState, Range } from '@oracle/oraclejet-preact/UNSAFE_Collection';
import { DataFilter, DataProvider, FetchAttribute, SortCriterion } from 'ojs/ojdataprovider';
export type ListDataState<K, D> = {
    status: 'loading';
    data: null;
} | {
    status: 'success';
    data: DataState<K, D>;
} | {
    status: 'error';
    error: any;
};
export type FetchOptions<D> = {
    attributes?: string[] | FetchAttribute[];
    filterCriterion?: DataFilter.Filter<D>;
    sortCriteria?: SortCriterion<D>[];
    isInitialFetchDeferred?: boolean;
    initialRowsFetched?: number;
    fetchSize?: number;
};
export declare const useListData: <K, D>(data: DataProvider<K, D>, options?: FetchOptions<D>) => [ListDataState<K, D>, (range: Range) => void];
