import { ValidationResult } from '../UNSAFE_useValidators/useValidators';
import { ValueState } from '../UNSAFE_useValue/useValue';
export type UseValueLifecycleProps<V> = {
    value?: V;
    valueState: ValueState<V>;
    format: (value: V) => string;
    validateValueOnExternalChange: (value: V) => ValidationResult;
};
export declare function useValueLifecycle<V>({ value, valueState, format, validateValueOnExternalChange }: UseValueLifecycleProps<V>): void;
