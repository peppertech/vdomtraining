import { ComponentProps } from 'preact';
import type { CalendarDate } from '@oracle/oraclejet-preact/UNSAFE_InputDateMask';
import type { InputDateMask } from 'oj-c/input-date-mask';
type InputDateMaskProps = ComponentProps<typeof InputDateMask>;
export declare function useInputDateMaskPreact({ dateRangeOverflowMessageDetail, dateRangeUnderflowMessageDetail, disabled, displayOptions, labelEdge, labelHint, labelStartWidth, max, messagesCustom, min, readonly, required, requiredMessageDetail, textAlign, userAssistanceDensity, validators, value: propValue, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, ...otherProps }: InputDateMaskProps, addBusyState?: (desc?: string) => () => void): {
    value: string | undefined;
    setValue: import("preact/hooks").StateUpdater<string | undefined>;
    methods: {
        reset: () => void;
        validate: () => Promise<"invalid" | "valid">;
        showMessages: () => void;
    };
    inputDateMaskProps: Omit<import("@oracle/oraclejet-preact/hooks/UNSAFE_useTestId").TestIdProps & {
        'aria-describedby'?: string | undefined;
        assistiveText?: string | undefined;
        columnSpan?: import("@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout").LayoutColumns | undefined;
        granularity?: "day" | "month" | undefined;
        helpSourceLink?: string | undefined;
        helpSourceText?: string | undefined;
        isDisabled?: boolean | undefined;
        isReadonly?: boolean | undefined;
        isRequired?: boolean | undefined;
        isRequiredShown?: boolean | undefined;
        label: string;
        labelEdge?: "none" | "start" | "top" | "inside" | undefined;
        labelStartWidth?: import("@oracle/oraclejet-preact/utils/UNSAFE_size").Size | undefined;
        masks?: import("@oracle/oraclejet-preact/UNSAFE_InputDateMask").DatePlaceholders | undefined;
        messages?: import("@oracle/oraclejet-preact/UNSAFE_ComponentMessage").ComponentMessageItem[] | undefined;
        textAlign?: "end" | "start" | "right" | undefined;
        userAssistanceDensity?: import("@oracle/oraclejet-preact/UNSAFE_UserAssistance").UserAssistanceDensityType | undefined;
        value?: CalendarDate | undefined;
        variant?: "default" | "embedded" | undefined;
        onCommit?: ((detail: import("@oracle/oraclejet-preact/utils/UNSAFE_valueUpdateDetail").ValueUpdateDetail<CalendarDate>) => void) | undefined;
        onInput: (detail: import("@oracle/oraclejet-preact/utils/UNSAFE_valueUpdateDetail").ValueUpdateDetail<CalendarDate>) => void;
    }, "ref"> & {
        ref?: import("preact").Ref<import("@oracle/oraclejet-preact/hooks/UNSAFE_useFocusableTextField").FocusableHandle> | undefined;
    };
};
export {};
