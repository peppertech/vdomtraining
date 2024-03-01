import { ValueUpdateDetail } from '@oracle/oraclejet-preact/utils/UNSAFE_valueUpdateDetail';
import { UseComponentMessagingProps } from '../UNSAFE_useComponentMessaging/useComponentMessaging';
import { UseValidatorsProps, ValidationResult } from '../UNSAFE_useValidators/useValidators';
import { UseValueRawValueObjectProps, ValueRawValueObjectState } from '../UNSAFE_useValueRawValueObject/useValueRawValueObject';
import { ValidatorLike } from '../UNSAFE_useValidators/useValidators';
type PickedComponentMessagingProps = Pick<UseComponentMessagingProps, 'messagesCustom' | 'onMessagesCustomChanged'>;
type PickedValidatorsProps<V> = Pick<UseValidatorsProps<V>, 'validators' | 'addBusyState' | 'onValidChanged'>;
type PickedValueProps<RV, V> = Pick<UseValueRawValueObjectProps<RV, V>, 'onRawValueChanged' | 'onTransientValueChanged' | 'onValueChanged' | 'value'>;
type AriaProps = {
    ariaDescribedBy?: string;
};
export type UseEditableValueRawValueObjectProps<RV, V> = PickedComponentMessagingProps & PickedValidatorsProps<V> & PickedValueProps<RV, V> & AriaProps & {
    converter: {
        parse: (value: RV) => V;
        format: (value: V) => RV;
    };
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
    wrapValueState?: (valueState: ValueRawValueObjectState<RV, V>) => ValueRawValueObjectState<RV, V>;
};
export declare function useEditableValueRawValueObject<RV, V>({ ariaDescribedBy, converter, disabled, displayOptions, implicitComponentValidator, labelHint, messagesCustom, readonly, required, requiredMessageDetail, validators, value: valueProp, addBusyState, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, onTransientValueChanged, wrapValueState }: UseEditableValueRawValueObjectProps<RV, V>): {
    value: V;
    setValue: import("preact/hooks").StateUpdater<V>;
    displayValue: RV;
    setDisplayValue: import("preact/hooks").StateUpdater<RV | undefined>;
    setTransientValue: import("preact/hooks").StateUpdater<V>;
    methods: {
        reset: () => void;
        validate: () => Promise<'valid' | 'invalid'>;
        showMessages: () => void;
    };
    textFieldProps: {
        messages: import("@oracle/oraclejet-preact/UNSAFE_ComponentMessage").ComponentMessageItem[] | undefined;
        value: RV;
        'aria-describedby': string | undefined;
        onCommit: ({ value }: ValueUpdateDetail<RV>) => Promise<void>;
        onInput: ({ value }: ValueUpdateDetail<RV>) => void;
    };
    onCommitValue: (value: V, doCommitOnValid?: boolean) => Promise<ValidationResult>;
};
export {};
