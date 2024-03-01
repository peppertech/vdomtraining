import { ValueUpdateDetail } from '@oracle/oraclejet-preact/utils/UNSAFE_valueUpdateDetail';
import { UseComponentMessagingProps } from '../UNSAFE_useComponentMessaging/useComponentMessaging';
import { ConverterErrorSymbol, UseConverterProps } from '../UNSAFE_useConverter/useConverter';
import { UseValidatorsProps, ValidationResult } from '../UNSAFE_useValidators/useValidators';
import { UseValueProps, ValueState } from '../UNSAFE_useValue/useValue';
import { ValidatorLike } from '../UNSAFE_useValidators/useValidators';
type PickedComponentMessagingProps = Pick<UseComponentMessagingProps, 'messagesCustom' | 'onMessagesCustomChanged'>;
type PickedConverterProps<V> = Pick<UseConverterProps<V>, 'converter'>;
type PickedValidatorsProps<V> = Pick<UseValidatorsProps<V>, 'validators' | 'addBusyState' | 'onValidChanged'>;
type PickedValueProps<V> = Pick<UseValueProps<V>, 'onRawValueChanged' | 'onTransientValueChanged' | 'onValueChanged' | 'value'>;
type AriaProps = {
    ariaDescribedBy?: string;
};
export type UseEditableValueProps<V> = PickedComponentMessagingProps & PickedConverterProps<V> & PickedValidatorsProps<V> & PickedValueProps<V> & AriaProps & {
    disabled?: boolean;
    displayOptions?: {
        messages?: 'display' | 'none';
    };
    implicitComponentValidator?: ValidatorLike<V>;
    labelHint?: string;
    readonly?: boolean;
    required?: boolean;
    requiredMessageDetail?: string;
    shouldNormalizeValueOnCommit?: boolean;
    wrapValueState?: (valueState: ValueState<V>) => ValueState<V>;
};
export declare function useEditableValue<V>({ ariaDescribedBy, converter, disabled, displayOptions, implicitComponentValidator, labelHint, messagesCustom, readonly, required, requiredMessageDetail, shouldNormalizeValueOnCommit, validators, value: valueProp, addBusyState, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, onTransientValueChanged, wrapValueState }: UseEditableValueProps<V>): {
    value: V;
    setValue: import("preact/hooks").StateUpdater<V>;
    displayValue: string;
    setDisplayValue: import("preact/hooks").StateUpdater<string>;
    setTransientValue: import("preact/hooks").StateUpdater<V>;
    methods: {
        reset: () => void;
        validate: () => Promise<'valid' | 'invalid'>;
        showMessages: () => void;
    };
    textFieldProps: {
        messages: import("@oracle/oraclejet-preact/UNSAFE_ComponentMessage").ComponentMessageItem[] | undefined;
        value: string;
        'aria-describedby': string | undefined;
        onCommit: ({ value }: ValueUpdateDetail<string>) => Promise<void>;
        onInput: ({ value }: ValueUpdateDetail<string>) => void;
    };
    onCommitValue: (value: V, doCommitOnValid?: boolean) => Promise<ValidationResult>;
    format: (value: V, shouldSuppressError?: boolean) => string | null | undefined;
    normalizeAndParseValue: (value: string) => typeof ConverterErrorSymbol | V | null;
};
export {};
