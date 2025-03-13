import { ImmutableKeySet } from 'ojs/ojkeyset';
import { Keys } from '@oracle/oraclejet-preact/utils/UNSAFE_keys';
export declare const keySetToKeys: <K>(keySet: ImmutableKeySet<K> | undefined) => Keys<K>;
export declare const keysToKeySet: <K>(keys: Keys<K>) => ImmutableKeySet<K>;
export declare const isEmpty: <K>(keys: Keys<K>) => boolean;
export declare const getFirstKey: <K, D>(keys: Keys<K>, data: D[]) => K | D | null;
