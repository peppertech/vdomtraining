import { StateUpdater } from 'preact/hooks';
import { ValidState } from '../UNSAFE_useValidators/useValidators';
import { ConverterErrorSymbol } from '../UNSAFE_useConverter/useConverter';
export type ValueRawValueObjectState<RV, V> = {
    displayValue: RV;
    transientValue: V;
    value: V;
    getValueForValidation: (valid: ValidState) => V;
    setValueAfterValidation: (value: V) => void;
    setDisplayValue: StateUpdater<RV | undefined>;
    setTransientValue: StateUpdater<V>;
    setValue: StateUpdater<V>;
    refreshDisplayValue: () => void;
};
export type UseValueRawValueObjectProps<RV, V> = {
    value?: V;
    format: (value: V, shouldSuppressError?: boolean) => RV;
    parse: (value: RV) => V | typeof ConverterErrorSymbol;
    onRawValueChanged?: (rawValue: RV | undefined) => void;
    onTransientValueChanged?: (transientValue: V | undefined) => void;
    onValueChanged?: (value: V | undefined) => void;
};
export declare function useValueRawValueObject<RV, V>({ value: valueProp, format, parse, onRawValueChanged, onTransientValueChanged, onValueChanged }: UseValueRawValueObjectProps<RV, V>): ValueRawValueObjectState<RV, V>;
