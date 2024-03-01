import { DataProvider } from 'ojs/ojdataprovider';
import { Optional } from '../utils/utils';
export declare function useWrapDataProvider<K, D>(data?: Optional<DataProvider<K, D>>): DataProvider<K, D> | null | undefined;
