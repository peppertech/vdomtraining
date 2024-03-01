import { ComponentMessagingState } from '../UNSAFE_useComponentMessaging/useComponentMessaging';
import { ValidationState } from '../UNSAFE_useValidators/useValidators';
export type UseConverterObjectProps<RV, V> = {
    converter: {
        parse: (value: RV) => V;
        format: (value: V) => RV;
    };
    componentMessagingState: ComponentMessagingState;
    validationState: ValidationState<V>;
};
export declare const ConverterErrorSymbol: unique symbol;
export declare function useConverterObject<RV, V>({ componentMessagingState, validationState, converter }: UseConverterObjectProps<RV, V>): {
    format: (value: V, shouldSuppressError?: boolean) => RV | undefined;
    parse: (displayValue: RV) => typeof ConverterErrorSymbol | V | null;
};
