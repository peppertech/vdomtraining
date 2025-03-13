import { Item as CurrentItem } from '@oracle/oraclejet-preact/UNSAFE_Collection';
import { ListViewProps } from './list-view';
export declare const useCurrentItemOverride: <K extends string | number, D>(currentItemOverride: ListViewProps<K, D>["currentItemOverride"]) => {
    preactCurrentItemOverride: CurrentItem<K> | undefined;
    updateCurrentItemOverride: (key: K) => void;
};
