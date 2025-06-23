import { DataProvider } from 'ojs/ojdataprovider';
import { Optional } from '../utils/utils';
import { DebouncingDataProviderView } from '../PRIVATE_DebouncingDataProviderView/DebouncingDataProviderView';
export declare function useWrapDataProvider<K, D>(data?: Optional<DataProvider<K, D>>): DataProvider<K, D> | DebouncingDataProviderView<K, D> | null | undefined;
