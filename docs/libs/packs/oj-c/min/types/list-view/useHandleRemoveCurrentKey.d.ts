import { DataState, CurrentKeyDetail } from '@oracle/oraclejet-preact/UNSAFE_Collection';
export declare function useHandleRemoveCurrentKey<K, D>(dataState: DataState<K, D> | null, currentKey?: K, onChange?: (detail: CurrentKeyDetail<K>) => void): void;
