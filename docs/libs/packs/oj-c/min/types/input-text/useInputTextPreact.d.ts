import { ComponentProps } from 'preact';
import type { InputText } from 'oj-c/input-text';
type InputTextProps = ComponentProps<typeof InputText>;
export declare function useInputTextPreact<V>({ autocomplete, autofocus, clearIcon, converter, disabled, displayOptions, end, inputPrefix, inputSuffix, labelEdge, labelHint, labelStartWidth, length, messagesCustom, placeholder, readonly, required, requiredMessageDetail, start, textAlign, userAssistanceDensity, validators, value: propValue, virtualKeyboard, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, ...otherProps }: InputTextProps, addBusyState?: (desc?: string) => () => void): {
    value: V;
    setValue: import("preact/hooks").StateUpdater<V>;
    methods: {
        reset: () => void;
        validate: () => Promise<"invalid" | "valid">;
        showMessages: () => void;
    };
    inputTextProps: Omit<import("@oracle/oraclejet-preact/hooks/UNSAFE_useTestId").TestIdProps & {
        'aria-describedby'?: string | undefined;
        assistiveText?: string | undefined;
        autoComplete?: string | undefined;
        autoFocus?: boolean | undefined;
        columnSpan?: import("@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout").LayoutColumns | undefined;
        endContent?: import("preact").ComponentChildren;
        hasClearIcon?: "always" | "never" | "conditionally" | undefined;
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
        maxLengthUnit?: import("@oracle/oraclejet-preact/utils/UNSAFE_lengthFilter").CountUnit | undefined;
        messages?: import("@oracle/oraclejet-preact/UNSAFE_ComponentMessage").ComponentMessageItem[] | undefined;
        placeholder?: string | undefined;
        prefix?: string | undefined;
        role?: import("preact").JSX.AriaRole | undefined;
        startContent?: import("preact").ComponentChildren;
        suffix?: string | undefined;
        textAlign?: "end" | "start" | "right" | undefined;
        userAssistanceDensity?: import("@oracle/oraclejet-preact/UNSAFE_UserAssistance").UserAssistanceDensityType | undefined;
        value?: string | undefined;
        variant?: "default" | "embedded" | undefined;
        virtualKeyboard?: "number" | "search" | "auto" | "url" | "text" | "email" | "tel" | undefined;
        onCommit?: ((detail: import("@oracle/oraclejet-preact/utils/UNSAFE_valueUpdateDetail").ValueUpdateDetail<string>) => void) | undefined;
        onInput: ((detail: import("@oracle/oraclejet-preact/utils/UNSAFE_valueUpdateDetail").ValueUpdateDetail<string>) => void) | undefined;
    }, "ref"> & {
        ref?: import("preact").Ref<import("@oracle/oraclejet-preact/hooks/UNSAFE_useFocusableTextField").FocusableHandle> | undefined;
    };
};
export {};
