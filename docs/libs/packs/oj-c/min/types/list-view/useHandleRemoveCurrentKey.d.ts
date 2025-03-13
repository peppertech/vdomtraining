import { DataState, CurrentKeyDetail } from '@oracle/oraclejet-preact/UNSAFE_Collection';
export declare function useHandleRemoveCurrentKey<K, D>(dataState: DataState<K, D> | null, updateCurrentKey: (key: K) => void): {
    notifyCurrentKeyChanged: (detail: CurrentKeyDetail<K>) => void;
};
