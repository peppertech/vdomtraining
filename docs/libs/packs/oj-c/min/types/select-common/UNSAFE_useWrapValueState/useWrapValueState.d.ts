import { ValueState } from 'oj-c/editable-value/UNSAFE_useValue/useValue';
import { StateUpdater } from 'preact/hooks';
type Props<ValueItemType> = {
    arItemContexts?: ValueItemType;
    isLoading?: boolean;
    preactValueItems?: ValueItemType;
    setPreactValueItems: StateUpdater<ValueItemType | undefined>;
};
type ValidState = 'valid' | 'pending' | 'invalidHidden' | 'invalidShown';
export declare function useWrapValueState<ValueType, ValueItemType>({ arItemContexts, isLoading, preactValueItems, setPreactValueItems }: Props<ValueItemType>): {
    wrapValueState: (valueState: ValueState<ValueType>) => {
        getValueForValidation: (valid: ValidState) => ValueType | null;
        refreshDisplayValue: () => void;
        displayValue: string;
        transientValue: ValueType;
        value: ValueType;
        setValueAfterValidation: (value: ValueType) => void;
        setDisplayValue: StateUpdater<string>;
        setTransientValue: StateUpdater<ValueType>;
        setValue: StateUpdater<ValueType>;
    };
};
export {};
