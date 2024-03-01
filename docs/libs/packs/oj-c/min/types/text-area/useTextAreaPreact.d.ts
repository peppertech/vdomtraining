import { ComponentProps } from 'preact';
import type { TextArea } from 'oj-c/text-area';
type TextAreaProps = ComponentProps<typeof TextArea>;
export declare function useTextAreaPreact<V>({ autocomplete, autofocus, converter, disabled, displayOptions, labelEdge, labelHint, labelStartWidth, length, messagesCustom, placeholder, readonly, required, requiredMessageDetail, resizeBehavior, rows, textAlign, userAssistanceDensity, validators, value: propValue, onMessagesCustomChanged, onRawValueChanged, onValueChanged, onValidChanged, ...otherProps }: TextAreaProps, addBusyState?: (desc?: string) => () => void): {
    value: V;
    setValue: import("preact/hooks").StateUpdater<V>;
    methods: {
        reset: () => void;
        validate: () => Promise<"invalid" | "valid">;
        showMessages: () => void;
    };
    textAreaProps: Omit<import("@oracle/oraclejet-preact/hooks/UNSAFE_useTestId").TestIdProps & {
        'aria-describedby'?: string | undefined;
        assistiveText?: string | undefined;
        autoComplete?: string | undefined;
        autoFocus?: boolean | undefined;
        columnSpan?: import("@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout").LayoutColumns | undefined;
        helpSourceLink?: string | undefined;
        helpSourceText?: string | undefined;
        isDisabled?: boolean | undefined;
        isReadonly?: boolean | undefined;
        isRequired?: boolean | undefined;
        isRequiredShown?: boolean | undefined;
        label: string;
        labelEdge?: "none" | "start" | "top" | "inside" | undefined;
        labelStartWidth?: import("@oracle/oraclejet-preact/utils/UNSAFE_size").Size | undefined;
        maxLength?: number | undefined;
        maxLengthCounter?: "none" | "remaining" | undefined;
        maxLengthUnit?: import("@oracle/oraclejet-preact/utils/UNSAFE_lengthFilter").CountUnit | undefined;
        messages?: import("@oracle/oraclejet-preact/UNSAFE_ComponentMessage").ComponentMessageItem[] | undefined;
        placeholder?: string | undefined;
        resize?: "both" | "horizontal" | "vertical" | undefined;
        role?: import("preact").JSX.AriaRole | undefined;
        rows?: number | undefined;
        textAlign?: "end" | "start" | "right" | undefined;
        userAssistanceDensity?: import("@oracle/oraclejet-preact/UNSAFE_UserAssistance").UserAssistanceDensityType | undefined;
        value?: string | undefined;
        variant?: "default" | "embedded" | undefined;
        onCommit?: ((detail: import("@oracle/oraclejet-preact/utils/UNSAFE_valueUpdateDetail").ValueUpdateDetail<string>) => void) | undefined;
        onInput: ((detail: import("@oracle/oraclejet-preact/utils/UNSAFE_valueUpdateDetail").ValueUpdateDetail<string>) => void) | undefined;
    }, "ref"> & {
        ref?: import("preact").Ref<import("@oracle/oraclejet-preact/hooks/UNSAFE_useFocusableTextField").FocusableHandle> | undefined;
    };
};
export {};
