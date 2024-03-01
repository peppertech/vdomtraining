import { ComponentProps } from 'preact';
import type { InputPassword } from 'oj-c/input-password';
type InputPasswordProps = ComponentProps<typeof InputPassword>;
export declare function useInputPasswordPreact({ autocomplete, autofocus, clearIcon, disabled, displayOptions, labelEdge, labelHint, labelStartWidth, maskIcon, messagesCustom, placeholder, readonly, required, requiredMessageDetail, textAlign, userAssistanceDensity, validators, value: propValue, onMessagesCustomChanged, onRawValueChanged, onValidChanged, onValueChanged, ...otherProps }: InputPasswordProps, addBusyState?: (desc?: string) => () => void): {
    value: string | null;
    setValue: import("preact/hooks").StateUpdater<string | null>;
    methods: {
        reset: () => void;
        validate: () => Promise<"invalid" | "valid">;
        showMessages: () => void;
    };
    inputPasswordProps: Omit<{
        'aria-describedby'?: string | undefined;
        assistiveText?: string | undefined;
        autoComplete?: string | undefined;
        autoFocus?: boolean | undefined;
        columnSpan?: import("@oracle/oraclejet-preact/utils/UNSAFE_styles/Layout").LayoutColumns | undefined;
        hasClearIcon?: "always" | "never" | "conditionally" | undefined;
        hasRevealToggle?: "always" | "never" | undefined;
        helpSourceLink?: string | undefined;
        helpSourceText?: string | undefined;
        isDisabled?: boolean | undefined;
        isReadonly?: boolean | undefined;
        isRequired?: boolean | undefined;
        isRequiredShown?: boolean | undefined;
        label: string;
        labelEdge?: "none" | "start" | "top" | "inside" | undefined;
        labelStartWidth?: import("@oracle/oraclejet-preact/utils/UNSAFE_size").Size | undefined;
        messages?: import("@oracle/oraclejet-preact/UNSAFE_ComponentMessage").ComponentMessageItem[] | undefined;
        placeholder?: string | undefined;
        textAlign?: "end" | "start" | "right" | undefined;
        userAssistanceDensity?: import("@oracle/oraclejet-preact/UNSAFE_UserAssistance").UserAssistanceDensityType | undefined;
        value?: string | undefined;
        variant?: "default" | "embedded" | undefined;
        onCommit?: ((detail: import("@oracle/oraclejet-preact/utils/UNSAFE_valueUpdateDetail").ValueUpdateDetail<string>) => void) | undefined;
        onInput: ((detail: import("@oracle/oraclejet-preact/utils/UNSAFE_valueUpdateDetail").ValueUpdateDetail<string>) => void) | undefined;
    } & import("@oracle/oraclejet-preact/hooks/UNSAFE_useTestId").TestIdProps, "ref"> & {
        ref?: import("preact").Ref<import("@oracle/oraclejet-preact/hooks/UNSAFE_useFocusableTextField").FocusableHandle> | undefined;
    };
};
export {};
