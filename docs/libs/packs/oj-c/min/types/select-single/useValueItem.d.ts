import { PropertyChanged } from 'ojs/ojvcomponent';
export declare function useValueItem<V>(propValueItem?: V | null, onValueItemsChanged?: PropertyChanged<V | null | undefined>): {
    valueItem: V | null | undefined;
    setValueItem: (value: V | null, ...args: any[]) => void;
};
