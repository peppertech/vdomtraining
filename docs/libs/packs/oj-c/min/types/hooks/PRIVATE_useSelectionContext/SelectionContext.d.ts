import { Keys } from '@oracle/oraclejet-preact/utils/UNSAFE_keys';
import { ImmutableKeySet } from 'ojs/ojkeyset';
import { PropertyChanged } from 'ojs/ojvcomponent';
type K = string | number;
export type SelectionInfo<K> = {
    selected?: Keys<K>;
    selectionMode?: 'single' | 'multiple' | 'none';
    onSelectedChange?: PropertyChanged<ImmutableKeySet<K>>;
};
export declare const SelectionContext: import("preact").Context<SelectionInfo<K> | undefined>;
export {};
