import { StateUpdater } from 'preact/hooks';
import { ConverterErrorSymbol } from '../UNSAFE_useConverter/useConverter';
import { ValidState } from '../UNSAFE_useValidators/useValidators';
export type ValueState<V> = {
    displayValue: string;
    transientValue: V;
    value: V;
    getValueForValidation: (valid: ValidState) => V | typeof ConverterErrorSymbol;
    setValueAfterValidation: (value: V) => void;
    setDisplayValue: StateUpdater<string>;
    setTransientValue: StateUpdater<V>;
    setValue: StateUpdater<V>;
    refreshDisplayValue: () => void;
};
export type UseValueProps<V> = {
    value?: V;
    format: (value: V, shouldSuppressError?: boolean) => string;
    parse: (value: string) => V | typeof ConverterErrorSymbol;
    onRawValueChanged?: (rawValue: string) => void;
    onTransientValueChanged?: (transientValue: V | null | undefined) => void;
    onValueChanged?: (value: V | null | undefined) => void;
};
export declare function useValue<V>({ value: valueProp, format, parse, onRawValueChanged, onTransientValueChanged, onValueChanged }: UseValueProps<V>): ValueState<V>;
