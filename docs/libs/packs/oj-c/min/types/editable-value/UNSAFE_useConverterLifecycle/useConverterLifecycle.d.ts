import Converter = require('ojs/ojconverter');
import { ValidationState } from '../UNSAFE_useValidators/useValidators';
type UseConverterLifecycleProps<V> = {
    converter?: Converter<V>;
    validationState: ValidationState<V>;
    refreshDisplayValue: () => void;
    runFullValidationAndUpdateValue: () => Promise<void>;
};
export declare function useConverterLifecycle<V>({ converter, validationState, refreshDisplayValue, runFullValidationAndUpdateValue }: UseConverterLifecycleProps<V>): void;
export {};
