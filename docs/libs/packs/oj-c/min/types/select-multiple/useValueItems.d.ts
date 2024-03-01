import { PropertyChanged } from 'ojs/ojvcomponent';
export declare function useValueItems<K, D>(propValueItems?: Map<K, D> | null, onValueItemsChanged?: PropertyChanged<Map<K, D> | null | undefined>): {
    valueItems: Map<K, D> | null | undefined;
    setValueItems: (value: Map<K, D> | null, ...args: any[]) => void;
    preactValueItems: D[] | undefined;
};
