import { ValidationResult } from '../UNSAFE_useValidators/useValidators';
import { ValueRawValueObjectState } from '../UNSAFE_useValueRawValueObject/useValueRawValueObject';
export type UseValueRawValueObjectLifecycleProps<RV, V> = {
    value?: V;
    valueState: ValueRawValueObjectState<RV, V | undefined>;
    format: (value: V) => RV;
    validateValueOnExternalChange: (value: V | undefined) => ValidationResult;
};
export declare function useValueRawValueObjectLifecycle<RV, V>({ value, valueState, format, validateValueOnExternalChange }: UseValueRawValueObjectLifecycleProps<RV, V>): void;
