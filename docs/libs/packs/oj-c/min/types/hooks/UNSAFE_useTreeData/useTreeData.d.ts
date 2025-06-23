import { FlattenedDataState, Range } from '@oracle/oraclejet-preact/UNSAFE_Collection';
import { FetchAttribute, DataFilter, SortCriterion } from 'ojs/ojdataprovider';
import TreeDataProvider = require('ojs/ojtreedataprovider');
import { KeySet } from 'ojs/ojkeyset';
export type TreeDataState<K, D> = {
    status: 'loading';
    data: null;
} | {
    status: 'success';
    data: FlattenedDataState<K, D>;
} | {
    status: 'error';
    error: any;
};
export type FetchOptions<K, D> = {
    attributes?: string[] | FetchAttribute[];
    filterCriterion?: DataFilter.Filter<D>;
    sortCriteria?: SortCriterion<D>[];
    isInitialFetchDeferred?: boolean;
    initialRowsFetched?: number;
    expanded?: KeySet<K>;
    includeClosestParents?: boolean;
};
export type ToggleDetail<K> = {
    key: K;
};
export declare const useTreeData: <K, D>(data: TreeDataProvider<K, D>, options?: FetchOptions<K, D>) => [TreeDataState<K, D>, (range: Range) => void, (detail: ToggleDetail<K>) => void];
