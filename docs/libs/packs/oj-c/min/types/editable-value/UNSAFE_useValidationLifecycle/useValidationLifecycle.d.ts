import { ComponentMessagingState } from '../UNSAFE_useComponentMessaging/useComponentMessaging';
import { ConverterErrorSymbol } from '../UNSAFE_useConverter/useConverter';
import { UseValidatorsProps, ValidationState, ValidState } from '../UNSAFE_useValidators/useValidators';
type PickedUseValidatorsProps<V> = Pick<UseValidatorsProps<V>, 'deferredValidators' | 'validators'>;
type UseValidationLifecycleProps<V> = PickedUseValidatorsProps<V> & {
    componentMessagingState: ComponentMessagingState;
    disabled?: boolean;
    readonly?: boolean;
    validationState: ValidationState<V>;
    addBusyState?: (desc?: string) => () => void;
    getValueForValidation: (valid: ValidState) => V | typeof ConverterErrorSymbol;
    setValueAfterValidation: (value: V) => void;
};
export declare function useValidationLifecycle<V>({ componentMessagingState, disabled, deferredValidators, readonly, validationState, validators, getValueForValidation, setValueAfterValidation }: UseValidationLifecycleProps<V>): {
    runFullValidationAndUpdateValue: () => Promise<void>;
};
export {};
