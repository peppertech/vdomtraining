import { ImmutableKeySet } from 'ojs/ojkeyset';
import { Keys } from '@oracle/oraclejet-preact/utils/UNSAFE_keys';
export declare const keySetToKeys: <K>(keySet: ImmutableKeySet<K> | undefined) => Keys<K>;
export declare const keysToKeySet: <K>(keys: Keys<K>) => ImmutableKeySet<K>;
