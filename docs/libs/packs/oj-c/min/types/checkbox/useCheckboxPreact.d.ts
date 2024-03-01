import { ComponentProps } from 'preact';
import { ValueUpdateDetail } from '@oracle/oraclejet-preact/utils/UNSAFE_valueUpdateDetail';
import { Checkbox } from './checkbox';
import Validator = require('ojs/ojvalidator');
type CheckboxProps = ComponentProps<typeof Checkbox> & {
    validators?: Validator<boolean>[];
};
export declare function useCheckboxPreact({ ['aria-describedby']: ariaDescribedBy, disabled, displayOptions, messagesCustom, readonly, requiredMessageDetail: propRequiredMessageDetail, required, userAssistanceDensity, value: propValue, onMessagesCustomChanged, onValidChanged, onValueChanged, validators }: Omit<CheckboxProps, 'children'>, addBusyState: (desc?: string) => () => void): {
    methods: {
        reset: () => void;
        validate: () => Promise<"invalid" | "valid">;
        showMessages: () => void;
    };
    checkboxProps: Omit<{
        'aria-describedby'?: string | undefined;
        assistiveText?: string | undefined;
        children: import("preact").ComponentChildren;
        columnSpan?: import("@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout").LayoutColumns | undefined;
        helpSourceLink?: string | undefined;
        helpSourceText?: string | undefined;
        isRequired?: boolean | undefined;
        isReadonly?: boolean | undefined;
        isDisabled?: boolean | undefined;
        messages?: import("@oracle/oraclejet-preact/UNSAFE_ComponentMessage").ComponentMessageItem[] | undefined;
        onCommit: (detail: ValueUpdateDetail<boolean>) => void;
        userAssistanceDensity?: import("@oracle/oraclejet-preact/UNSAFE_UserAssistance").UserAssistanceDensityType | undefined;
        value?: boolean | undefined;
    }, "ref"> & {
        ref?: import("preact").Ref<import("@oracle/oraclejet-preact/hooks/UNSAFE_useFocusableTextField").FocusableHandle> | undefined;
    };
};
export {};
