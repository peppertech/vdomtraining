import Converter = require('ojs/ojconverter');
import { ComponentMessagingState } from '../UNSAFE_useComponentMessaging/useComponentMessaging';
import { ValidationState } from '../UNSAFE_useValidators/useValidators';
export type UseConverterProps<V> = {
    converter?: Converter<V>;
    componentMessagingState: ComponentMessagingState;
    validationState: ValidationState<V>;
};
export declare const ConverterErrorSymbol: unique symbol;
export declare function useConverter<V>({ componentMessagingState, validationState, converter }: UseConverterProps<V>): {
    format: (value: V, shouldSuppressError?: boolean) => string | null | undefined;
    parse: (displayValue: string) => typeof ConverterErrorSymbol | V | null;
};
