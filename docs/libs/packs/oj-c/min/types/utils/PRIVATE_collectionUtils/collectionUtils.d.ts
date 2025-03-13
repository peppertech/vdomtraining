import { DataState } from '@oracle/oraclejet-preact/UNSAFE_Collection/DataState';
import { ImmutableKeySet } from 'ojs/ojkeyset';
import { PropertyChanged } from 'ojs/ojvcomponent';
import { SelectionDetail } from '@oracle/oraclejet-preact/UNSAFE_Collection';
export declare const getSelectedKeys: <K extends string | number, D>(selected: ImmutableKeySet<K> | undefined, listData: DataState<K, D> | null, selectionMode: string | undefined, onSelectedChanged: PropertyChanged<ImmutableKeySet<K>> | undefined) => {
    all: true;
    keys?: never;
    deletedKeys: import("@oracle/oraclejet-preact/dist/types/utils/UNSAFE_keys").ImmutableSet<K>;
} | {
    all: false;
    keys: import("@oracle/oraclejet-preact/dist/types/utils/UNSAFE_keys").ImmutableSet<K>;
    deletedKeys?: never;
} | {
    all: false;
    keys: Set<K>;
};
export declare const handleOnSelectionChanged: <K extends string | number>(selectionMode: string | undefined, detail: SelectionDetail<K>, onSelectedChanged: PropertyChanged<ImmutableKeySet<K>> | undefined, isClickthroughDisabled: (target: EventTarget | null) => boolean) => void;
